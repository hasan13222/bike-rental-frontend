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

const formSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    password: z.string(),
});

const EditProfileForm = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        full_name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {    
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="full_name"
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
            name="email"
            render={({ field }) => (
              <FormItem style={{marginTop: 10}}>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Full Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem style={{marginTop: 10}}>
                <FormLabel>Your Phone Number</FormLabel>
                <FormControl>
                <Input placeholder="Your Phone Number"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem style={{marginTop: 10}}>
                <FormLabel>Your Address</FormLabel>
                <FormControl>
                <Input placeholder="Your Address"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button className="" style={{marginTop: 20}} type="submit">Submit</Button>
          </form>
      </Form>
    </>
  );
};

export default EditProfileForm;
