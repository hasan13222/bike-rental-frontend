import { Card, CardContent } from "@/components/ui/card";
import { FaStar, FaRegStar } from "react-icons/fa";

import {
    CarouselItem
  } from "@/components/ui/carousel";
import Rating from "react-rating";
const Testimony = () => {
    return (
        <>
           <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="p-6">
                  <div className="img_meta flex items-center gap-2 mb-3">
                    <img className="w-[80px] h-[80px] object-contain rounded-full" src="/avatar.jpg" alt="avatar" />
                    <div className="star_name">
                      <Rating
                        placeholderRating={4.8}
                        emptySymbol={<FaRegStar className="text-primary" />}
                        placeholderSymbol={<FaStar className="text-primary" />}
                        fullSymbol={<FaStar className="text-primary" />}
                      />
                      <p>Md. Shakhwat Hossain</p>
                    </div>
                  </div>

                  <blockquote>
                    <q>I had a fantastic experience renting a bike from this service! The staff was incredibly helpful in recommending the best bike for my needs, and the rental process was smooth and quick. The bike was in excellent condition, and I had no issues during my entire ride. I will definitely be coming back for another ride!</q>
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </CarouselItem> 
        </>
    );
};

export default Testimony;