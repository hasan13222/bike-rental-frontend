import CreateBikeModal from "@/components/page/bikeManage/CreateBikeModal";
import EditBikeModal from "@/components/page/bikeManage/EditBikeModal";
import BikeModal from "@/components/page/bikes/BikeModal";
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
import { useDeleteBikeMutation, useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import { CustomError } from "@/types/errorType";
import { useNavigate } from "react-router-dom";

const BikeManage = () => {

  const { data: userData } = useCheckLoginQuery(undefined);
  const { isLoading, data, isError, error } = useGetBikesQuery(undefined);
  const [deleteBike] =
    useDeleteBikeMutation(userData);
  const navigate = useNavigate();

  const handleDelete = async (bikeId: string) => {
    const deletedBike = await deleteBike({
      bikeId,
      token: userData?.data?.token,
    });
    if (deletedBike.data.success) {
      toast({ description: "Bike deleted successfully" });
    }
  };
  return (
    <>
      <div className="container py-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Bike Management
            </h2>

            <CreateBikeModal />
          </div>
          <BikeModal />
        </div>

        {/* <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          {data?.data.map((item:any) => (
            <>
              <BikeCard bikeData={item} />
            </>
          ))}
        </div> */}

        <div className="container py-8 mx-auto flex">
          <div className="border rounded-md">
            <Table className="overflow-auto">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="bg-primary text-white rounded-ss-md">
                    Name
                  </TableHead>
                  <TableHead className="bg-primary text-white">
                    Image
                  </TableHead>
                  <TableHead className="bg-primary text-white">
                    Brand-Model-Year
                  </TableHead>
                  <TableHead className="bg-primary text-white">
                    cc
                  </TableHead>
                  <TableHead className="bg-primary text-white">
                    Price(/hr)
                  </TableHead>
                  <TableHead className="bg-primary text-white rounded-tr-md">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
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
              <TableBody>
                {data?.data?.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item?.name}</TableCell>

                    <TableCell><img className="h-20 w-20 object-contain" src={item?.image} alt="bike" /></TableCell>
                    <TableCell className="font-medium">{item?.brand}-{item?.model}-{item?.year}</TableCell>
                    <TableCell className="font-medium">{item?.cc}</TableCell>
                    <TableCell className="font-medium">{item?.pricePerHour}</TableCell>
                    <TableCell className="">

                      <Button
                        onClick={() => navigate(`/bikes/${item?._id}`)}
                        variant="outline"
                        className="mr-1"
                      >
                        View Details
                      </Button>
                      <EditBikeModal bikeId={item?._id} />
                      <Button onClick={() => handleDelete(item?._id)} className="bg-red-500 ml-1">
                        Delete
                      </Button>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="pagination mt-7">
          {/* <BikesPagination /> */}
        </div>
      </div>
    </>
  );
};

export default BikeManage;
