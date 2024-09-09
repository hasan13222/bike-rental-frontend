import CreateBikeModal from "@/components/page/bikeManage/CreateBikeModal";
import BikeModal from "@/components/page/bikes/BikeModal";
import BikesPagination from "@/components/page/bikes/BikesPagination";
import BikeCard from "@/components/page/home/BikeCard";

const BikeManage = () => {
  return (
    <>
      <div className="container py-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Bike Management
            </h2>
            
          <CreateBikeModal/>
          </div>
          <BikeModal />
        </div>

        <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          <BikeCard />
          <BikeCard />
          <BikeCard />
          <BikeCard />
          <BikeCard />
        </div>

        <div className="pagination mt-7">
          <BikesPagination />
        </div>
      </div>
    </>
  );
};

export default BikeManage;
