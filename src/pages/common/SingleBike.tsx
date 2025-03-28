// import BookingStartForm from "@/components/form/BookingStartForm";
import BikeCard from "@/components/page/home/BikeCard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetBikesQuery, useGetSingleBikeQuery } from "@/redux/api/bike/bikeApi";
import { useStartRideMutation } from "@/redux/api/booking/bookingApi";
import { useTakePaymentMutation } from "@/redux/api/booking/paymentApi";
import { useGetBikeReviewsQuery } from "@/redux/api/review/reviewApi";
import { CustomError } from "@/types/errorType";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";

const SingleBike = () => {
  const { bikeId } = useParams();
  const {
    data,
    isLoading: isSingleBikeLoading,
    isError: isSingleBikeError,
    error: singleBikeError,
  } = useGetSingleBikeQuery(bikeId);


  const { data: bikes } = useGetBikesQuery({})
  const { data: bikeReviews } = useGetBikeReviewsQuery(bikeId);

  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [popover, setPopover] = useState("");
  const [stripeLoading, setStripeLoading] = useState(false);

  const { data: userData } = useCheckLoginQuery(undefined);

  const [
    takePayment,
    { isLoading, isError, error: paymentError, data: payment },
  ] = useTakePaymentMutation(userData);

  const [
    startRide,
    { isLoading: rideLoading, isError: isRideError, error: rideError },
  ] = useStartRideMutation(payment);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!data?.data?.isAvailable) {
      toast({ description: "Bike is not available" })
      return;
    }
    if (!userData?.success) {
      navigate("/login");
    }
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast({ description: "payment error" });
    }

    const completePayment = await takePayment(userData.data);
    if (completePayment) {
      setStripeLoading(true);
      console.log(completePayment);
      await stripe
        .confirmCardPayment(completePayment.data.data.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: userData.data?.name,
              email: userData.data?.email,
            },
          },
        })
        .then(async function (result) {
          setStripeLoading(false);
          if (result.error) {
            toast({
              description: "Your payment failed",
            });
          }
          if (result.paymentIntent) {
            toast({
              description: "Your payment is completed successfully",
            });
            setPopover("close");
            const rideStarted = await startRide({ data: { bikeId, startTime: new Date() }, token: userData?.data?.token })
            if (rideStarted?.data?.success) {
              navigate("/my-rentals");
            }

          }
        })
        .catch((err) => {
          if (err) {
            setStripeLoading(false);
          }
        });
    }

    if (isError) {
      toast({ description: (paymentError as CustomError).data?.message });
    }
  };
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="singleBike mx-auto py-8 flex items-center gap-8">
          <div className="img_wrapper">
            <img
              className="w-[550px] object-contain"
              src={data?.data?.image}
              alt=""
            />
          </div>
          <div className="text_wrapper flex flex-col gap-2">

            <h2 className="font-bold text-xl">{data?.data?.name}</h2>
            <p>{data?.data?.description}</p>
            <h3 className="font-bold uppercase">Specification</h3>
            <div className="flex gap-5">
              <p className="text-accentColor w-32 font-semibold">
                Brand: {data?.data?.brand}
              </p>
              <p className="text-accentColor w-32 font-semibold">
                Model: {data?.data?.model}
              </p>
            </div>

            <div className="flex gap-5">
              <p className="text-accentColor w-32 font-semibold">
                Year: {data?.data?.year}
              </p>
              <p className="text-accentColor w-32 font-semibold">
                CC: {data?.data?.cc}
              </p>
            </div>

            <div className="flex gap-5">

              <p className="text-accentColor w-32 font-semibold">
                Availability?: {data?.data?.isAvailable ? "Yes" : "No"}
              </p>
              <p className="text-accentColor w-32 font-semibold">
                Rate: ${data?.data?.pricePerHour}/hr
              </p>
            </div>

            {userData?.data?.role !== "admin" && <div className="addToCart flex gap-4 items-center">
              <Popover
                onOpenChange={(open) => setPopover(open + "")}
                open={popover === "close" ? false : undefined}
              >
                <PopoverTrigger asChild>
                  <Button className="bg-primary" variant="outline">
                    Start Ride Now
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <p>Please pay $10 as booking money.</p>
                      <Button onClick={handleBooking}>Pay</Button>
                      <p>Test Card No. 4242424242424242</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>}

          </div>
        </div>
      </div>
      {isLoading && (
        <div className="container">
          <button type="button" className="bg-primary" disabled>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            Loading...
          </button>
        </div>
      )}
      {stripeLoading && (
        <div className="container">
          <button type="button" className="bg-primary" disabled>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            Loading...
          </button>
        </div>
      )}
      {isSingleBikeLoading && (
        <div className="container">
          <button type="button" className="bg-primary" disabled>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            Loading...
          </button>
        </div>
      )}
      {isSingleBikeError && (
        <div className="container">
          <p className="text-red-500">
            {(singleBikeError as CustomError)?.data?.message}
          </p>
        </div>
      )}
      {rideLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isRideError && (
        <div className="container">
          <p className="text-red-500">
            {(rideError as CustomError)?.data?.message}
          </p>
        </div>
      )}

      <div className="container py-8">
        <h2 className="scroll-m-20 pb-5 text-3xl font-semibold tracking-tight first:mt-0">
          Reviews
        </h2>

        {bikeReviews?.data?.map((item: any) => (
          <div className="flex gap-2 border-b pb-4 mb-4">
            <img className="h-14 object-contain rounded-full" src="/avatar.png" alt="avatar" />
            <div>
              <h3 className="font-semibold text-xl">{item.userId.name}</h3>
              <Rating
                placeholderRating={item.rating}
                emptySymbol={<FaRegStar className="text-primary" />}
                placeholderSymbol={<FaStar className="text-primary" />}
                fullSymbol={<FaStar className="text-primary" />}
                readonly={true}
              />
              <p>{item.review}</p>
            </div>

          </div>
        ))}

      </div>

      {/* reviews */}
      <div className="container pb-8">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Related Bikes
        </h2>
        <div className="bike__items grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5">
          {bikes?.data?.filter((item: any) => (item?.year - data?.data?.year) < 3 && (item?.year - data?.data?.year) > -3).map((item: any) => {
            return (
              <>
                <BikeCard bikeData={item} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SingleBike;
