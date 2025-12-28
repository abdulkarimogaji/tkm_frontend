import { CheckCircleIcon, XCircleIcon } from "@/components/Icons";
import { CUSTOMER_STATUSES } from "@/utils/mappings";

export const STATUSES = {
  [CUSTOMER_STATUSES.INACTIVE]: (
    <div className="flex items-center gap-1 rounded-2xl bg-orange-50 px-1.5 py-0.5 text-xs font-medium text-orange-700">
      <XCircleIcon className="h-5 w-5 text-orange-600" />
      Inactive
    </div>
  ),
  [CUSTOMER_STATUSES.ACTIVE]: (
    <div className="flex items-center gap-1 rounded-2xl bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
      <CheckCircleIcon className="h-5 w-5 text-green-600" />
      Active
    </div>
  ),
};
