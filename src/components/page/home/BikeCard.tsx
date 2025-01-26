import { Button } from "@/components/ui/button";
import EditBikeModal from "../bikeManage/EditBikeModal";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useDeleteBikeMutation } from "@/redux/api/bike/bikeApi";
import { CustomError } from "@/types/errorType";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setCompareState } from "@/redux/features/compareSlice";

const BikeCard = ({ bikeData, compareBtn=false }: any) => {
  const { data } = useCheckLoginQuery(undefined);
  const [deleteBike, { isLoading, isError, error }] =
    useDeleteBikeMutation(undefined);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const deletedBike = await deleteBike({
      bikeId: bikeData?._id,
      token: data?.data?.token,
    });
    if (deletedBike.data.success) {
      toast({ description: "Bike deleted successfully" });
    }
  };
  return (
    <>
      <div className="p-5 rounded-md relative group border shadow-md hover:scale-[1.05] transition-transform border-lightAccent cursor-pointer">
        <div className="mb-1">
          <img
            className="w-full h-[180px] object-cover rounded-md"
            src={bikeData?.image}
            alt=""
          />
        </div>
        <div className="pb-3 mb-3 border-b">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            {bikeData?.name}
          </h4>
          <p className="text-sm">{bikeData?.description.substr(0, 40)}...</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-base font-medium tracking-tight">
            {bikeData?.brand} {bikeData?.model} {bikeData?.year}
          </h4>
          <p className="font-bold text-lg">${bikeData?.pricePerHour}/hr</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-base font-medium tracking-tight">
            150 CC
          </h4>
          <p>{bikeData?.isAvailable ? "Available" : "Not Available"}</p>
        </div>
        {compareBtn && <Button onClick={() => dispatch(setCompareState(bikeData))} className="absolute top-3 right-3 z-50">Compare</Button>}
        
        <div className="view_detail absolute w-full h-full bg-lightAccent invisible group-hover:visible flex justify-center items-center left-0 top-0 flex-col gap-2">
          <Button
            onClick={() => navigate(`/bikes/${bikeData?._id}`)}
            variant="outline"
            className=""
          >
            View Details
          </Button>
          {data?.data?.role === "admin" && (
            <>
              <EditBikeModal bikeId={bikeData?._id} />
              <Button onClick={handleDelete} variant="outline" className="">
                Delete
              </Button>
            </>
          )}
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
      </div>
    </>
  );
};

export default BikeCard;
