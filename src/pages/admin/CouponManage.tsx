import CreateCouponModal from "@/components/page/couponManage/CreateCouponModal";
import { Button } from "@/components/ui/button";
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

const CouponManage = () => {
  return (
    <>
      <div className="container">
      <div className="flex gap-4 mt-5">
            
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Running Coupons
            </h2>
            
          <CreateCouponModal/>
          </div>
      </div>
      <div className="container py-8 mx-auto flex">
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
                  <TableCell className="flex gap-2">
                    <Button className="bg-secondary text-txtclr">Calculate</Button>
                    <Button className="bg-accent">End Ride</Button>
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

export default CouponManage;
