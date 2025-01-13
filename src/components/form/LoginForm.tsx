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
import { useLoginUserMutation } from "@/redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";
import { CustomError } from "@/types/errorType";
import { useEffect, useMemo, useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

const LoginForm = () => {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [dfEmail, setDfEmail] = useState("");
  const [dfPassword, setDfPassword] = useState("");

  const defaultValues = useMemo(() => {
    return {
      email: dfEmail,
      password: dfPassword,
    };
  }, [dfEmail, dfPassword]);

  function adminHandler() {
    setDfEmail("jbike@example.com");
    setDfPassword("jbike123");
  }

  function userHandler() {
    setDfEmail("user@example.com");
    setDfPassword("user123");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const navigate = useNavigate();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loginData = await loginUser(values);
    if (loginData?.data.success) {
      navigate("/");
    }
  }

  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  return (
    <>
      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem style={{ marginTop: 10 }}>
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
            name="password"
            render={({ field }) => (
              <FormItem style={{ marginTop: 10 }}>
                <FormLabel>Your Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Button onClick={adminHandler} type="button" className="bg-accent">
              Admin
            </Button>
            <Button onClick={userHandler} type="button" className="bg-accent">
              User
            </Button>
          </div>

          <Button className="" style={{ marginTop: 20 }} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
    </>
  );
};

export default LoginForm;
