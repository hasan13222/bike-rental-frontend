import { Card, CardHeader } from "@/components/ui/card";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import {
  useGetAllRentalsQuery,
  useGetUserRentalsQuery,
} from "@/redux/api/booking/bookingApi";
import { useGetCouponsQuery } from "@/redux/api/coupon/couponApi";
import { useGetAllUserQuery } from "@/redux/api/user/userApi";
const Dashboard = () => {
  const { data: userData } = useCheckLoginQuery(undefined);

  const { data: bikes } = useGetBikesQuery(undefined);
  const { data: users } = useGetAllUserQuery(userData?.data?.token);

  const { data: rentals } = useGetAllRentalsQuery(userData?.data?.token);
  const { data: coupons } = useGetCouponsQuery(userData?.data?.token);
  const { data: myRentals } = useGetUserRentalsQuery(userData?.data?.token);
  return (
    <>
      <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>
      <Card>
        <CardHeader className="border-b">
          <div className="grid grid-cols-2">
            <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">
                Total Available Bike
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {bikes?.data?.length}
              </span>
            </button>
            {userData?.data?.role === "user" && (
              <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-xs text-muted-foreground">
                  Total Rides
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {myRentals?.data?.length}
                </span>
              </button>
            )}
            {userData?.data?.role === "admin" && (
              <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-xs text-muted-foreground">
                  Total User
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {users?.data?.length}
                </span>
              </button>
            )}

            {userData?.data?.role === "admin" && (
              <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-xs text-muted-foreground">
                  Total Coupon
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {coupons?.data?.length}
                </span>
              </button>
            )}

            {userData?.data?.role === "admin" && (
              <button className="relative z-30 flex flex-col my-4 justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-xs text-muted-foreground">
                  Total Rentals
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {rentals?.data?.length}
                </span>
              </button>
            )}
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default Dashboard;
