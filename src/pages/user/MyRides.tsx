import { Card } from "@/components/ui/card";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetUserRentalsQuery } from "@/redux/api/booking/bookingApi";
import { CustomError } from "@/types/errorType";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function MyRides() {
    const { data: userData } = useCheckLoginQuery(undefined);
    const { data, isLoading, isError, error } = useGetUserRentalsQuery(
        userData?.data?.token
    );
    return (
        <>
            <div className="container">
                <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
                    My Successful Rides
                </h2>

                {isLoading && (
                    <button type="button" className="bg-primary" disabled>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        Loading...
                    </button>
                )}
                {isError && (
                    <div className="container">
                        <p className="text-red-500">
                            {(error as CustomError)?.data?.message}
                        </p>
                    </div>
                )}
            </div>


            <div className="container py-2 mx-auto flex">
                <Card className="p-5 pb-5">
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-primary text-white rounded-ss-md">Date</TableHead>
                                    <TableHead className="bg-primary text-white">Bike Name</TableHead>
                                    <TableHead className="bg-primary text-white">Start Time</TableHead>
                                    <TableHead className="bg-primary text-white">Return Time</TableHead>
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
                                                <TableCell>{item?.startTime.split('T')[1]}</TableCell>
                                                <TableCell>{item?.returnTime.split('T')[1]}</TableCell>
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
            </div>
        </>
    )
}
