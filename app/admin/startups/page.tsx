import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Startup Name" },
  { accessorKey: "founder", header: "Founder" },
  { accessorKey: "description", header: "Description" },
  { 
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100 text-green-600">
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
        <Button size="sm" variant="outline" className="bg-red-50 hover:bg-red-100 text-red-600">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
      </div>
    ),
  },
]

const data = [
  { id: 1, name: "TechInnovate", founder: "Alice Johnson", description: "AI-powered solutions for small businesses" },
  { id: 2, name: "GreenGrowth", founder: "Bob Smith", description: "Sustainable agriculture technology" },
  // Add more startup data here
]

export default function StartupApproval() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Startup Approval</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

