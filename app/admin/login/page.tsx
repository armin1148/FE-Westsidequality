"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = (data: z.infer<typeof formSchema>) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push("/admin/pages");
      }
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/pages");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">Login Admin</h1>
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Enter username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter password"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => form.handleSubmit(handleLogin)()}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
