import BikeModal from "@/components/page/bikes/BikeModal";
import BikesPagination from "@/components/page/bikes/BikesPagination";
import BikeCard from "@/components/page/home/BikeCard";
import { Button } from "@/components/ui/button";

const Bikes = () => {
  return (
    <>
      <div className="container py-8">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Our Bikes For Your Ride
          </h2>
          <div>
            <Button className="bg-secondary text-txtclr mr-2">Compare</Button>
          <BikeModal/>
          </div>
          
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

export default Bikes;
