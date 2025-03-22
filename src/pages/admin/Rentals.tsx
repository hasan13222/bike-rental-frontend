import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetAllRentalsQuery, useReturnBikeMutation } from "@/redux/api/booking/bookingApi";
import { CustomError } from "@/types/errorType";


const Rentals = () => {
  const {data:userData} = useCheckLoginQuery(undefined);
  const { data, isLoading, isError, error } = useGetAllRentalsQuery(userData?.data?.token);
  const [returnBike, {isLoading: returnLoading, isError: isReturnError, error: returnError}] = useReturnBikeMutation(userData?.data?.token);


  const handleReturn = async (bookingId: string) => {
    const returnedBike = await returnBike({bookingId, token: userData?.data?.token})
    if (returnedBike?.data?.data?.success){
      toast({description: returnedBike?.data?.data?.message})
    }
  }
  return (
    <>
      <div className="container">
        <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
          OnGoing Rides
        </h2>
      </div>
      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <div className="container"><p className="text-red-500">{(error as CustomError)?.data?.message}</p></div>
      )}
      {returnLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isReturnError && (
        <div className="container"><p className="text-red-500">{(returnError as CustomError)?.data?.message}</p></div>
      )}
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
              {data?.data?.map((item:any) => {
                if(item.bikeId?._id){
                  return (
                    <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item.bikeId?.name}
                    </TableCell>
                    <TableCell>{item.startTime}</TableCell>
                    <TableCell>{item.returnTime}</TableCell>
                    <TableCell>${item.totalCost}</TableCell>
                    {!item.isReturned && <TableCell>
                      <Button onClick={() => handleReturn(item._id)}>Calculate</Button>
                    </TableCell>}
                    
                  </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Rentals;
