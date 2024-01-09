import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ban, Check } from 'lucide-react';

export default function Notifications(){

    return <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="w-full md:w-4/6 p-4">
        <Card className="p-4 shadow-lg">
          <CardHeader>
            <b>Leave Details</b>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type of leave</TableHead>
                  <TableHead>Leave start date</TableHead>
                  <TableHead>Leave end date</TableHead>
                  <TableHead>Leave Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Medical Leave</TableCell>
                  <TableCell>26/1/2024</TableCell>
                  <TableCell>29/1/2024</TableCell>
                  <TableCell>
                    <div className="flex space-x-3 ">
                    <Button className='w-5/6 bg-green-500 hover:bg-green-500'>
                        <Check className="mr-2 h-4 w-4" /> Approved
                    </Button>
                    </div>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maternity Leave</TableCell>
                  <TableCell>15/1/2024</TableCell>
                  <TableCell>15/6/2024</TableCell>
                  <TableCell>
                    <div className="flex space-x-3 ">
                    <Button className='w-5/6 bg-red-500 hover:bg-red-500'>
                        <Ban className="mr-2 h-4 w-4" /> Denied
                    </Button>
                    </div>
                    </TableCell>
                    <TableCell>You are male who is not entitled</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
}
