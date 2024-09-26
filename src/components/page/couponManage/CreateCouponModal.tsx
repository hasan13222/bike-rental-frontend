
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CreateCouponForm from "@/components/form/CreateCouponForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeCouponModal } from "@/redux/features/couponSlice";

export default function CreateCouponModal() {
  const {createCouponModalOpen} = useAppSelector(state => state.couponReducer)
  const dispatch = useAppDispatch();
  return (
    <Popover onOpenChange={(open) => dispatch(changeCouponModal(open + ""))}
    open={createCouponModalOpen === "close" ? false : undefined}>
      <PopoverTrigger asChild>
        <Button><FaPlus className="mr-2"/> Create Coupon</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <CreateCouponForm/>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
