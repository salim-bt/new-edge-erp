// "use client";
// import { Button } from "@/components/ui/button";
// import { DateRangePicker } from "@/components/ui/date-range-picker";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
// } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// const leaveSchema = z.object({
//     leaveType: z.string(),
//     leaveTime: z.object({
//         startDate: z.string(),
//         endDate: z.string().optional(),
//     }),
//     description: z.string(),
// });

// export default function Leave() {

//     const leaveForm = useForm<z.infer<typeof leaveSchema>>({
//         resolver: zodResolver(leaveSchema),
//         defaultValues: {
//             leaveType: "",
//             leaveTime: {
//                 startDate: new Date().toISOString(),
//                 endDate: new Date().toISOString(),
//             },
//             description: "",
//         }
//     });

//     function onSubmit(data: z.infer<typeof leaveSchema>) {
//         console.log(data);
//     }

//     return (
//         <main className="flex min-h-screen w-full flex-col items-center mt-32 lg:pl-72 justify-start bg-white/20">
//             <Form {...leaveForm}>
//                 <form onSubmit={leaveForm.handleSubmit(onSubmit)} className="w-4/5 md:w-2/3 lg:w-1/3  space-y-6">
//                     <div className="flex flex-row w-full justify-center items-center my-20">
//                         <Image src="/hero.svg" alt="hero" height={200} width={200}  className="rounded-full" />
//                         <div className="flex flex-col items-center justify-center">
//                             <h1 className="mt-4 text-4xl font-semibold">
//                                 Welcome back!
//                             </h1>
//                             <p className="mt-4 text-xl font-bold">
//                                 Leave Application
//                             </p>
//                         </div>
//                     </div>

//                     <FormField
//                         control={leaveForm.control}
//                         name="leaveType"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Leave Type</FormLabel>
//                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                     <FormControl>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select Leave Type" />
//                                         </SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                         <SelectItem value="m@example.com">m@example.com</SelectItem>
//                                         <SelectItem value="m@google.com">m@google.com</SelectItem>
//                                         <SelectItem value="m@support.com">m@support.com</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={leaveForm.control}
//                         name="leaveTime"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Date</FormLabel>
//                                 <br />
//                                 <FormControl>
//                                     <DateRangePicker
//                                         initialDateFrom={field.value.startDate}
//                                         initialDateTo={field.value.endDate}
//                                         showCompare={true}
//                                         align="start"
//                                         onUpdate={({
//                                             range: {
//                                                 from,
//                                                 to
//                                             }
//                                         }) => {
//                                             field.onChange({
//                                                 startDate: from.toISOString(),
//                                                 endDate: to?.toISOString()
//                                             });
//                                         }}
//                                     />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={leaveForm.control}
//                         name="description"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Description</FormLabel>
//                                 <FormControl>
//                                     <Textarea
//                                         {...field}
//                                         placeholder="Description"
//                                         cols={12}
//                                         rows={10}
//                                     />
//                                 </FormControl>
//                             </FormItem>
//                         )}
//                     />

//                     <Button type="submit">Submit</Button>
//                 </form>
//             </Form>
//         </main>
//     );

// }
