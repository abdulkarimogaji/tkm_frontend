import { NavLink, Outlet } from "react-router";

export default function StaffTicketsPage() {
  return (
    <section className={"flex h-full flex-col bg-primary-25 p-6"}>
      <div
        className={`h-full flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white`}
      >
        <header className="flex items-center justify-between border-b border-gray-200">
          <h2 className="rounded-t-lg px-5 py-3 text-lg font-semibold text-gray-900">
            Tickets
          </h2>
        </header>

        <div className="flex px-5 pb-2 pt-[22px]">
          <NavLink
            to={"/tickets/new"}
            className={({ isActive }) =>
              `relative flex flex-col items-center px-4 pt-1.5 ${isActive ? "text-gray-900 font-bold after:w-8 after:h-0.5 after:absolute after:top-full after:mt-1 after:inline-block after:rounded after:bg-primary-600" : "text-gray-600"}`
            }
          >
            New (0)
          </NavLink>
          <NavLink
            to={"/tickets/open"}
            className={({ isActive }) =>
              `relative flex flex-col items-center px-4 pt-1.5 ${isActive ? "text-gray-900 font-bold after:w-8 after:h-0.5 after:absolute after:top-full after:mt-1 after:inline-block after:rounded after:bg-primary-600" : "text-gray-600"}`
            }
          >
            Opened (0)
          </NavLink>
          <NavLink
            to={"/tickets/resolved"}
            className={({ isActive }) =>
              `relative flex flex-col items-center px-4 pt-1.5 ${isActive ? "text-gray-900 font-bold after:w-8 after:h-0.5 after:absolute after:top-full after:mt-1 after:inline-block after:rounded after:bg-primary-600" : "text-gray-600"}`
            }
          >
            Resolved (0)
          </NavLink>
        </div>

        <Outlet />
      </div>
    </section>
  );
}
