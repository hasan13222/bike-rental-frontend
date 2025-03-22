import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetUserRentalsQuery } from "@/redux/api/booking/bookingApi";

export default function DueRides() {
    const { data: userData } = useCheckLoginQuery(undefined);
    const { data } = useGetUserRentalsQuery(
        userData?.data?.token
    );
    return (
        <>
            <Card className="p-5 pb-14 mt-5">
                <h3 className="text-xl font-semibold mb-5">My Successful Rides</h3>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="bg-primary text-white rounded-ss-md">Date</TableHead>
                                <TableHead className="bg-primary text-white">Bike Name</TableHead>
                                <TableHead className="bg-primary text-white">Ride Time</TableHead>
                                <TableHead className="bg-primary text-white rounded-tr-md">Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.map((item: any) => {
                                if (item.status === "paid") {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell className="font-medium">
                                                {item.returnTime.split('T')[0]}
                                            </TableCell>
                                            <TableCell>{item.bikeId?.name}</TableCell>
                                            <TableCell>{((new Date(item.returnTime).getTime() - new Date(item.startTime).getTime()) / (1000 * 60)).toFixed(2)} minutes</TableCell>
                                            <TableCell>${item?.totalCost}</TableCell>
                                        </TableRow>
                                    );
                                }
                            })}

                        </TableBody>
                    </Table>
                </div>

            </Card>
        </>
    )
}
