"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Lemon } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet
} from "../ui/sheet";
const lemon = Lemon({
  subsets: ["latin-ext"],
  weight: "400",
});

import { useSession } from "next-auth/react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon, EyeIcon, ArrowUpRight } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, set } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
const ApplyLeaveSchema = z.object({
  typeId: z.string(),
  date: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  reason: z.string(),
  supportingDocuments: z.array(z.string()),
});

export default function ApplyLeave() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof ApplyLeaveSchema>>({
    resolver: zodResolver(ApplyLeaveSchema),
    defaultValues: {
      date: {
        from: new Date(),
        // one day from now
        to: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      reason: "",
      supportingDocuments: [],
    },
  });
  const submit = api.leave.applyLeave.useMutation(
    {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Leave Applied",
          description: "Your leave application has been submitted",
          className: "bg-green-500"
        });
        setIsOpen(false);
      },
    }
  );
  const leaveTypes = api.leave.getLeaveTypes.useQuery().data;

  const onSubmit: SubmitHandler<z.infer<typeof ApplyLeaveSchema>> = async (
    data: z.infer<typeof ApplyLeaveSchema>
  ) => {
    toast({
      title: "Applying Leave",
      description: "Please wait while we submit your leave application",
      className: "bg-blue-500"
    });
    submit.mutate({
      leaveTypeId: data.typeId,
      startDate: data.date.from,
      endDate: data.date.to,
      reason: data.reason,
      files: data.supportingDocuments,
    });
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
          <SheetTrigger>
            <div
                className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded-lg shadow-md text-white text-sm font-medium"
            >
              <span className="mr-2">Apply Leave</span>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </SheetTrigger>
          <SheetContent>
      <SheetHeader>
        <SheetTitle className={cn(lemon.className, " text-2xl")}>
          Apply Leave
        </SheetTitle>
      </SheetHeader>
      <hr className="border-gray-200 my-4" />
      <Form {...form}>
        <ScrollArea
          className="w-full h-[500px] overflow-y-auto px-2"
        >
          <form
            className="space-y-6 px-2"
          >
            <div
              className={`text-md font-semibold text-gray-800 ${lemon.className}`}
            >
              {session?.user?.name}
            </div>
            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <Select
                    onValueChange={field.onChange} defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Leave Type"
                          {...field}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leaveTypes?.map((type) => (
                        <SelectItem 
                          key={type.id} 
                          value={type.id}
                        >
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from
                            ? `${format(field.value.from, "dd MMM yyyy")} - ${
                                field.value.to
                                  ? format(field.value.to, "dd MMM yyyy")
                                  : "Select End Date"
                              }`
                            : "Select Date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <FormControl>
                        <Calendar
                          mode="range"
                          fromDate={field.value.from}
                          selected={field.value}
                          onSelect={(date) => {
                            console.log(date);
                            const data = {
                              from: date?.from,
                              to: date?.to,
                            };
                            // @ts-expect-error idk
                            form.setValue("date", data);
                          }}
                          className="w-full"
                        />
                      </FormControl>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter Reason"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supportingDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                    {field.value?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((file: string | undefined) => (
                          <div
                            key={file}
                            className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-md"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </div>
                        ))}
                      </div>
                    )}
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          const filesArray = Array.from(files);
                          const filesURL = filesArray.map((file) =>
                            URL.createObjectURL(file)
                          );
                          form.setValue("supportingDocuments", filesURL);
                        }
                      }}
                      type="file"
                      multiple
                      placeholder="Enter Supporting Documents"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </ScrollArea>
      </Form>
      <hr className="border-gray-200 my-4" />
      <SheetFooter>
        <Button
          className="flex items-center justify-center w-full"
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          Apply Leave
        </Button>
        <SheetClose>
          Cancel
        </SheetClose>
      </SheetFooter>
    </SheetContent>
        </Sheet>
  );
}
