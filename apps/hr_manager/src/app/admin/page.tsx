import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Table,
    Tbody,
    Td,
    Tr
} from '@chakra-ui/react';
import { ClipboardCheck, MailCheck, Settings, UserCog } from 'lucide-react';
export default function Home() {
    return (  
        <center>      
            <Flex justifyContent="center" direction="column" alignItems="center" height="100vh" >
                <Card p="4" shadow="lg" width="700px" className="card" mb="4">
                <CardHeader>
                    <b>Admin Settings</b>
                </CardHeader>
                <CardBody>
                    <Table variant="simple">
                    {/* <Thead>
                        <Tr>
                        <Th> 
                        
                        </Th>
                        <Th>Settings</Th>
                        </Tr>
                    </Thead> */}
                    <Tbody>
                        <Tr _hover={{ background: 'gray.100' }}>
                            <Td>
                            <Settings/>
                            </Td>
                        <Td>Profile Settings</Td>
                        </Tr>
                        <Tr _hover={{ background: 'gray.100' }}>
                            <Td>
                            <MailCheck/>
                            </Td>
                        <Td><a href="leaveConfig">Leave Configuration</a></Td>
                        
                        </Tr>
                        <Tr _hover={{ background: 'gray.100' }}>
                            <Td>
                            <UserCog/>
                            </Td>
                        <Td>User Access and Permissions</Td>
                        
                        </Tr>
                        <Tr _hover={{ background: 'gray.100' }}>
                            <Td>
                                <ClipboardCheck/>
                            </Td>
                        <Td>Reports and Analytics</Td>
                        
                        </Tr>
                    </Tbody>
                    </Table>
                </CardBody>
                </Card>
            </Flex>
        </center>
    );
  }