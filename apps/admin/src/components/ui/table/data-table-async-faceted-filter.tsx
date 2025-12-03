"use client";

import { Check, Loader2, PlusCircle, XCircle } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import type { Option } from "@/types/data-table";

import type { Column } from "@tanstack/react-table";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  multiple?: boolean;
  title?: string;

  // Called when popover opens and no options are present yet
  fetchOptions?: (ctx: { column?: Column<TData, TValue> }) => Promise<Option[]>;

  // Optional server-side search. If provided, we will debounce and call it.
  // If not provided, we will do client-side filtering of the fetched options.
  searchOptions?: (
    query: string,
    ctx: { column?: Column<TData, TValue> }
  ) => Promise<Option[]>;

  // Optional: allow injecting initial options (e.g., cached) to show instantly.
  initialOptions?: Option[];

  // Debounce delay for searchOptions
  searchDebounceMs?: number;

  // Optional transform before displaying options (e.g., map labels)
  mapOptions?: (options: Option[]) => Option[];
}

export function DataTableAsyncFacetedFilter<TData, TValue>({
  column,
  fetchOptions,
  initialOptions = [],
  mapOptions,
  multiple,
  searchDebounceMs = 300,
  searchOptions,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>(initialOptions);
  const [fetchedOnce, setFetchedOnce] = React.useState(
    initialOptions.length > 0
  );

  // Prevent redundant fetches and searches
  const tokenRef = React.useRef(0);
  const lastQueryRef = React.useRef<string>("");
  const lastResultRef = React.useRef<null | Option[]>(null);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = React.useMemo(
    () => new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []),
    [columnFilterValue]
  );

  // One-time preload on first open for non-search mode
  const ensureFetched = React.useCallback(async () => {
    if (fetchedOnce || !fetchOptions) return;
    setLoading(true);
    try {
      const list = await fetchOptions({ column });
      const mapped = mapOptions ? mapOptions(list) : list;
      setOptions(mapped);
      setFetchedOnce(true);
    } finally {
      setLoading(false);
    }
  }, [fetchedOnce, fetchOptions, column, mapOptions]);

  // Debounced server-side search: only run when query changes and is non-empty.
  // Do not depend on `open` so reopening popover doesn't retrigger searches.
  React.useEffect(() => {
    if (!searchOptions) return;

    const q = query.trim();
    if (q.length === 0) {
      // On empty query, keep whatever we have (preloaded or previous)
      return;
    }

    // Reuse cached results for same query during component lifetime
    if (lastQueryRef.current === q && lastResultRef.current) {
      setOptions(lastResultRef.current);
      setFetchedOnce(true);
      return;
    }

    const id = window.setTimeout(async () => {
      const myToken = ++tokenRef.current;
      setLoading(true);
      try {
        const list = await searchOptions(q, { column });
        if (myToken === tokenRef.current) {
          const mapped = mapOptions ? mapOptions(list) : list;
          setOptions(mapped);
          setFetchedOnce(true);
          lastQueryRef.current = q;
          lastResultRef.current = mapped;
        }
      } finally {
        if (myToken === tokenRef.current) setLoading(false);
      }
    }, searchDebounceMs);

    return () => window.clearTimeout(id);
  }, [query, searchOptions, searchDebounceMs, column, mapOptions]);

  React.useEffect(() => {
    ensureFetched();
  }, []);

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      console.log("column", column, option, isSelected);

      if (!column) return;

      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column]
  );

  return (
    <Popover
      onOpenChange={async (next) => {
        setOpen(next);
        if (next && !searchOptions) {
          // For preload (non-server-search) mode, fetch only once.
          await ensureFetched();
        }
        // If using server-side search and you want a search on open, you can opt-in:
        // if (next && searchOptions && query.trim().length > 0) { ...trigger once... }
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <Button className="border-dashed" size="sm" variant="outline">
          {selectedValues?.size > 0 ? (
            <div
              aria-label={`Clear ${title} filter`}
              className="focus-visible:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:outline-none"
              onClick={onReset}
              role="button"
              tabIndex={0}
            >
              <XCircle />
            </div>
          ) : loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <PlusCircle />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                className="mx-0.5 data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
              <Badge
                className="rounded-sm px-1 font-normal lg:hidden"
                variant="secondary"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden items-center gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    className="rounded-sm px-1 font-normal"
                    variant="secondary"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        className="rounded-sm px-1 font-normal"
                        key={option.value}
                        variant="secondary"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12.5rem] p-0">
        <Command
          shouldFilter={false /* server search or manual filter below */}
        >
          <CommandInput
            onValueChange={setQuery}
            placeholder={title}
            value={query}
          />
          <CommandList className="max-h-full">
            <CommandEmpty>
              {loading ? "Loading..." : "No results found."}
            </CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-x-hidden overflow-y-auto">
              {(searchOptions
                ? options // server-driven list
                : // client-side filtering when no server search
                  options.filter((o) =>
                    (o.label ?? "")
                      .toLowerCase()
                      .includes(query.trim().toLowerCase())
                  )
              ).map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    disabled={loading}
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}
                  >
                    <div
                      className={cn(
                        "border-primary flex size-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    {option.icon && <option.icon />}
                    <div className="flex flex-col">
                      <span className="truncate">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-muted-foreground truncate">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {typeof option.count !== "undefined" && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => onReset()}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
