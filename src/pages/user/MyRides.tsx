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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useCreateReviewMutation } from "@/redux/api/review/reviewApi";
import { toast } from "@/hooks/use-toast";

export default function MyRides() {
    const [alertOpen, setAlertOpen] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [bikeId, setBikeId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const { data: userData } = useCheckLoginQuery(undefined);
    const { data, isLoading, isError, error } = useGetUserRentalsQuery(
        userData?.data?.token
    );

    const [addReview, { isLoading: isPending }] = useCreateReviewMutation();

    async function addReviewHandler() {
        if(!review || !rating){
            toast({ title: "please give rating and review" })
            return;
        }        
        setAlertOpen("close");
        const newReview = { rating, review, userId: userData?.data?.id, bookingId, bikeId }
        const addedReview = await addReview({token: userData?.data?.token, newReview});
        if (addedReview?.data) {
            toast({ title: addedReview?.data?.message })
        }else{
            toast({title: (addedReview?.error as CustomError)?.data?.message})
        }
        setBikeId("");
        setBookingId("");
        setReview("");
        setRating(0);
    }

    function reviewDialogOpener(bkId: string, bkgId: string) {
        setBikeId(bkId);
        setBookingId(bkgId);
        setAlertOpen("open");
    }
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
                                    <TableHead className="bg-primary text-white">Cost</TableHead>
                                    <TableHead className="bg-primary text-white rounded-tr-md">Action</TableHead>
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
                                                <TableCell>
                                                    {(isPending && bookingId === item?._id) ? <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-2 border-t-primary" /> : <Button onClick={() => reviewDialogOpener(item?.bikeId?._id, item?._id)}>Review</Button>}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}

                            </TableBody>
                        </Table>
                    </div>

                </Card>
            </div>

            <AlertDialog
                onOpenChange={() => setAlertOpen("undefined")}
                open={
                    alertOpen === "open"
                        ? true
                        : alertOpen === "close"
                            ? false
                            : undefined
                }
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Please give rating and reviews on your journey.
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="stars pt-[1px] pr-1 App">
                                <Rating
                                    placeholderRating={0}
                                    emptySymbol={<FaRegStar className="text-primary" />}
                                    placeholderSymbol={<FaStar className="text-primary" />}
                                    fullSymbol={<FaStar className="text-primary" />}
                                    onChange={(value) => setRating(value)}
                                />
                            </div>
                            <div>
                                <input
                                    onChange={(e) => setReview(e.target.value)}
                                    className="border rounded-sm px-2 py-2"
                                    type="text"
                                    name="review"
                                    placeholder="Write your honest review here"
                                    id=""
                                />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAlertOpen("close")}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={addReviewHandler}>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
