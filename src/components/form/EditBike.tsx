import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import {
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
} from "@/redux/api/bike/bikeApi";
// import { useUploadImageMutation } from "@/redux/api/imageUploadApi";
import { CustomError } from "@/types/errorType";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { changeUpdateBikeModal } from "@/redux/features/bikeSlice";

const formSchema = z.object({
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  cc: z.string(),
  year: z.string(),
  model: z.string(),
  pricePerHour: z.string(),
  image: z.string().optional(),
});

const EditBike = ({ bikeId }: any) => {
  const dispatch = useAppDispatch();
  const { data: userData } = useCheckLoginQuery(undefined);
  const bikeImageFileRef = useRef<HTMLInputElement>(null);

  const { data: singleBike } = useGetSingleBikeQuery(bikeId);

  const [updateBike, { isLoading, isError, error }] =
    useUpdateBikeMutation(undefined);

  // const [uploadImage, { isLoading: imageUpLoading }] =
  //   useUploadImageMutation(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: singleBike?.data?.name + "",
      brand: singleBike?.data?.brand + "",
      description: singleBike?.data?.description + "",
      cc: singleBike?.data?.cc + "",
      year: singleBike?.data?.year + "",
      model: singleBike?.data?.model + "",
      pricePerHour: singleBike?.data?.pricePerHour + "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(bikeId);
    let newBike = {
      ...values,
      pricePerHour: Number(values.pricePerHour),
      year: Number(values.year),
      cc: Number(values.cc),
    };
    if (bikeImageFileRef?.current?.files instanceof FileList) {
      await axios
        .post(
          `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
          { image: bikeImageFileRef?.current?.files[0] },
          {
            headers: { "content-Type": "multipart/form-data" },
          }
        )
        .then(async (data) => {
          newBike = {
            ...newBike,
            image: data.data.data.display_url,
          };
          const updatedBike = await updateBike({
            bikeId,
            newBike,
            token: userData.data.token,
          });
          if (updatedBike?.data?.success) {
            toast({ description: "Updated Bike successfully" });
          }
          dispatch(changeUpdateBikeModal("close"));
        })
        .catch(async () => {
          const updatedBike = await updateBike({
            bikeId,
            newBike,
            token: userData.data.token,
          });
          if (updatedBike?.data?.success) {
            toast({ description: "Updated Bike successfully" });
          }
          dispatch(changeUpdateBikeModal("close"));
        });
    }
  }

  useEffect(() => {
    if (singleBike?.data) {
      form.reset({
        name: singleBike.data.name + "",
        brand: singleBike.data.brand + "",
        description: singleBike.data.description + "",
        cc: singleBike.data.cc + "",
        year: singleBike.data.year + "",
        model: singleBike.data.model + "",
        pricePerHour: singleBike.data.pricePerHour + "",
      });
    }
  }, [singleBike, form]);
  return (
    <>
    {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="image">Bike Image</label>
            <input ref={bikeImageFileRef} type="file" />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CC</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="cc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="pricePerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Hour</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="price per hour"
                    {...field}
                  />
                </FormControl>
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

export default EditBike;
