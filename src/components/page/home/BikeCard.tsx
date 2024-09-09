import { Button } from "@/components/ui/button";
import EditBikeModal from "../bikeManage/EditBikeModal";

const BikeCard = () => {
  return (
    <>
      <div className="p-5 rounded-md relative group border border-lightAccent cursor-pointer">
        <div className="mb-1">
          <img
            className="w-full h-[250px] object-cover rounded-md"
            src="/bike.jpg"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
            Yamaha 102
          </h4>
          <p>$7999</p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
            150 CC
          </h4>
          <p>Stock: 20</p>
        </div>

        <div className="view_detail absolute w-full h-full bg-lightAccent hidden group-hover:flex justify-center items-center left-0 top-0 flex-col gap-2">
          <Button variant="outline" className="">
            View Details
          </Button>
          <EditBikeModal />
          <Button variant="outline" className="">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default BikeCard;
