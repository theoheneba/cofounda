import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
]

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active" },
  // Add more user data here
]

export default function UserManagement() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

