import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDoPaymentMutation,
  useGetUserRentalsQuery,
} from "@/redux/api/booking/bookingApi";
import { CustomError } from "@/types/errorType";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
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
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useGetCouponsQuery } from "@/redux/api/coupon/couponApi";
import { Input } from "@/components/ui/input";

const MyRentals = () => {
  const [alertOpen, setAlertOpen] = useState("");
  const [payingBookingId, setPayingBookingId] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [userCoupon, setUserCoupon] = useState<Record<string, any>>({});
  const [isCouponCodeWrong, setIsCouponCodeWrong] = useState(false);
  const [payableAmount, setPayableAmount] = useState(0);
  const { data: userData } = useCheckLoginQuery(undefined);
  const { data, isLoading, isError, error } = useGetUserRentalsQuery(
    userData?.data?.token
  );


  const { data: coupons } = useGetCouponsQuery(undefined);
  const stripe = useStripe();
  const elements = useElements();
  const [
    doPayment,
    { isLoading: paymentLoading, isError: isPaymentError, error: paymentError },
  ] = useDoPaymentMutation(data);

  const triggerPaymentOption = (id: string, cost: number, discount: number) => {
    if (!cost) {
      toast({
        description:
          "Please return your bike first to end your ride and then pay.",
      });
      return;
    }
    const userCouponFound = coupons?.data?.find(
      (item: any) => item.discount_percent === discount
    );
    if (userCouponFound) {
      setUserCoupon(userCouponFound);
    }
    setPayableAmount(cost)
    setPayingBookingId(id);
    setTotalCost(cost);
    setAlertOpen("open");
  };

  const handleCouponInput = (value:string) => {
    if (value !== userCoupon.code) {
      setIsCouponCodeWrong(true);
      setPayableAmount(totalCost)
      return;
    } else {
      setIsCouponCodeWrong(false);
      setPayableAmount(
        totalCost - totalCost * userCoupon.discount_percent * 0.01
      );
    }
  }
  const handlePay = async () => {      
    
    if (!stripe || !elements) {
      setAlertOpen("open");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setAlertOpen("open");
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast({ description: "payment error" });      
      setAlertOpen("open");
      return;
    }

    const completePayment = await doPayment({
      body: {
        totalCost,
        name: userData?.data?.name,
        discount: totalCost - payableAmount,
      },
      bookingId: payingBookingId,
    });
    if (completePayment?.data?.success) {
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
          if (result.error) {
            toast({
              description: "Your payment failed",
            });
          }
          if (result.paymentIntent) {
            setAlertOpen("close");
            toast({
              description: "Your payment is completed successfully",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Rentals
        </h2>
      </div>
      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <div className="container">
          <p className="text-red-500">
            {(error as CustomError)?.data?.message}
          </p>
        </div>
      )}
      {paymentLoading && (
        <div className="container">
          <button type="button" className="bg-primary" disabled>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            Loading...
          </button>
        </div>
      )}
      {isPaymentError && (
        <div className="container">
          <p className="text-red-500">
            {(paymentError as CustomError)?.data?.message}
          </p>
        </div>
      )}
      <div className="container py-8 mx-auto flex">
        <Tabs defaultValue="unpaid" className="w-[800px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unpaid">UnPaid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="unpaid">
            <div className="border rounded-md">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="bg-primary text-white rounded-ss-md">
                      Bike Name
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Start Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Return Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Total Cost
                    </TableHead>
                    <TableHead className="bg-primary text-white rounded-tr-md">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item: any) => {
                    if (item.status !== "paid") {
                      return (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">
                            {item.bikeId?.name}
                          </TableCell>
                          <TableCell>{item.startTime}</TableCell>
                          <TableCell>{item.returnTime}</TableCell>
                          <TableCell>{item.totalCost}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() =>
                                triggerPaymentOption(
                                  item._id,
                                  item.totalCost,
                                  item.discount
                                )
                              }
                            >
                              Pay
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="paid">
            <div className="border rounded-md">
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="bg-primary text-white rounded-ss-md">
                      Bike Name
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Start Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Return Time
                    </TableHead>
                    <TableHead className="bg-primary text-white">
                      Total Cost
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item: any) => {
                    if (item.status === "paid") {
                      return (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">
                            {item.bikeId?.name}
                          </TableCell>
                          <TableCell>{item.startTime}</TableCell>
                          <TableCell>{item.returnTime}</TableCell>
                          <TableCell>{item.totalCost}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog
        onOpenChange={() => setAlertOpen("undefined")}
        open={
          alertOpen === "open"
            ? true
            : alertOpen === "close"
            ? false
            : undefined
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Please give card details to complete your payment.
            </AlertDialogTitle>
            <AlertDialogDescription>
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
              {userCoupon?.code && (
                <div className="space-y-1 mt-2">
                  <p>Use {userCoupon.code} to get discount</p>
                  <Input
                    className="block"
                    onChange={(e) => handleCouponInput(e.target.value)}
                    placeholder="give coupon code"
                  />
                  {isCouponCodeWrong && (
                    <p className="text-red-500">wrong coupon code</p>
                  )}
                </div>
              )}

              <div className="space-y-1 mt-2">
                <p>Amount to Pay</p>
                <Input readOnly value={payableAmount} />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePay}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyRentals;
