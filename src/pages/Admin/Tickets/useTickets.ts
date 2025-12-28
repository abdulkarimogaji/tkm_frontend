import TKMSDK from "@/utils/TKMSDK";
import { createFilterString } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

type Ticket = {
  id: number;
};

type ResponseType = {
  error: boolean;
  message: string;
  tickets: Ticket[];
};

type Filters = {
  customer_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

type Pagination = {
  page?: string;
  size?: string;
};

async function fetchTickets({ queryKey }: { queryKey: any }) {
  const filtersStr = createFilterString(queryKey[1]);
  const sdk = new TKMSDK();
  return {
    error: false,
    message: "successful",
    tickets: [],
  };
  const response: ResponseType = await sdk.callRawAPI(
    `/v1/api/tickets?${filtersStr}`,
    "GET",
    undefined
  );
  return response;
}

export default function useTickets(filters: Filters, pagination: Pagination) {
  const result = useQuery({
    queryKey: ["tickets", filters, pagination],
    queryFn: fetchTickets,
    throwOnError: true,
  });

  return {
    tickets: result.data?.tickets ?? [],
  };
}
