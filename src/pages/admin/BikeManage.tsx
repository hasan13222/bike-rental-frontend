import CreateBikeModal from "@/components/page/bikeManage/CreateBikeModal";
import BikeModal from "@/components/page/bikes/BikeModal";
// import BikesPagination from "@/components/page/bikes/BikesPagination";
import BikeCard from "@/components/page/home/BikeCard";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import { CustomError } from "@/types/errorType";

const BikeManage = () => {
  const { isLoading, data, isError, error } = useGetBikesQuery(undefined);
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
        <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          {data?.data.map((item:any) => (
            <>
              <BikeCard bikeData={item} />
            </>
          ))}
        </div>

        <div className="pagination mt-7">
          {/* <BikesPagination /> */}
        </div>
      </div>
    </>
  );
};

export default BikeManage;
