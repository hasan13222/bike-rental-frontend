import EditBike from "@/components/form/EditBike"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { changeUpdateBikeModal } from "@/redux/features/bikeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function EditBikeModal({bikeId}:any) {
  const { updateBikeModalOpen } = useAppSelector((state) => state.bikeReducer);
  const dispatch = useAppDispatch();
  return (
    <Popover onOpenChange={(open) => dispatch(changeUpdateBikeModal(open + ""))}
    open={updateBikeModalOpen === "close" ? false : undefined}>
      <PopoverTrigger asChild>
        <Button className="bg-yellow-500">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2 max-h-[300px] overflow-x-clip overflow-y-auto">
            <EditBike bikeId={bikeId}/>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
