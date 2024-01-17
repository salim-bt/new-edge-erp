"use client"

import * as React from "react"
import {
  CarrotIcon,
  ChevronDownIcon,
  FoldHorizontalIcon,
} from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Notification = {
    id: number;
    message: string;
    description: string;
    date: string;
};

const data: Notification[] = [
    {
        id: 1,
        message: "Leave Request Approved",
        description: "Your leave request has been approved.",
        date: "2021-10-01"
    },
    {
        id: 2,
        message: "New Task Assigned",
        description: "You have been assigned a new task.",
        date: "2021-10-02"
    },
    {
        id: 3,
        message: "Meeting Reminder",
        description: "Reminder: Team meeting at 2 PM.",
        date: "2021-10-03"
    },
    {
        id: 4,
        message: "Expense Report Submitted",
        description: "Your expense report has been submitted.",
        date: "2021-10-04"
    },
    {
        id: 5,
        message: "Project Deadline Extended",
        description: "The project deadline has been extended.",
        date: "2021-10-05"
    },
    {
        id: 6,
        message: "New Announcement",
        description: "Important announcement: Company-wide event.",
        date: "2021-10-06"
    },
    {
        id: 7,
        message: "Performance Review Reminder",
        description: "Reminder: Performance review next week.",
        date: "2021-10-07"
    },
    {
        id: 8,
        message: "Training Session Scheduled",
        description: "A training session has been scheduled.",
        date: "2021-10-08"
    },
    {
        id: 9,
        message: "New Employee Onboarded",
        description: "A new employee has been onboarded.",
        date: "2021-10-09"
    },
    {
        id: 10,
        message: "System Maintenance",
        description: "System maintenance scheduled for tomorrow.",
        date: "2021-10-10"
    },
    // Add 10 more unique data entries here
    {
        id: 11,
        message: "New Feature Released",
        description: "Exciting new feature now available.",
        date: "2021-10-11"
    },
    {
        id: 12,
        message: "Task Completed",
        description: "Congratulations! Task successfully completed.",
        date: "2021-10-12"
    },
    {
        id: 13,
        message: "Holiday Notice",
        description: "Upcoming holiday notice: Office closed.",
        date: "2021-10-13"
    },
    {
        id: 14,
        message: "Team Building Event",
        description: "Team building event next week.",
        date: "2021-10-14"
    },
    {
        id: 15,
        message: "New Project Started",
        description: "Exciting new project has started.",
        date: "2021-10-15"
    },
    {
        id: 16,
        message: "Training Session Reminder",
        description: "Reminder: Training session tomorrow.",
        date: "2021-10-16"
    },
    {
        id: 17,
        message: "Task Deadline Approaching",
        description: "Reminder: Task deadline approaching.",
        date: "2021-10-17"
    },
    {
        id: 18,
        message: "New Announcement",
        description: "Important announcement: Company update.",
        date: "2021-10-18"
    },
    {
        id: 19,
        message: "Leave Request Submitted",
        description: "Your leave request has been submitted.",
        date: "2021-10-19"
    },
    {
        id: 20,
        message: "Meeting Rescheduled",
        description: "The meeting has been rescheduled.",
        date: "2021-10-20"
    },
];
    
export const columns: ColumnDef<Notification>[] = [
  {
    id: "message",
    header: "Message",
    cell: ({ row }) => {
      const notification = row.original

      return (
        <div className="flex items-center space-x-2">
          <CarrotIcon className="h-4 w-4 text-blue-500" />
          <div>
            <div className="font-medium">{notification.message}</div>
            <div className="text-sm text-muted-foreground">
              {notification.description}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      const notification = row.original

      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {notification.date}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const notification = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FoldHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(notification.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Notification</DropdownMenuItem>
            <DropdownMenuItem
                className="text-red-500"
                onClick={
                    () => {
                        data.splice(data.indexOf(notification), 1);
                        console.log(data);
                    }
                }
            >Delete Notification</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function NotificationTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
