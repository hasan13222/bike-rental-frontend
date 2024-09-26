import CreateCouponModal from "@/components/page/couponManage/CreateCouponModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "@/redux/api/coupon/couponApi";
import { CustomError } from "@/types/errorType";
import EditCouponForm from "@/components/form/EditCouponForm";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeUpdateCouponModal } from "@/redux/features/couponSlice";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";

const CouponManage = () => {
  const { data: userData } = useCheckLoginQuery(undefined);
  const { updateCouponModalOpen } = useAppSelector(
    (state) => state.couponReducer
  );
  const dispatch = useAppDispatch();
  const {
    data: coupons,
    isLoading,
    isError,
    error,
  } = useGetCouponsQuery(userData?.data?.token);
  const [
    deleteCoupon,
    { isLoading: couponLoading, isError: isCouponError, error: couponError },
  ] = useDeleteCouponMutation(coupons);

  const handleDelete = async (id: string) => {
    const deletedCoupon = await deleteCoupon({
      couponId: id,
      token: userData?.data?.token,
    });
    if (deletedCoupon?.data?.success) {
      toast({ description: deletedCoupon?.data?.message });
    }
  };
  return (
    <>
      <div className="container">
        <div className="flex gap-4 mt-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Running Coupons
          </h2>

          <CreateCouponModal />
        </div>
      </div>
      <div className="container py-8 mx-auto flex">
        <div className="border rounded-md">
          <Table className="overflow-auto">
            <TableHeader className="">
              <TableRow>
                <TableHead className="bg-primary text-white rounded-ss-md">
                  Coupon Code
                </TableHead>
                <TableHead className="bg-primary text-white">
                  Discount Percentage
                </TableHead>
                <TableHead className="bg-primary text-white rounded-tr-md">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
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
            {couponLoading && (
              <button type="button" className="bg-primary" disabled>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                Loading...
              </button>
            )}
            {isCouponError && (
              <div className="container">
                <p className="text-red-500">
                  {(couponError as CustomError)?.data?.message}
                </p>
              </div>
            )}
            <TableBody>
              {coupons?.data?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.discount_percent}</TableCell>
                  <TableCell className="flex gap-2">
                    <Popover
                      onOpenChange={(open) =>
                        dispatch(changeUpdateCouponModal(open + ""))
                      }
                      open={
                        updateCouponModalOpen === "close" ? false : undefined
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button>Edit Coupon</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <EditCouponForm singleCoupon={item} />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button
                      onClick={() => handleDelete(item._id)}
                      className="bg-accent"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CouponManage;
