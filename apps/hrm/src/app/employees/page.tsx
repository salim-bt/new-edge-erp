
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};


// Add this
export const metadata = () => {
  return {
    title: "My App",
  };
};

import { useClient } from "./hooks/useClient";

useClient(); // Add useClient hook 

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);





import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  FormControl,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function EmployeeSearch() {
  

  const employeeData = [
    { name: 'Salim Pradhan', email: 'salimpradhan@gmail.com', department: 'Software', designation: 'Backend-Developer' },];

  return (
    <div className="w-200 pl-96">
      <Card className="w-[350px] mb-4">
        <CardHeader>
          <CardTitle>Employee Search</CardTitle>
        </CardHeader>
        <Card>
          <form>
            <FormControl className="ml-3 w-100 flex items-center flex-col">
              <FormLabel className="ml-3 w-100" >
                Name
              </FormLabel>
              <Input className="ml-2 flex-1 mb-2"/>

              <FormLabel className="ml-3 w-100" >
                Department
              </FormLabel>
              <Input className="ml-2 flex-1 mb-2" />

              <FormLabel className="ml-3 w-100">
                Designation
              </FormLabel>
              <Input className="mt-2 mb-2 flex-1" />
            </FormControl>

            <Button className="mt-4" type="submit">
              Search
            </Button>
          </form>
        </Card>
      </Card>

      <div className="w-3/4 pl-96">
        <Card className="card w-1250  p-4 shadow-lg">
          <CardHeader>
            <b>Employee Details</b>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.map((employee) => (
                  <TableRow key={employee.email}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>
                      {/* Add your actions here */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
