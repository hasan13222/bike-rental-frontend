import BikeFilterForm from "@/components/form/BikeFilterForm"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CreateCouponModal() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button><FaPlus className="mr-2"/> Create Coupon</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <BikeFilterForm/>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
