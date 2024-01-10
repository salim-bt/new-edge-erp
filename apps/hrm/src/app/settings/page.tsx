
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Cog, FileBadge, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (  
        <div className='flex flex-col items-center'>   
            <div className='w-full md:w-1/2 p-4 mt-5'>
            <Card className="card p-4 mb-4 shadow-lg">
                <CardHeader>
                    <b>Admin Settings</b>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                            <Link href='/'><TableCell ><Button variant="ghost" size="icon"><Cog/>
                            </Button>
                            </TableCell>
                            <TableCell className='px-10'>Profile Settings</TableCell></Link>
                                </TableRow>
                            <TableRow>
                            <Link href='/leaveConfig'><TableCell><Button variant="ghost" size="icon"><FileBadge/>
                                </Button></TableCell>
                                <TableCell className='px-10'>Leave Configuration</TableCell></Link>
                            </TableRow>
                            <TableRow>
                            <Link href='/'><TableCell><Button variant="ghost" size="icon"><UserCog/>
                            </Button></TableCell>
                            <TableCell className='px-10'>User Access and Permissions</TableCell></Link>
                            </TableRow>
                            <TableRow>
                            <Link href='/'><TableCell><Button variant="ghost" size="icon"><ClipboardList/>
                            </Button>  </TableCell>
                            <TableCell className='px-10'>Reports and Analytics</TableCell></Link>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                </div> 
            </div>
    );
  }