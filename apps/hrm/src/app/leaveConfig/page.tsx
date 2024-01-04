import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
  
export default function LeaveConfig() {
    return (
      <Flex direction="column" alignItems="center" height="100vh">
        <Card p="4" shadow="lg" width="700px" className="card" mb="4">
          <CardHeader>
            <b>Leave Configuration</b>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Leave Type</Th>
                  <Th style={{ width: '50px' }}>Allowed</Th>
                  <Th style={{ paddingLeft: '50px' }}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Annual Leave</Td>
                  <Td>
                    <Input type="number" />
                  </Td>
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit" mr="2" />
                    <IconButton icon={<FaTrash />} aria-label="Delete" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Casual Leave</Td>
                  <Td>
                    <Input type="number" />
                  </Td>
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit" mr="2" />
                    <IconButton icon={<FaTrash />} aria-label="Delete" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Maternity Leave</Td>
                  <Td>
                    <Input type="number"  />
                  </Td>
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit" mr="2" />
                    <IconButton icon={<FaTrash />} aria-label="Delete" />
                  </Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>Paternity Leave</Td>
                  <Td>
                    <Input type="number" />
                  </Td>
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit" mr="2" />
                    <IconButton icon={<FaTrash />} aria-label="Delete" />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
 