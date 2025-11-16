import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, PlusCircleIcon, XCircleIcon } from "../Icons";
import { useState } from "react";
import { useSearchParams } from "react-router";

type Props = {
  label: string;
  name: string;
  type: "text" | "select";
};

export default function FilterButton({ label, name, type }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(name);
  const [name2, setName2] = useState(value ?? "");
  return (
    <Popover>
      <PopoverButton className="flex cursor-pointer items-center gap-1 rounded-3xl border border-gray-200 px-1 py-0.5 text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50">
        {value ? (
          <XCircleIcon
            className="h-3 w-3"
            strokeWidth={2.5}
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              searchParams.delete(name);
              setSearchParams(searchParams);
              setName2("");
            }}
          />
        ) : (
          <PlusCircleIcon
            className="h-3 w-3"
            strokeWidth={2.5}
          />
        )}
        {label}{" "}
        {value ? (
          <div className="flex items-center gap-2 border-l border-gray-200 pl-2">
            <p className="text-primary-600 text-xs font-medium">{value}</p>
            <ChevronDownIcon className="h-3 w-3" />
          </div>
        ) : null}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="custom-shadow rounded-xl border border-gray-200 bg-white p-4 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(1)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {({ close }) => (
          <>
            <p className="font-semibold">Filter by {label}</p>
            {type === "text" ? (
              <input
                type="text"
                className="ring-primary-600 mt-2 w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus-within:border-transparent focus-within:ring-1"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            ) : null}
            <button
              type="button"
              className="bg-primary-600 mt-4 w-full cursor-pointer rounded-lg py-1.5 text-xs font-semibold text-white hover:opacity-80 active:opacity-95"
              onClick={() => {
                searchParams.set(name, name2);
                setSearchParams(searchParams);
                close();
              }}
            >
              Apply
            </button>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
}
