import BookingStartForm from "@/components/form/BookingStartForm";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SingleBike = () => {
  return (
    <>
      <div className="container mx-auto px-3 py-8">
        <div className="singleBike container mx-auto px-3 py-8 flex items-center gap-8">
          <div className="img_wrapper">
            <img
              className="w-[550px] h-[400px] object-contain"
              src="/bike.jpg"
              alt=""
            />
          </div>
          <div className="text_wrapper flex flex-col gap-3">
            <h3 className="font-semibold uppercase">Yamaha</h3>

            <p className="text-accentColor font-semibold">
              Availability: 12 in Stock
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste accusamus aut sint architecto illum facilis delectus eius
              officia magni.
            </p>
            <p className="price font-bold text-lg">$20</p>
            <div className="addToCart flex gap-4 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-primary" variant="outline">
                    Book Now
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <p>Please pay 100tk in advance to confirm your riding.</p>
                      <Button>Pay</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBike;
