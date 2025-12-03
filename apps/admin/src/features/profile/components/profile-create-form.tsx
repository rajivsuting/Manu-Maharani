"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';

import { profileSchema } from '../utils/form-schema';

import type { ProfileFormValues } from "../utils/form-schema";

import type { SubmitHandler } from "react-hook-form";
interface ProfileFormType {
  initialData: any | null;
}
const ProfileCreateForm: React.FC<ProfileFormType> = ({ initialData }) => {
  return null;
};

// const ProfileCreateForm: React.FC<ProfileFormType> = ({ initialData }) => {
//   const params = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const title = initialData ? "Edit product" : "Create Your Profile";
//   const description = initialData
//     ? "Edit a product."
//     : "To create your resume, we first need some basic information about you.";
//   const [previousStep, setPreviousStep] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [data, setData] = useState({});

//   const defaultValues = {
//     jobs: [
//       {
//         employer: "",
//         enddate: "",
//         jobcity: "",
//         jobcountry: "",
//         jobtitle: "",
//         startdate: "",
//       },
//     ],
//   };

//   const form = useForm<ProfileFormValues>({
//     defaultValues,
//     mode: "onChange",
//     resolver: zodResolver(profileSchema),
//   });

//   const {
//     control,
//     formState: { errors },
//   } = form;

//   const { append, fields, remove } = useFieldArray({
//     control,
//     name: "jobs",
//   });

//   const processForm: SubmitHandler<ProfileFormValues> = (data) => {
//     // Process form data
//     setData(data);
//     // api call and reset
//     // form.reset();
//   };

//   type FieldName = keyof ProfileFormValues;

//   const steps = [
//     {
//       fields: [
//         "firstname",
//         "lastname",
//         "email",
//         "contactno",
//         "country",
//         "city",
//       ],
//       id: "Step 1",
//       name: "Personal Information",
//     },
//     {
//       id: "Step 2",
//       name: "Professional Informations",
//       // fields are mapping and flattening for the error to be trigger  for the dynamic fields
//       fields: fields
//         ?.map((_, index) => [
//           `jobs.${index}.jobtitle`,
//           `jobs.${index}.employer`,
//           `jobs.${index}.startdate`,
//           `jobs.${index}.enddate`,
//           `jobs.${index}.jobcountry`,
//           `jobs.${index}.jobcity`,
//           // Add other field names as needed
//         ])
//         .flat(),
//     },
//     { id: "Step 3", name: "Complete" },
//   ];

//   const next = async () => {
//     const fields = steps[currentStep].fields;

//     const output = await form.trigger(fields as FieldName[], {
//       shouldFocus: true,
//     });

//     if (!output) return;

//     if (currentStep < steps.length - 1) {
//       if (currentStep === steps.length - 2) {
//         await form.handleSubmit(processForm)();
//       }
//       setPreviousStep(currentStep);
//       setCurrentStep((step) => step + 1);
//     }
//   };

//   const prev = () => {
//     if (currentStep > 0) {
//       setPreviousStep(currentStep);
//       setCurrentStep((step) => step - 1);
//     }
//   };

//   const countries = [{ id: "wow", name: "india" }];
//   const cities = [{ id: "2", name: "kerala" }];

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Heading description={description} title={title} />
//         {initialData && (
//           <Button
//             disabled={loading}
//             onClick={() => setOpen(true)}
//             size="sm"
//             variant="destructive"
//           >
//             <IconTrash className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <Separator />
//       <div>
//         <ul className="flex gap-4">
//           {steps.map((step, index) => (
//             <li className="md:flex-1" key={step.name}>
//               {currentStep > index ? (
//                 <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0">
//                   <span className="text-sm font-medium text-sky-600 transition-colors">
//                     {step.id}
//                   </span>
//                   <span className="text-sm font-medium">{step.name}</span>
//                 </div>
//               ) : currentStep === index ? (
//                 <div
//                   aria-current="step"
//                   className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0"
//                 >
//                   <span className="text-sm font-medium text-sky-600">
//                     {step.id}
//                   </span>
//                   <span className="text-sm font-medium">{step.name}</span>
//                 </div>
//               ) : (
//                 <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0">
//                   <span className="text-sm font-medium text-gray-500 transition-colors">
//                     {step.id}
//                   </span>
//                   <span className="text-sm font-medium">{step.name}</span>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form
//           className="w-full space-y-8"
//           onSubmit={form.handleSubmit(processForm)}
//         >
//           <div
//             className={cn(
//               currentStep === 1
//                 ? "w-full md:inline-block"
//                 : "gap-8 md:grid md:grid-cols-3"
//             )}
//           >
//             {currentStep === 0 && (
//               <>
//                 <FormField
//                   control={form.control}
//                   name="firstname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="John"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="Doe"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="johndoe@gmail.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="contactno"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Contact Number</FormLabel>
//                       <FormControl>
//                         <Input
//                           disabled={loading}
//                           placeholder="Enter you contact number"
//                           type="number"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="country"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Country</FormLabel>
//                       <Select
//                         defaultValue={field.value}
//                         disabled={loading}
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue
//                               defaultValue={field.value}
//                               placeholder="Select a country"
//                             />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {/* @ts-ignore  */}
//                           {countries.map((country) => (
//                             <SelectItem key={country.id} value={country.id}>
//                               {country.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="city"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>City</FormLabel>
//                       <Select
//                         defaultValue={field.value}
//                         disabled={loading}
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue
//                               defaultValue={field.value}
//                               placeholder="Select a city"
//                             />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {/* @ts-ignore  */}
//                           {cities.map((city) => (
//                             <SelectItem key={city.id} value={city.id}>
//                               {city.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </>
//             )}
//             {currentStep === 1 && (
//               <>
//                 {fields?.map((field, index) => (
//                   <Accordion
//                     collapsible
//                     defaultValue="item-1"
//                     key={field.id}
//                     type="single"
//                   >
//                     <AccordionItem value="item-1">
//                       <AccordionTrigger
//                         className={cn(
//                           "relative no-underline! [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden",
//                           errors?.jobs?.[index] && "text-red-700"
//                         )}
//                       >
//                         {`Work Experience ${index + 1}`}

