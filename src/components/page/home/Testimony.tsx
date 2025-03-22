import { Card, CardContent } from "@/components/ui/card";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  CarouselItem
} from "@/components/ui/carousel";
import Rating from "react-rating";

const Testimony = ({ item }: { item: {name: string, review: string }}) => {
  return (
    <>
      <CarouselItem className="md:basis-1/2 lg:basis-1/3">
        <div className="p-1 h-full">
          <Card>
            <CardContent className="p-6">
              <div className="img_meta flex items-center gap-2 mb-3">
                <img className="w-[60px] h-[60px] object-contain rounded-full" src="/avatar.png" alt="avatar" />
                <div className="star_name">
                  <Rating
                    placeholderRating={4.8}
                    emptySymbol={<FaRegStar className="text-primary" />}
                    placeholderSymbol={<FaStar className="text-primary" />}
                    fullSymbol={<FaStar className="text-primary" />}
                  />
                  <p>{item?.name}</p>
                </div>
              </div>

              <blockquote>
                <q>{item?.review}</q>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </>
  );
};

export default Testimony;