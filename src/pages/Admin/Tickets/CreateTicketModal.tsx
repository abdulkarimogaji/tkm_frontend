import { XCloseIcon } from "@/components/Icons";
import TKMSDK from "@/utils/TKMSDK";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function CreateTicketModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const queryClient = useQueryClient();

  const schema = yup
    .object({
      first_name: yup.string().required("This field is required"),
      last_name: yup.string().required("This field is required"),
      email: yup
        .string()
        .required("This field is required")
        .email("invalid email address"),
      phone: yup.string().required("This field is required"),
      photo: yup.string(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, defaultValues },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const sdk = new TKMSDK();
      // TODO: use dedicated create customer api
      await sdk.callRawAPI("/v1/api/users", "post", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        role: "customer",
        password: "test1234",
      });

      queryClient.invalidateQueries({ queryKey: ["customers"] });
      closeModal();
      reset(defaultValues);
    } catch (err: any) {
      // throw err;
      setError("root", { message: err.message });
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-white/75">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="custom-shadow w-full max-w-md rounded-xl border border-gray-200 bg-white p-3 text-sm backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex items-center justify-between p-3">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900"
              >
                Create Invoice
              </DialogTitle>
              <button
                type="button"
                className="cursor-pointer"
                onClick={closeModal}
              >
                <XCloseIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-96 overflow-y-auto px-3"
            >
              <Fieldset>
                <Field className={"mt-4"}>
                  <Label className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                    {...register("first_name")}
                  />
                  <p className="text-xs text-red-600 empty:hidden">
                    {errors.first_name?.message}
                  </p>
                </Field>

                <Field className={"mt-4"}>
                  <Label className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                    {...register("last_name")}
                  />
                  <p className="text-xs text-red-600 empty:hidden">
                    {errors.last_name?.message}
                  </p>
                </Field>

                <Field className={"mt-4"}>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    type="text"
                    className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                    {...register("email")}
                  />
                  <p className="text-xs text-red-600 empty:hidden">
                    {errors.email?.message}
                  </p>
                </Field>

                <Field className={"mt-4"}>
                  <Label className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    type="text"
                    className={`ring-primary-600 mt-1.5 w-full rounded-lg border border-gray-300 p-2 px-4 py-2 font-normal duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none`}
                    {...register("phone")}
                  />
                  <p className="text-xs text-red-600 empty:hidden">
                    {errors.phone?.message}
                  </p>
                </Field>

                {/* TODO: add photo input */}
              </Fieldset>
              <Button
                className="bg-primary-600 mt-6 w-full cursor-pointer rounded-lg px-3 py-2 font-semibold text-white hover:opacity-90 active:opacity-95"
                type="submit"
              >
                Create Customer
              </Button>
            </form>
            <p className="text-xs text-red-600 empty:hidden">
              {errors.root?.message}
            </p>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
