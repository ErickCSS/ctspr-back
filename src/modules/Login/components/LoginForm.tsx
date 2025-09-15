"use client";

import { Form } from "@modules/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@modules/Login/schemas/login.schema";
import { Label } from "@modules/ui/label";
import { RenderFormField } from "@/modules/shared/components/RenderFormField";
import { Button } from "@/modules/ui/button";

export const LoginForm = () => {
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-sm">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <RenderFormField
              control={loginForm.control}
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              errors={loginForm.formState.errors}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password" className="text-base">
              Password
            </Label>
            <RenderFormField
              control={loginForm.control}
              name="password"
              type="password"
              placeholder="********"
              errors={loginForm.formState.errors}
            />
          </div>
          <Button
            type="submit"
            className="bg-secondaryColor min-h-[45px] cursor-pointer text-base text-white transition-colors duration-300 hover:bg-pink-700"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
