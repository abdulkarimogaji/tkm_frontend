import { useSearchParams } from "react-router";

type Props = {
  paginationData: {
    currentPage: number;
    pageSize: number;
    totalNumber: number;
    totalPages: number;
  };
};

export default function PaginationHeader({ paginationData }: Props) {
  const { currentPage, pageSize, totalNumber } = paginationData;
  const [searchParams, setSearchParams] = useSearchParams();

  async function onPageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("limit", e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
  }
  return (
    <>
      <div
        className={`flex items-center justify-between bg-white px-6 py-4 font-medium text-gray-500 flex-col sm:flex-row`}
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
        <div>
          <span className="mr-2 text-sm">Results per page:</span>
          <select
            className="mt-2 border bg-white py-1 pl-1 text-sm focus:outline-primary"
            value={pageSize}
            onChange={onPageSizeChange}
          >
            {[5, 10, 20, 30, 40, 50, "ALL"].map((pageSize) => (
              <option key={pageSize} value={pageSize == "ALL" ? "" : pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
