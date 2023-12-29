import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { FaEdit, FaEye } from 'react-icons/fa'; // Assuming you have these icons available
import { z } from 'zod';
  
  const schema = z.object({
    name: z.string(),
    department: z.string(),
    designation: z.string().nonempty({ message: 'Required' }),
  });
  
  export default function EmployeeSearch() {
  
    function onSubmit() {
      // Perform search logic and update state with employee details
    }
  
    // Mock data for displaying in the table
    const employeeData = [
      { name: 'Salim Pradhan', email: 'salimpradhan@gmail.com', department: 'Software', designation: 'Backend-Developer' },
      // Add more employee data as needed
    ];
  
    return (
      <Flex direction="column" alignItems="center" height="100vh" ml="15%" >
        <Card p="4" shadow="lg" width="1250px" className="card" mb="4">
          <CardHeader>
            <b>Employee Search</b>
          </CardHeader>
          <CardBody>
            <form >
              <Flex direction="row" alignItems="center">
                <FormControl display="flex" alignItems="center">
                  <FormLabel ml={3} width="30%">
                    Name
                  </FormLabel>
                  <Input ml={2} flex="1" />
                </FormControl>
  
                <FormControl display="flex" alignItems="center">
                  <FormLabel ml={3} width="30%">
                    Department
                  </FormLabel>
                  <Input ml={2} flex="1" />
                </FormControl>
  
                <FormControl display="flex" alignItems="center">
                  <FormLabel ml={3} width="30%">
                    Designation
                  </FormLabel>
                  <Input ml={2} flex="1"/>
                  
                </FormControl>
              </Flex>
  
              <Button mt={4} type="submit">
                Search
              </Button>
            </form>
          </CardBody>
        </Card>
  
        {/* Employee Details Card */}
        <Card p="4" shadow="lg" width="1250px" className="card">
          <CardHeader>
            <b>Employee Details</b>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Department</Th>
                  <Th>Designation</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employeeData.map((employee) => (
                  <Tr key={employee.email}>
                    <Td>{employee.name}</Td>
                    <Td>{employee.email}</Td>
                    <Td>{employee.department}</Td>
                    <Td>{employee.designation}</Td>
                    <Td>
                      <IconButton icon={<FaEye />} aria-label="View" mr="2" />
                      <IconButton icon={<FaEdit />} aria-label="Edit" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
