import { useSearchParams } from "react-router";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "../Icons";

type Props = {
  paginationData: {
    currentPage: number;
    pageSize: number;
    totalNumber: number;
    totalPages: number;
  };
};

export default function PaginationFooter({ paginationData }: Props) {
  const { currentPage, pageSize, totalNumber, totalPages } = paginationData;
  const [searchParams, setSearchParams] = useSearchParams();

  async function onPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("page", e.target.value);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <>
      <div
        className={`flex items-center justify-between bg-white px-6 py-4 font-medium text-gray-500 flex-col space-y-4 sm:flex-row sm:space-y-0`}
      >
        <div className="">
          <p className="text-sm">
            Showing{" "}
            <span>
              {totalNumber < 1
                ? 0
                : currentPage > 1
                  ? (currentPage - 1) * pageSize + 1
                  : currentPage}
              -
              {currentPage * pageSize < totalNumber
                ? currentPage * pageSize
                : totalNumber}{" "}
              of {totalNumber}
            </span>{" "}
          </p>
        </div>
        {/*  */}
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <button
            className="flex items-center gap-2 disabled:opacity-50"
            disabled={currentPage == 1}
            onClick={() => {
              searchParams.set("page", (currentPage - 1).toString());
              setSearchParams(searchParams, { replace: true });
            }}
          >
            <ArrowNarrowLeftIcon className="h-4 w-6" strokeWidth={2} />
            Prev
          </button>
          <select
            className="border bg-white px-4 py-0.5 text-sm focus:outline-primary"
            value={currentPage}
            onChange={onPageChange}
          >
            {Array(totalPages)
              .fill("")
              .map((_, pageSize) => (
                <option key={pageSize + 1} value={pageSize + 1}>
                  {pageSize + 1}
                </option>
              ))}
          </select>
          <button
            className="flex items-center gap-2 disabled:opacity-50"
            disabled={currentPage >= totalPages}
            onClick={() => {
              searchParams.set("page", (currentPage + 1).toString());
              setSearchParams(searchParams, { replace: true });
            }}
          >
            Next
            <ArrowNarrowRightIcon className="h-4 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
