"use client";

import { Form } from "@modules/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@modules/Login/schemas/login.schema";
import { Label } from "@modules/ui/label";
import { RenderFormField } from "@/modules/shared/components/RenderFormField";
import { Button } from "@/modules/ui/button";
import { login } from "@modules/Login/actions/login.actions";
import { createDelayedPromise } from "@modules/shared/utils";
import { IconLoader2 } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

export const LoginForm = () => {
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = loginForm.formState.isSubmitting;

  const onSubmit = async (data: LoginSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await login(formData);
    console.log(result);
    if (result.success === false) {
      toast.error(result.message);
      loginForm.reset();
      return;
    }
    await createDelayedPromise();
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
            className="bg-secondaryColor disabled:bg-secondaryColor/70 min-h-[45px] cursor-pointer text-base text-white transition-colors duration-300 hover:bg-pink-700 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-x-2">
                <IconLoader2 className="animate-spin" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
