import { Card, CardHeader } from "@/components/ui/card";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import {
  useGetAllRentalsQuery,
  useGetUserRentalsQuery,
} from "@/redux/api/booking/bookingApi";
import { useGetCouponsQuery } from "@/redux/api/coupon/couponApi";
import { useGetAllUserQuery } from "@/redux/api/user/userApi";
import { useEffect, useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DueRides from "../user/DueRides";


const Dashboard = () => {
  const [customerChartData, setCustomerChartData] = useState<Record<string, any>[]>([]);
  const { data: userData } = useCheckLoginQuery(undefined);

  const { data: bikes } = useGetBikesQuery(undefined);
  const { data: users } = useGetAllUserQuery(userData?.data?.token);

  const { data: rentals } = useGetAllRentalsQuery(userData?.data?.token);
  const { data: coupons } = useGetCouponsQuery(userData?.data?.token);
  const { data: myRentals } = useGetUserRentalsQuery(userData?.data?.token);

  const totalRideTime = useMemo(() => {
    const totalTime = myRentals?.data?.reduce((acc: number, item: any) => {
      return acc + (new Date(item.returnTime).getTime() - new Date(item.startTime).getTime())
    }, 0);
    return totalTime / (1000 * 60 * 60)
  }, [myRentals]);

  const totalSpent = useMemo(() => {
    const total = myRentals?.data?.reduce((acc: number, item: any) => {
      if (item?.status === "paid") {
        return acc + item?.totalCost
      }
      return acc;
    }, 0);
    return total;
  }, [myRentals]);

  const totalDues = useMemo(() => {
    const total = myRentals?.data?.reduce((acc: number, item: any) => {
      if (item?.status === "unpaid") {
        return acc + item?.totalCost
      }
      return acc;
    }, 0);
    return total;
  }, [myRentals]);

  useEffect(() => {
    const dateWiseData: Record<string, any> = {};

    users?.data?.forEach((item: any) => {
      const date = item.createdAt.split('T')[0];
      return dateWiseData[date] ? dateWiseData[date].push(item._id) : dateWiseData[date] = [item._id]
    });

    const customerChartArray = Object.keys(dateWiseData).map((key: string) => {
      return { accDate: key, "No Of Customer": dateWiseData[key].length }
    });
    setCustomerChartData(customerChartArray);
  }, [users])
  return (
    <>
      <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>

      {/* summary */}
      <Card className="mt-1">
        <CardHeader className="border-b">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <div className="grid grid-cols-2">

            {userData?.data?.role === "user" && (
              <>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Rides Taken
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={myRentals?.data?.length} />
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Ride Time
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={totalRideTime} /> hr
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Spent
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    $<CountUp end={totalSpent} />
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Dues
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    $<CountUp end={totalDues} />
                  </span>
                </button>
              </>

            )}

            {userData?.data?.role === "admin" && (
              <>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Available Bikes to Ride
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={bikes?.data?.length} />
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total User
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={users?.data?.length} />
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Coupon
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={coupons?.data?.length} />
                  </span>
                </button>
                <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <span className="text-xs text-muted-foreground">
                    Total Rentals
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    <CountUp end={rentals?.data?.length} />
                  </span>
                </button>
              </>

            )}

          </div>
        </CardHeader>
      </Card>

      {/* monthwise customer */}
      {userData?.data?.role === "admin" && (
        <Card className="h-[400px] p-5 pb-14 mt-2">

          <h3 className="text-xl font-semibold mb-5">New Customer</h3>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <LineChart
                  data={customerChartData}
                  className="w-full"
                  height={height}
                  width={width}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line type="monotone" dataKey="No Of Customer" stroke="#64ce47" />
                  <CartesianGrid stroke="#4fb931" strokeDasharray="1 1" />
                  <XAxis dataKey="accDate" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              );
            }}
          </AutoSizer>
        </Card>
      )}



      {/* user dues */}
      {userData?.data?.role === "user" && (
        <DueRides />
      )}


    </>
  );
};

export default Dashboard;
