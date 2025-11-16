import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

import { type Control, useController } from "react-hook-form";
import { SearchLgIcon } from "./Icons";

function formatName(first: string, last: string) {
  return `${first} ${last}`;
}

type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  photo: string | null;
};

type Props = {
  customers: Customer[];
  control: Control<any>;
  name: string;
};

export default function SelectCustomer({ customers, control, name }: Props) {
  const [query, setQuery] = useState("");

  const { field, fieldState } = useController({ name, control });

  const filteredCustomers =
    query === ""
      ? customers
      : customers

          .filter((cus) =>
            formatName(cus.first_name, cus.last_name)
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          )
          .sort((a, b) => {
            if (
              formatName(a.first_name, a.last_name)
                .toLowerCase()
                .indexOf(query.toLowerCase()) >
              formatName(b.first_name, b.last_name)
                .toLowerCase()
                .indexOf(query.toLowerCase())
            ) {
              return 1;
            } else if (
              formatName(a.first_name, a.last_name)
                .toLowerCase()
                .indexOf(query.toLowerCase()) <
              formatName(b.first_name, b.last_name)
                .toLowerCase()
                .indexOf(query.toLowerCase())
            ) {
              return -1;
            } else {
              if (
                formatName(a.first_name, a.last_name) >
                formatName(b.first_name, b.last_name)
              )
                return 1;
              else return -1;
            }
          });

  const selectedCustomer = customers.find((c) => c.id == field.value);

  return (
    <Listbox
      value={field.value}
      onChange={(v) => {
        field.onChange({ target: { value: v } });
      }}
    >
      <div className="relative w-full">
        <ListboxButton
          ref={field.ref}
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left focus:border-transparent focus:ring-2 ${
            fieldState.error ? "ring-red-600" : "ring-primary-600"
          } ${false ? "text-gray-500" : ""}`}
        >
          {!selectedCustomer ? (
            <span> - select - </span>
          ) : (
            <div className="flex items-center gap-3">
              <img
                className="rounded-circle h-6 w-6 object-cover"
                src={selectedCustomer.photo || "/default.png"}
              />
              <span
                className={`text-base ${
                  false ? "font-medium" : "font-normal"
                } truncate text-gray-700`}
              >
                {formatName(
                  selectedCustomer.first_name,
                  selectedCustomer.last_name
                )}
              </span>
            </div>
          )}
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
          <ListboxOptions className="custom-shadow absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition duration-100 ease-in focus:outline-none">
            <div className="border-b border-gray-200 p-4">
              <div className="ring-primary-600 relative flex w-full items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-2 duration-100 outline-none focus-within:border-transparent focus-within:ring-2 focus-within:outline-none">
                <SearchLgIcon
                  className="h-5 w-5 text-gray-500"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  className="w-full grow bg-[#F9FAFB] py-2 placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:outline-none"
                  placeholder={`Type to search`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="small-scroll max-h-56 scroll-p-2 overflow-y-auto">
              {filteredCustomers.map((user, idx) => (
                <ListboxOption
                  key={idx}
                  className={({ focus }) =>
                    `${
                      focus ? "bg-gray-100 text-gray-700" : "text-gray-700"
                    } relative flex cursor-pointer items-center gap-3 py-2 pr-6 pl-4 select-none ${
                      idx === customers.length - 1
                        ? ""
                        : "border-b border-gray-200"
                    }`
                  }
                  value={user.id}
                >
                  <img
                    src={user.photo || "/default.png"}
                    alt=""
                    className="rounded-circle h-6 w-6 object-cover"
                  />
                  <span className={`block truncate font-medium text-gray-700`}>
                    {formatName(user.first_name, user.last_name)}
                  </span>
                </ListboxOption>
              ))}

              {filteredCustomers.length === 0 && (
                <p className="p-3 text-sm text-gray-500">No options found</p>
              )}
            </div>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
