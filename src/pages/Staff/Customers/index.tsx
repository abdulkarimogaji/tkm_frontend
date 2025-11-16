import { ArrowNarrowDownIcon, Share05Icon, UserPlus01Icon } from "@/components/Icons";
import { STATUSES } from "./statuses";
import useCustomers from "./useCustomers";
import moment from "moment";
import FilterButton from "@/components/FilterButton";
import { useSearchParams } from "react-router";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";

const columns = [
  {
    header: "Created Date",
    canSort: true,
    sortId: "created_at",
  },
  {
    header: "Details",
    canSort: true,
    sortId: "first_name",
  },
  {
    header: "Number of Invoices",
    canSort: false,
    sortId: "",
  },
  {
    header: "Total billed",
    canSort: false,
    sortId: "",
  },
  {
    header: "Total Collected",
    canSort: false,
    sortId: "",
  },
  {
    header: "Status",
    canSort: true,
    sortId: "status",
  },
];

export default function StaffCustomersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const sortOrder = searchParams.get("sort_order");

  const filters = {
    customer_id: searchParams.get("customer_id") || undefined,
    first_name: searchParams.get("first_name") || undefined,
    last_name: searchParams.get("last_name") || undefined,
    email: searchParams.get("email") || undefined,
    phone: searchParams.get("phone") || undefined,
  };
  const pagination = {
    page: searchParams.get("page") || undefined,
    size: searchParams.get("size") || undefined,
    sort_by: sortBy || undefined,
    sort_order: sortOrder || undefined,
  };

  const { customers, defaultCurrency } = useCustomers(filters, pagination);

  const [createCustomer, setCreateCustomer] = useState(false);

  return (
    <div className="bg-primary-25 h-screen p-6">
      <div className="rounded-lg border border-gray-200 bg-white">
        <header className="flex items-center justify-between">
          <h2 className="rounded-t-lg px-5 py-3 text-lg font-semibold text-gray-900">Customers</h2>
        </header>
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <FilterButton
              label="Customer ID"
              name="customer_id"
              type="text"
            />
            <FilterButton
              label="First name"
              name="first_name"
              type="text"
            />
            <FilterButton
              label="Last name"
              name="last_name"
              type="text"
            />
            <FilterButton
              label="Email"
              name="email"
              type="text"
            />
            <FilterButton
              label="Phone"
              name="phone"
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-primary-600 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white duration-200 hover:opacity-90 active:opacity-95"
              onClick={() => setCreateCustomer(true)}
            >
              <UserPlus01Icon className="h-5 w-5" /> Create Customer
            </button>
            <button className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">
              <Share05Icon className="h-4 w-4" /> Export
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-[minmax(200px,2fr)_minmax(300px,3fr)_minmax(200px,2fr)_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(152px,1fr)] items-center border-y border-gray-200">
            {columns.map((column) => (
              <div
                key={column.header}
                className={`flex cursor-pointer items-center gap-1 py-3 pl-6 text-left text-xs font-medium tracking-wider text-gray-600`}
              >
                <button
                  disabled={!column.canSort}
                  className={`flex items-center gap-2 ${column.canSort ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => {
                    searchParams.set("sort_by", column.sortId);
                    searchParams.set("sort_order", sortOrder === "asc" ? "desc" : "asc");
                    setSearchParams(searchParams);
                  }}
                >
                  {column.canSort ? (
                    <ArrowNarrowDownIcon
                      className={`h-3.5 w-3.5 ${sortBy === column.sortId ? "text-gray-600" : "text-gray-400"} ${sortBy === column.sortId && sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  ) : null}
                  {column.header}
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white text-sm font-medium text-gray-700">
            {customers.map((customer) => {
              return (
                <div
                  className={""}
                  key={customer.id}
                >
                  <div className={`grid h-18 grid-cols-[minmax(140px,2fr)_minmax(300px,3fr)_minmax(200px,2fr)_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(152px,1fr)] items-center`}>
                    <div className={`relative flex h-full pl-6 whitespace-nowrap`}>
                      <div className="flex h-18 items-center gap-x-2">
                        <div className="">
                          <span className={`block text-sm`}>{moment(customer.created_at).fromNow()}</span>

                          {true ? <span className={`mt-1 text-xs font-normal`}>{moment(customer.created_at).format("DD[th] MMMM [at] hh:mma")}</span> : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex h-18 pl-6 whitespace-nowrap">
                      <div className="flex items-center gap-3 font-medium text-gray-900">
                        <img
                          src={customer.photo ?? "/default.png"}
                          className="rounded-circle h-10 w-10 border border-gray-200 object-cover"
                        />
                        <div className={`flex flex-col`}>
                          <div className="flex items-center gap-x-2">
                            <span className="block max-w-40 truncate text-sm font-medium min-[1980px]:max-w-full">
                              {customer.first_name} {customer.last_name}
                            </span>
                          </div>
                          <span className={`text-sm font-normal`}>{customer.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-18 py-6 pl-6 whitespace-nowrap">
                      <div className={`flex h-full items-center gap-2`}>
                        <div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{customer.number_of_invoices}</span>
                            <span className="text-primary-500 text-xs font-medium">Download All</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`flex h-18 flex-col justify-center pl-6 font-normal`}>
                      {customer.total_billed.toLocaleString("en-US", { style: "currency", currency: customer.currency || defaultCurrency, minimumFractionDigits: 2 })}
                    </div>

                    <div className="flex h-18 py-6 pl-6 font-normal whitespace-nowrap">
                      {customer.total_collected.toLocaleString("en-US", { style: "currency", currency: customer.currency || defaultCurrency, minimumFractionDigits: 2 })}
                    </div>

                    <div className="flex h-18 items-center px-6 text-black">
                      <div className="flex w-full items-center justify-between gap-x-2">{STATUSES[customer.status]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CreateCustomerModal
        isOpen={createCustomer}
        closeModal={() => setCreateCustomer(false)}
      />
    </div>
  );
}
