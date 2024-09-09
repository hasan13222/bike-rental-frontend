import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    bike_name: "INV001",
    start_time: "Paid",
    return_time: "$250.00",
    total_cost: "Credit Card",
  },
  {
    bike_name: "INV002",
    start_time: "Pending",
    return_time: "$150.00",
    total_cost: "PayPal",
  },
];

const MyRentals = () => {
  return (
    <>
      <div className="container">
        <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Rentals
        </h2>
      </div>
      <div className="container py-8 mx-auto flex">
        <Tabs defaultValue="unpaid" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unpaid">UnPaid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="unpaid">
            <div className="border rounded-md">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="bg-primary text-white rounded-ss-md">
                      Bike Name
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Start Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Return Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Total Cost
                    </TableHead>
                    <TableHead className="bg-primary text-white rounded-tr-md">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.bike_name}>
                      <TableCell className="font-medium">
                        {invoice.bike_name}
                      </TableCell>
                      <TableCell>{invoice.start_time}</TableCell>
                      <TableCell>{invoice.return_time}</TableCell>
                      <TableCell>{invoice.total_cost}</TableCell>
                      <TableCell>
                        <Button>Pay</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="paid">
            <div className="border rounded-md">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="bg-primary text-white rounded-ss-md">
                      Bike Name
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Start Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Return Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Total Cost
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.bike_name}>
                      <TableCell className="font-medium">
                        {invoice.bike_name}
                      </TableCell>
                      <TableCell>{invoice.start_time}</TableCell>
                      <TableCell>{invoice.return_time}</TableCell>
                      <TableCell>{invoice.total_cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyRentals;
