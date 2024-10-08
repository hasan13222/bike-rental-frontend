import BikeFilterForm from "@/components/form/BikeFilterForm"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function BikeModal() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
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