//                         <Button
//                           className="absolute right-8"
//                           onClick={() => remove(index)}
//                           size="icon"
//                           variant="outline"
//                         >
//                           <IconTrash className="h-4 w-4" />
//                         </Button>
//                         {errors?.jobs?.[index] && (
//                           <span className="alert absolute right-8">
//                             <IconAlertTriangle className="h-4 w-4 text-red-700" />
//                           </span>
//                         )}
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <div
//                           className={cn(
//                             "relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3"
//                           )}
//                         >
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.jobtitle`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Job title</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     disabled={loading}
//                                     type="text"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.employer`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Employer</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     disabled={loading}
//                                     type="text"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.startdate`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Start date</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     disabled={loading}
//                                     type="date"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.enddate`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>End date</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     disabled={loading}
//                                     type="date"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.jobcountry`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Job country</FormLabel>
//                                 <Select
//                                   defaultValue={field.value}
//                                   disabled={loading}
//                                   onValueChange={field.onChange}
//                                   value={field.value}
//                                 >
//                                   <FormControl>
//                                     <SelectTrigger>
//                                       <SelectValue
//                                         defaultValue={field.value}
//                                         placeholder="Select your job country"
//                                       />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     {countries.map((country) => (
//                                       <SelectItem
//                                         key={country.id}
//                                         value={country.id}
//                                       >
//                                         {country.name}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name={`jobs.${index}.jobcity`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Job city</FormLabel>
//                                 <Select
//                                   defaultValue={field.value}
//                                   disabled={loading}
//                                   onValueChange={field.onChange}
//                                   value={field.value}
//                                 >
//                                   <FormControl>
//                                     <SelectTrigger>
//                                       <SelectValue
//                                         defaultValue={field.value}
//                                         placeholder="Select your job city"
//                                       />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     {cities.map((city) => (
//                                       <SelectItem key={city.id} value={city.id}>
//                                         {city.name}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 ))}

//                 <div className="mt-4 flex justify-center">
//                   <Button
//                     className="flex justify-center"
//                     onClick={() =>
//                       append({
//                         employer: "",
//                         enddate: "",
//                         jobcity: "",
//                         jobcountry: "",
//                         jobtitle: "",
//                         startdate: "",
//                       })
//                     }
//                     size={"lg"}
//                     type="button"
//                   >
//                     Add More
//                   </Button>
//                 </div>
//               </>
//             )}
//             {currentStep === 2 && (
//               <div>
//                 <h1>Completed</h1>
//                 <pre className="whitespace-pre-wrap">
//                   {JSON.stringify(data)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* <Button disabled={loading} className="ml-auto" type="submit">
//             {action}
//           </Button> */}
//         </form>
//       </Form>
//       {/* Navigation */}
//       <div className="mt-8 pt-5">
//         <div className="flex justify-between">
//           <button
//             className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-xs ring-1 ring-sky-300 ring-inset hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
//             disabled={currentStep === 0}
//             onClick={prev}
//             type="button"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M15.75 19.5L8.25 12l7.5-7.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//           <button
//             className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-xs ring-1 ring-sky-300 ring-inset hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
//             disabled={currentStep === steps.length - 1}
//             onClick={next}
//             type="button"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

export default ProfileCreateForm;
