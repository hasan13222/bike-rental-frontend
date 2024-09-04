import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  bike_search: z.string(),
});

const BannerSearch = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bike_search: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center mb-3">
          <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="bike_search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search bike availability..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="border-gray-200 border bg-transparent hover:border-0" style={{marginTop: 0}} type="submit">Search</Button>
        </div>
          </form>
      </Form>
    </>
  );
};

export default BannerSearch;
