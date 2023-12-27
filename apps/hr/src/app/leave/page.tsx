"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/app/leave/_components/date-range-picker";
import { Textarea } from "@/components/ui/textarea";
import {api} from "@/trpc/react";
const leaveSchema = z.object({
    leaveType: z.string(),
    leaveTime: z.object({
        startDate: z.string(),
        endDate: z.string(),
    }),
    description: z.string(),
});

export default function Leave() {

    const { mutate, error } = api.leave.applyLeave.useMutation();

    const leaveForm = useForm<z.infer<typeof leaveSchema>>({
        resolver: zodResolver(leaveSchema),
        defaultValues: {
            leaveType: "",
            leaveTime: {
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
            },
            description: "",
        }
    });

    function onSubmit(data: z.infer<typeof leaveSchema>) {
        console.log(data);
        mutate({
            startDate: data.leaveTime.startDate,
            // @ts-ignore
            endDate: data.leaveTime.endDate,
            leaveTypeId: data.leaveType,
            reason: data.description,
            // @ts-ignore
            staffId: localStorage.getItem("userId"),
        })

        if (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center mt-24 justify-start bg-white">
            <Form {...leaveForm}>
                <form onSubmit={leaveForm.handleSubmit(onSubmit)} className="w-4/5 md:w-2/3 lg:w-1/3  space-y-6">
                    <div className="flex flex-row w-full justify-center items-center my-20">
                        <div className="flex flex-col items-center justify-center">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                            <p className="mt-4 text-xl font-bold">
                                Leave Application
                            </p>
                        </div>
                    </div>

                    <FormField
                        control={leaveForm.control}
                        name="leaveType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Leave Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Leave Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="annual leave">Annual Leave</SelectItem>
                                        <SelectItem value="medical leave">Medical Leave</SelectItem>
                                        <SelectItem value="maternity leave">Maternity Leave</SelectItem>
                                        <SelectItem value="paternity leave">Paternity Leave</SelectItem>
                                        <SelectItem value="casual leave">Casual Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={leaveForm.control}
                        name="leaveTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <br />
                                <FormControl>
                                    <DateRangePicker
                                        initialDateFrom={field.value.startDate}
                                        initialDateTo={field.value.endDate}
                                        showCompare={true}
                                        align="start"
                                        onUpdate={({
                                            range: {
                                                from,
                                                to
                                            }
                                        }) => {
                                            field.onChange({
                                                startDate: from.toISOString(),
                                                endDate: to?.toISOString()
                                            });
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={leaveForm.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Description"
                                        cols={12}
                                        rows={10}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );

}
