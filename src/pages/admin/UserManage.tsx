import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserManage = () => {
  const invoices = [
    {
      username: "INV001",
      user_email: "Paid",
      role: "$250.00",
      total_cost: "Credit Card",
    },
    {
      username: "INV002",
      user_email: "Pending",
      role: "$150.00",
      total_cost: "PayPal",
    },
  ];
  return (
    <>
      <div className="container">
        <h2 className="scroll-m-20 py-4 text-3xl font-semibold tracking-tight first:mt-0">
          User Management
        </h2>
        <div className="border rounded-md max-w-[600px]">
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead className="bg-primary text-white rounded-ss-md">
                  User Name
                </TableHead>
                <TableHead className="bg-primary text-white">
                  User Email
                </TableHead>
                <TableHead className="bg-primary text-white">Role</TableHead>
                <TableHead className="bg-primary text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.username}>
                  <TableCell className="font-medium">
                    {invoice.username}
                  </TableCell>
                  <TableCell>{invoice.user_email}</TableCell>
                  <TableCell>{invoice.role}</TableCell>
                  <TableCell>
                    <Button className="bg-secondary text-white">Promote</Button>{" "}/{" "}<Button className="bg-red-600 text-white">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManage;
