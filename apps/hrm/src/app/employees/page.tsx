"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Search } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  department: z.string().min(2, {
    message: "Department must be at least 2 characters.",
  }),
});

export default function EmployeeSearch({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: "",
    },
  });

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full md:w-2/3 p-4">
        <Card className="card p-3">
            <CardHeader>
              <CardTitle>Searching Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row">
                <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex-1 md:mr-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input className="w-5/6" placeholder="Employee name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input className="w-5/6" placeholder="Software" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-7">
                    <Button variant="outline" size="icon" type="submit"><Search/></Button>
                  </div>
                </Form>
              </div>
            </CardContent>
          </Card>
      </div>
      <div className="w-full md:w-4/6 p-4">
        <Card className="p-4 shadow-lg">
          <CardHeader>
            <b>Employee Details</b>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Salimd pradhan</TableCell>
                  <TableCell>Software development</TableCell>
                  <TableCell>Thimphu</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                    <Button variant="outline" size="icon"><Eye/>
                    </Button>
                    <Button variant="outline" size="icon"><Pencil/>
                    </Button>
                    </div>
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
 


);
}