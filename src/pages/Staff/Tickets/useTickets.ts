import TKMSDK from "@/utils/TKMSDK";
import { createFilterString } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

interface Customer {
  id: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    photo: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export type Ticket = {
  id: string;
  status: string;
  date_submitted: string;
  priority: string;
  customer: Customer;
  category: Category;
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
    tickets: [
      {
        id: "cc27faf2-4add-4c1b-9759-383354318b75",
        customer_id: "b0b99547-a355-456f-8b62-1fd538b5c6f0",
        date_submitted: "2026-01-18T08:30:00.000Z",
        reporter_id: "bde27047-5705-43f7-a918-7f16e5369b0d",
        category_id: "4df886fa-0e48-4057-a3fe-664a276b0cfc",
        verified: false,
        verified_by: null,
        assigned_to: null,
        reported_user_id: null,
        reported_user_name: "",
        subject: "Ticket Subject",
        details: "Hello this is my ticket details",
        status: "new",
        priority: "unset",
        satisfaction: "unset",
        is_anonymous: false,
        is_deleted: false,
        created_at: "2026-01-18T13:13:47.951Z",
        updated_at: "2026-01-18T13:13:47.951Z",
        customer: {
          id: "2a67c4c2-67ea-41a6-a515-313380eeb89a",
          user: {
            first_name: "Abdulkarim",
            last_name: "Ogaji",
            email: "nodirbek@mailinator.com",
            photo: "",
          },
        },
        category: {
          id: "",
          name: "Teachers",
        },
        reporter_user: {
          first_name: "Andy",
          last_name: "Woodward",
          email: "magnus@mailinator.com",
          phone: null,
        },
        verified_by_staff: null,
        assigned_staff: null,
        reported_user: null,
      },
    ],
  };
  const response: ResponseType = await sdk.callRawAPI(
    `/v1/api/tickets?${filtersStr}`,
    "GET",
    undefined,
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
