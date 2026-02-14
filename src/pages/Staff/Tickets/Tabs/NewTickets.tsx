import FilterButton from "@/components/FilterButton";
import {
  AnnotationInfoIcon,
  ArrowCircleRightIcon,
  ArrowNarrowDownIcon,
  FlagIcon,
  Share05Icon,
  UserPlus01Icon,
} from "@/components/Icons";
import { useState } from "react";
import CreateTicketModal from "../CreateTicketModal";
import useTickets, { type Ticket } from "../useTickets";
import { useSearchParams } from "react-router";
import moment from "moment";
import PaginationHeader from "@/components/Pagination/PaginationHeader";

const columns = [
  {
    header: "Pending time",
    canSort: true,
    sortId: "pending_time",
  },
  {
    header: "Filed by",
    canSort: true,
    sortId: "first_name",
  },
  {
    header: "Ticket subject",
    canSort: true,
    sortId: "category",
  },
  {
    header: "Status",
    canSort: false,
  },
  {
    header: "Priority",
    canSort: true,
    sortId: "priority",
  },
  {
    header: "Details",
    canSort: false,
  },
];

const paginationData = {
  currentPage: 1,
  pageSize: 10,
  totalNumber: 1000,
  totalPages: 20,
};

export default function StaffNewTickets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const sortOrder = searchParams.get("sort_order");

  const filters = {};
  const pagination = {
    page: searchParams.get("page") || undefined,
    size: searchParams.get("size") || undefined,
    sort_by: sortBy || undefined,
    sort_order: sortOrder || undefined,
  };

  const { tickets } = useTickets(filters, pagination);
  const [createTicket, setCreateTicket] = useState(false);
  return (
    <div className="h-full">
      <div className="flex items-center justify-between pl-8 pr-5 py-4">
        <div className="flex items-center gap-2">
          <FilterButton label="Customer" name="customer_id" type="text" />
          <FilterButton
            label="Date submitted"
            name="date_submitted"
            type="text"
          />
          <FilterButton label="Ticket type" name="ticket_type" type="text" />
          <FilterButton label="Email" name="email" type="text" />
          <FilterButton label="Priority" name="priority" type="text" />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary-600 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white duration-200 hover:opacity-90 active:opacity-95"
            onClick={() => setCreateTicket(true)}
          >
            <UserPlus01Icon className="h-5 w-5" /> Create Ticket
          </button>
          <button className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">
            <Share05Icon className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex h-full flex-col bg-white">
          <div className="flex  h-full flex-col items-center justify-center gap-2 border-y border-gray-200 bg-gray-50">
            <AnnotationInfoIcon
              className="h-12 w-12 text-primary-200"
              strokeWidth={2}
            />
            <div className="">
              <h2 className="font-semibold text-[#101828]">No New Tickets</h2>
            </div>
            <p className="max-w-[480px] pt-2 text-center text-sm text-gray-600">
              There are currently no tickets to display. Once a customer submits
              a ticket, it will appear here for your review and action.
            </p>
          </div>
        </div>
      ) : (
        <div className={`flex grow flex-col rounded duration-100`}>
          <PaginationHeader paginationData={paginationData} />
          <div className="grow">
            <div className="w-full divide-y divide-gray-200 bg-white">
              <div className="border-t bg-gray-50">
                <div className="grid grid-cols-[minmax(200px,2fr)_minmax(300px,3fr)_minmax(200px,2fr)_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(152px,1fr)] items-center  ">
                  {columns.map((column) => (
                    <div
                      key={column.header}
                      className={`flex cursor-pointer items-center gap-1 py-3 pl-6 text-left text-xs font-medium tracking-wider text-gray-600`}
                    >
                      <button
                        disabled={!column.canSort}
                        className={`flex items-center gap-2 ${
                          column.canSort ? "cursor-pointer" : "cursor-default"
                        }`}
                        onClick={() => {
                          searchParams.set("sort_by", column.sortId ?? "");
                          searchParams.set(
                            "sort_order",
                            sortOrder === "asc" ? "desc" : "asc",
                          );
                          setSearchParams(searchParams);
                        }}
                      >
                        {column.header}
                        {column.canSort ? (
                          <ArrowNarrowDownIcon
                            className={`h-3.5 w-3.5 ${
                              sortBy === column.sortId
                                ? "text-gray-600"
                                : "text-gray-400"
                            } ${
                              sortBy === column.sortId && sortOrder === "desc"
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        ) : null}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {tickets.map((row) => {
                  return <TableRow ticket={row} key={row.id} />;
                })}
              </div>
            </div>
          </div>
          <PaginationHeader paginationData={paginationData} />
        </div>
      )}

      <CreateTicketModal
        isOpen={createTicket}
        closeModal={() => setCreateTicket(false)}
      />
    </div>
  );
}

function TableRow({ ticket }: { ticket: Ticket }) {
  function complaintOverdue(date: string) {
    // TODO: get from settings
    const overdueDays = 0;
    return moment(date).diff(moment(), "days") > overdueDays;
  }

  return (
    <div className={"h-[72px]"}>
      <div
        className={`grid grid-cols-[minmax(140px,2fr)_minmax(300px,3fr)_minmax(200px,2fr)_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(152px,1fr)] items-center`}
      >
        <div
          className={`relative flex h-full whitespace-nowrap  pl-6  ${
            complaintOverdue(ticket.date_submitted) &&
            ticket.status === "escalated"
              ? "bg-red-700 text-white" // Overdue and Escalated → Red Background
              : ticket.status === "escalated"
                ? "bg-purple-700 text-white" // Escalated but not overdue → Purple Background
                : ""
          }`}
        >
          <div className="flex items-center gap-x-2">
            <div className="">
              <span
                className={`block text-sm ${
                  complaintOverdue(ticket.date_submitted)
                    ? "text-red-700" // Overdue → Red text
                    : ticket.status === "3"
                      ? "text-purple-700" // Escalated → Purple text
                      : "text-gray-600" // Default → Black text
                }`}
              >
                {moment(ticket.date_submitted).toNow(true)}
              </span>
              <span
                className={`mt-1 text-[10px] font-normal ${
                  complaintOverdue(ticket.date_submitted)
                    ? "text-red-700" // Overdue → Red text
                    : ticket.status === "3"
                      ? "text-purple-700" // Escalated → Purple text
                      : "text-gray-900" // Default → Gray text
                }`}
              >
                {moment(ticket.date_submitted).format("DD/MM/YYYY")} at{" "}
                {moment(ticket.date_submitted).format("hh:mm a")}
              </span>
            </div>
          </div>
        </div>

        <div className=" flex  whitespace-nowrap pl-6">
          <div className="flex items-center gap-3 font-medium text-gray-900">
            <img
              src={ticket.customer.user.photo || "/images/widgets/default.png"}
              className="h-10 w-10 rounded-circle object-cover"
            />
            <div
              className={`flex flex-col text-gray-900 ${complaintOverdue(ticket.date_submitted)}`}
            >
              <div className="flex items-center gap-x-2 ">
                <span className="block max-w-40 truncate  text-sm font-medium min-[1980px]:max-w-full">
                  {ticket.customer.user.first_name}{" "}
                  {ticket.customer.user.last_name}
                </span>
              </div>
              <span
                className={`text-sm font-normal ${complaintOverdue(ticket.date_submitted) ? "text-gray-600" : ""} `}
              >
                {ticket.customer.user.email}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Share05Icon className="h-6 w-6 text-gray-500" strokeWidth={2} />
          <div>
            <p className="text-xs text-gray-600 font-semibold">
              {ticket.category.name}
            </p>
            <p className="text-[10px] text0gray-600 font-normal">
              {ticket.category.name}
            </p>
          </div>
        </div>

        <span className="w-fit rounded-[100vw] py-0.5 pl-1.5 pr-2 bg-blue-50 text-blue-700 flex items-center gap-1">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="3" className="fill-blue-500" />
          </svg>
          New
        </span>

        <div className="flex items-center whitespace-nowrap py-6 pl-6 font-normal text-gray-600">
          <FlagIcon />
          {ticket.priority}
        </div>

        <div className=" flex items-center  px-6 text-black">
          <div className="flex w-full items-center justify-between gap-x-2">
            <button>
              <ArrowCircleRightIcon
                className="h-5 w-5 text-gray-500"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
