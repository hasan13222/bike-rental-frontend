import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateBikeForm from "@/components/form/CreateBikeForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeBikeModal } from "@/redux/features/bikeSlice";

export default function CreateBikeModal() {
  const { createBikeModalOpen } = useAppSelector((state) => state.bikeReducer);
  const dispatch = useAppDispatch();
  return (
    <Popover
      onOpenChange={(open) => dispatch(changeBikeModal(open + ""))}
      open={createBikeModalOpen === "close" ? false : undefined}
    >
      <PopoverTrigger asChild>
        <Button>
          <FaPlus className="mr-2" /> Create Bike
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2 max-h-[300px] overflow-y-auto overflow-x-clip">
            <CreateBikeForm />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
