import { index, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const policyKindEnum = pgEnum("policy_kind", ["include", "exclude"]);

export const Policies = pgTable(
  "policies",
  {
    id: serial("id").primaryKey(),
    kind: policyKindEnum("kind").notNull(),
    label: text("label").notNull(),
  },
  (table) => [
    index("policies_kind_idx").on(table.kind),
    index("policies_label_idx").on(table.label),
  ]
);

export const insertPoliciesSchema = createInsertSchema(Policies);

export type TInsertPolicy = typeof insertPoliciesSchema;
export type TNewPolicy = typeof Policies.$inferInsert;
export type TPolicyBase = typeof Policies.$inferSelect;
export type TPolicyKind = (typeof policyKindEnum.enumValues)[number];
