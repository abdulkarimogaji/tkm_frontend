import type { CustomerStatus } from "@/utils/mappings";
import TKMSDK from "@/utils/TKMSDK";
import { createFilterString } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: CustomerStatus;
  created_at: string;
  number_of_invoices: number;
  total_billed: number;
  total_collected: number;
  photo: string | null;
  currency: string;
};

type ResponseType = {
  success: boolean;
  message: string;
  data: Customer[];
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

async function fetchCustomers({ queryKey }: { queryKey: any }) {
  const filtersStr = createFilterString(queryKey[1]);
  const sdk = new TKMSDK();
  const response: ResponseType = await sdk.callRawAPI(
    `/api/users/customers?${filtersStr}`,
    "GET",
    undefined
  );
  return response;
}

export default function useCustomers(filters: Filters, pagination: Pagination) {
  const result = useQuery({
    queryKey: ["customers", filters, pagination],
    queryFn: fetchCustomers,
    throwOnError: true,
  });

  return {
    customers: result.data?.data ?? [],
  };
}
