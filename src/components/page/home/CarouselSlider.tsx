
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Testimony from "./Testimony";
import { reviews } from "@/constants/reviews";

export function CarouselSlider() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="">

        {reviews?.map((item) => (
          <Testimony item={item} key={item?.name} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
