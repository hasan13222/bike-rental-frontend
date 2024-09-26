import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useGetBikesQuery } from "@/redux/api/bike/bikeApi";
import { useAppDispatch } from "@/redux/hooks";
import { setShowBikes } from "@/redux/features/bikeSlice";

const formSchema = z.object({
  brand: z.string(),
  model: z.string(),
  available: z.string(),
});

const BikeFilterForm = () => {
  const {  data } = useGetBikesQuery(undefined);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      model: "",
      available: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const filterData = data?.data?.filter((item:any) => {
      const brandVal = !values.brand || item.brand.toLowerCase() === values.brand.toLowerCase();
      const modelVal = !values.model || item.model.toLowerCase() === values.model.toLowerCase();
      const availableVal = !values.available || item.isAvailable.toString() === values.available;
      return brandVal && modelVal && availableVal;
    })
    dispatch(setShowBikes(filterData));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availablity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger defaultValue="available">
                      <SelectValue placeholder="Select Availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">Not Available</SelectItem>
                    <SelectItem value="true">Available</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="" style={{ marginTop: 20 }} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BikeFilterForm;
