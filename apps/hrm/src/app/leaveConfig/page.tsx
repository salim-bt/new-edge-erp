
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from 'lucide-react';

export default function LeaveConfig() {
    return (
        <div className='flex flex-col items-center'>   
        <div className='w-full md:w-1/2 p-4 mt-5'>
            <Card className="p-4 shadow-lg">
            <CardHeader>
                <b>Employee Details</b>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead className="w-1/4">Allowed</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Annual Leave</TableCell>
                    <TableCell><Input type="text" className="w-1/3"/></TableCell>
                    <TableCell>
                        <div className="flex space-x-3">
                        <Button variant="ghost" size="icon"><Pencil/>
                        </Button>
                        <Button variant="ghost" size="icon"><Trash2/>
                        </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Casual Leave</TableCell>
                    <TableCell><Input type="text" className="w-1/3"/></TableCell>
                    <TableCell>
                        <div className="flex space-x-3">
                        <Button variant="ghost" size="icon"><Pencil/>
                        </Button>
                        <Button variant="ghost" size="icon"><Trash2/>
                        </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Maternity Leave</TableCell>
                    <TableCell><Input type="text" className="w-1/3"/></TableCell>
                    <TableCell>
                        <div className="flex space-x-3">
                        <Button variant="ghost" size="icon"><Pencil/>
                        </Button>
                        <Button variant="ghost" size="icon"><Trash2/>
                        </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>Paternity Leave</TableCell>
                    <TableCell><Input type="text" className="w-1/3"/></TableCell>
                    <TableCell>
                        <div className="flex space-x-3">
                        <Button variant="ghost" size="icon"><Pencil/>
                        </Button>
                        <Button variant="ghost" size="icon"><Trash2/>
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
  

