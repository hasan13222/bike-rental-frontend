import ScrollAnimation from "react-animate-on-scroll";
import ContactForm from "@/components/form/ContactForm";
import Banner from "@/components/page/home/Banner";
import BikeCard from "@/components/page/home/BikeCard";
import { CarouselSlider } from "@/components/page/home/CarouselSlider";
import ChooseUsItem from "@/components/page/home/ChooseUsItem";
import { MdOutlineLocationSearching } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { GoCopy } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Wheel } from "react-custom-roulette";
import "@/styles/discount.css";
import { Button } from "@/components/ui/button";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCouponsQuery } from "@/redux/api/coupon/couponApi";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import {
  useFixDiscountMutation,
  useGetUserRentalsQuery,
} from "@/redux/api/booking/bookingApi";

const Home = () => {
  const { data } = useGetBikesQuery(undefined);
  const { data: coupons } = useGetCouponsQuery(undefined);
  const [alertOpen, setAlertOpen] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelData, setWheelData] = useState<
    { option: string; code: string; style: any }[]
  >([]);

  const { data: userData } = useCheckLoginQuery(undefined);
  const { data: myRentals } = useGetUserRentalsQuery(userData?.data?.token);

  const [fixDiscount] = useFixDiscountMutation(userData);

  const navigate = useNavigate();
  const handleSpinClick = async () => {
    const activeRental = myRentals?.data?.find((item: any) => {
      return item.status === "unpaid" && !item?.discount_percent;
    });
    if (!activeRental) {
      toast({ description: "You have no active ride" });
      return;
    }
    if (mustSpin) {
      toast({ description: "You have already spun" });
    }
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);

      await fixDiscount({
        bookingId: activeRental._id,
        discount: wheelData[newPrizeNumber].option,
      });
      setMustSpin(!mustSpin);
    }
  };

  useEffect(() => {
    if (coupons) {
      const modifiedCoupons = coupons?.data?.map((item: any, i: number) => {
        const backgroundColor =
          i % 10 === 1 ? "#64ce47" : i % 10 === 2 ? "#6bd7a8" : "#97e3b0";
        return {
          option: item.discount_percent,
          code: item.code,
          style: { backgroundColor, textColor: "#0c1e08" },
        };
      });
      setWheelData(modifiedCoupons);
    }
  }, [coupons]);
  return (
    <>
      <Banner />

      {/* featured section */}
      <ScrollAnimation animateIn="fadeIn">
        <div className="container py-8">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Our Latest Bike
          </h2>
          <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
            {data?.data?.map((item: any, i: number) => {
              if (i < 8) {
                return (
                  <>
                    <BikeCard bikeData={item} />
                  </>
                );
              }
            })}
          </div>
        </div>
      </ScrollAnimation>

      {/* testimonial section */}
      <ScrollAnimation animateIn="fadeIn">
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Reviews
        </h2>
        <div className="px-14 mt-8">
          <CarouselSlider />
        </div>
      </div>
      </ScrollAnimation>

      {/* why choose us */}
      <ScrollAnimation animateIn="fadeIn">
      <div className="container py-8">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Why Choose Us
        </h2>
        <div className="chooseUs flex items-end">
          <ul className="chooseUs__items pl-8">
            <ChooseUsItem />
          </ul>
          <div className="img_wrapper -ml-5">
            <img
              className="max-h-[320px] object-contain"
              src="/customer.png"
              alt="smiling customer"
            />
          </div>
        </div>
      </div>
      </ScrollAnimation>

      {/* promotion */}
      <AlertDialog
        onOpenChange={() => setAlertOpen("close")}
        open={alertOpen === "open" ? true : undefined}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Coupon Code to avail discount.</AlertDialogTitle>
            <AlertDialogDescription>
              You got {wheelData[prizeNumber]?.option}% discount. To get the
              discount give the coupon code {wheelData[prizeNumber]?.code}{" "}
              <GoCopy
                className="cursor-pointer inline-block"
                size={22}
                onClick={() => {
                  navigator.clipboard.writeText(wheelData[prizeNumber]?.code);
                  toast({
                    description: "Your Coupon Code copied to clipboard",
                  });
                }}
              />{" "}
              when you pay
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/my-rentals")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="container my-8 mx-auto text-center">
        <div className="discount rounded-md">
          <div className="bg-[rgba(37,93,42,0.7)] py-24 rounded-md">
            <h2 className="scroll-m-20 text-bgclr text-5xl italic font-semibold tracking-tight mb-5">
              Huge Discount Using Coupon Code
            </h2>
            <p className="text-2xl text-bgclr mb-3">
              Use Coupon code to get upto 30% discount of your bike rent.
            </p>
            <Button onClick={handleSpinClick} variant="outline">
              Spin Your Luck
            </Button>
            {wheelData.length > 0 && (
              <div className="spinning_wheel flex justify-center items-center">
                <Wheel
                  onStopSpinning={() => setAlertOpen("open")}
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={wheelData}
                  backgroundColors={["#3e3e3e", "#df3428", "#3eee3e"]}
                  textColors={["#456342"]}
                  outerBorderWidth={1}
                  radiusLineWidth={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* contact us section */}
      <div className="container py-8 mx-auto">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Contact Us
        </h2>
        <div className="mt-1 flex flex-wrap gap-8">
          <div className="contact__address">
            <p>
              We’d love to hear from you! Whether you have questions about our
              bike rentals, need help planning your next ride, or just want to
              say hi, we’re here for you. Feel free to reach out to us through
              any of the following ways. For quick inquiries, just fill out the
              contact form below, and we’ll get back to you as soon as possible.
            </p>
            <ul className="mt-2">
              <li className="flex items-center gap-2 mb-2">
                <MdOutlineLocationSearching className="text-xl text-primary" />
                <p className="text-base font-medium">
                  Level-2, Road 345, Rasulpur, Patuakhali, Dhaka, Bangladesh.
                </p>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <IoMailOpenOutline className="text-xl text-primary" />
                <p className="text-base font-medium">BikeRental@email.com</p>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <FaMobileAlt className="text-xl text-primary" />
                <p className="text-base font-medium">01XXX859587</p>
              </li>
            </ul>
          </div>

          <div className="min-w-[500px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
