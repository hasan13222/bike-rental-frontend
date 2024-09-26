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
import { Input } from "../ui/input";
// import { useUploadImageMutation } from "@/redux/api/imageUploadApi";
import { CustomError } from "@/types/errorType";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useUpdateCouponMutation } from "@/redux/api/coupon/couponApi";
import { changeUpdateCouponModal } from "@/redux/features/couponSlice";

const formSchema = z.object({
  code: z.string(),
  discount_percent: z.string(),
});

const EditCouponForm = ({ singleCoupon }: any) => {
  const dispatch = useAppDispatch();
  const { data: userData } = useCheckLoginQuery(undefined);

  const [updateCoupon, { isLoading, isError, error }] =
    useUpdateCouponMutation(undefined);

  // const [uploadImage, { isLoading: imageUpLoading }] =
  //   useUploadImageMutation(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: singleCoupon.code,
      discount_percent: singleCoupon.discount_percent + "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedCoupon = await updateCoupon({
      couponId: singleCoupon._id,
      updateCoupon: values,
      token: userData.data.token,
    });
    if (updatedCoupon.data.success) {
      toast({ description: "Updated Coupon successfully" });
    }
    dispatch(changeUpdateCouponModal("close"));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Percentage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="discount percent"
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

      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
    </>
  );
};

export default EditCouponForm;
