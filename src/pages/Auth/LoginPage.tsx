import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import TKMSDK from "@/utils/TKMSDK";
import { useAuthDispatchContext } from "@/context/auth";

export default function LoginPage() {
  const authDispatch = useAuthDispatchContext();
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      const sdk = new TKMSDK();
      const response = await sdk.callRawAPI("/v1/api/login", "post", {
        email: data.email,
        password: data.password,
      });
      authDispatch({
        type: "LOGIN",
        payload: {
          role: response.role,
          token: response.token,
          user_id: response.user_id,
        },
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      setError("root", { message: (err as { message: string }).message });
    }
  }

  return (
    <div className="grid h-screen grid-cols-[1fr_1.5fr] items-center">
      <div className="flex h-full flex-col items-center justify-between">
        <div></div>
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
            <Fieldset>
              <Field className={"mt-6"}>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                  {...register("email")}
                />
                <p className="text-xs text-red-600 empty:hidden">
                  {errors.email?.message}
                </p>
              </Field>
              <Field className={"mt-5"}>
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                  type="password"
                  {...register("password")}
                />
                <p className="text-xs text-red-600 empty:hidden">
                  {errors.password?.message}
                </p>
                <Link
                  to={"/forgot-password"}
                  className="text-primary-600 mt-1 text-sm font-semibold"
                >
                  Forgot password
                </Link>
              </Field>
            </Fieldset>
            <p className="text-xs text-red-600 empty:hidden">
              {errors.root?.message}
            </p>
            <Button
              type="submit"
              className={
                "bg-primary-600 mt-6 w-full cursor-pointer rounded-lg py-2.5 font-semibold text-white"
              }
            >
              Login
            </Button>

            <div className="mt-10 flex items-center gap-4">
              <div className="grow border border-gray-200" />
              <p className="text-sm font-medium text-gray-500">OR</p>
              <div className="grow border border-gray-200" />
            </div>
          </form>
        </div>
        <div></div>
      </div>
      <div className="login-image h-full" />
    </div>
  );
}
