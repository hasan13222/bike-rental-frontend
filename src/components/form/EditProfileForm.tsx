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
import { Input } from "@/components/ui/input";
import { CustomError } from "@/types/errorType";
import { toast } from "@/hooks/use-toast";
import { useUpdateProfileMutation } from "@/redux/api/user/userApi";

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
});

const EditProfileForm = ({ userData, token, setEditMode }: any) => {
  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name,
      phone: userData?.phone,
      address: userData?.address,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProfile = await updateProfile({ token, updateInfo: values });
    if (updatedProfile?.data?.success) {
      toast({ description: "Profile updated successfully" });
    }
    setEditMode(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem style={{ marginTop: 10 }}>
                <FormLabel>Your Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem style={{ marginTop: 10 }}>
                <FormLabel>Your Address</FormLabel>
                <FormControl>
                  <Input placeholder="Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button style={{ marginTop: 20 }} type="submit">
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

export default EditProfileForm;
