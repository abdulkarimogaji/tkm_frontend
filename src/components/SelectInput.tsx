import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Control, useController } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

type Props = {
  options: Array<any>;
  control: Control<any>;
  name: string;
};

export default function SelectInput({ control, name, options }: Props) {
  const { field, fieldState } = useController({ name, control });
  const selected = options.find((o) => o.value == field.value);
  return (
    <div className="relative">
      <Listbox
        value={field.value}
        onChange={(v) => {
          field.onChange({ target: { value: v } });
        }}
      >
        <ListboxButton
          ref={field.ref}
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left focus:border-transparent focus:ring-2 ${
            fieldState.error ? "ring-red-600" : "ring-primary-600"
          } ${false ? "text-gray-500" : ""}`}
        >
          {selected?.label || "- select -"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className={clsx("custom-shadow absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none", "")}>
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={`group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-100`}
              >
                <div className="text-sm/6">{option.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
