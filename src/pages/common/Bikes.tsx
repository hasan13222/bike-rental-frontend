import BikeModal from "@/components/page/bikes/BikeModal";
import BikeCard from "@/components/page/home/BikeCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CustomError } from "@/types/errorType";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { setShowBikes } from "@/redux/features/bikeSlice";
import BikesPagination from "@/components/page/bikes/BikesPagination";
const Bikes = () => {
  const { isLoading, data, isError, error } = useGetBikesQuery(undefined);
  const {showBikes} = useAppSelector(state => state.bikeReducer);
  const dispatch = useAppDispatch();
  const [alertOpen, setAlertOpen] = useState("");
  const [compare, setCompare] = useState(false);

  const compareBikes = useAppSelector((state) => state.compareReducer);

  if (compareBikes.length === 1) {
    toast({ description: "Add One More Bike to compare" });
  }

  useEffect(() => {
    if (compareBikes.length === 2) {
      setAlertOpen("open");
    }
  }, [compareBikes]);

  useEffect(() => {
    dispatch(setShowBikes(data?.data));
  }, [data]);
  return (
    <>
      <div className="container py-8">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Our Bikes For Your Ride
          </h2>
          <div>
            <Button onClick={() => setCompare(!compare)} className="bg-secondary text-txtclr mr-2">Compare</Button>
            <BikeModal />
          </div>
        </div>
        {isLoading && (
          <div className="container">
            <button type="button" className="bg-primary" disabled>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              Loading...
            </button>
          </div>
        )}
        {isError && (
          <div className="container">
            <p className="text-red-500">
              {(error as CustomError)?.data?.message}
            </p>
          </div>
        )}
        {compareBikes.length === 2 && (
          <AlertDialog
            onOpenChange={() => setAlertOpen("close")}
            open={alertOpen === "open" ? true : undefined}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription>
                <div className="border rounded-md">
                  <Table className="border">
                    <TableHeader className="">
                      <TableRow>
                        <TableHead className="bg-primary text-white rounded-ss-md">
                          {compareBikes[0].name}
                        </TableHead>
                        <TableHead className="bg-primary text-white rounded-tr-md">
                          {compareBikes[1].name}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {compareBikes[0].brand}{" "}
                          {compareBikes[0].year}
                        </TableCell>
                        <TableCell>
                          {compareBikes[1].brand}{" "}  
                          {compareBikes[1].year}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {compareBikes[0].cc} CC
                        </TableCell>
                        <TableCell>{compareBikes[1].cc} CC</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {compareBikes[0].pricePerHour}/hr
                        </TableCell>
                        <TableCell>{compareBikes[1].pricePerHour}/hr</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          {showBikes?.map((item: any) => (
            <>
              <BikeCard compareBtn={compare} bikeData={item} />
            </>
          ))}
        </div>

        <div className="pagination mt-7">
          <BikesPagination />
        </div>
      </div>
    </>
  );
};

export default Bikes;
