import { Button } from "@/components/ui/button";

const BikeCard = () => {
  return (
    <>
      <div className="p-5 rounded-md relative group border border-lightAccent cursor-pointer">
        <div>
          <img className="w-full h-[250px] object-cover rounded-md" src="/bike.jpg" alt="" />
        </div>
        <h4 className="scroll-m-20 text-base font-semibold tracking-tight">Yamaha 102</h4>
        <div className="view_detail absolute w-full h-full bg-lightAccent hidden group-hover:flex justify-center items-center left-0 top-0">
            <Button className="bg-transparent border-primary border hover:border-0">View Details</Button>
        </div>
      </div>
    </>
  );
};

export default BikeCard;
