import { NavLink, useNavigate } from "react-router";
import {
  Bell02Icon,
  ChevronRightIcon,
  Dataflow04Icon,
  File03Icon,
  HomeLineIcon,
  LogOut01Icon,
  Mail01Icon,
  RefreshCCW04Icon,
  Settings02Icon,
  Ticket01Icon,
  User01Icon,
  Users01Icon,
} from "../Icons";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import LogoutModal from "./LogoutModal";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [open] = useState(true);
  const [logout, setLogout] = useState(false);

  const sections = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: HomeLineIcon,
    },
    {
      name: "Customers",
      link: "/customers",
      icon: Users01Icon,
    },
    {
      name: "Tickets",
      link: "/tickets",
      icon: Ticket01Icon,
    },
    {
      name: "Reports",
      link: "/reports",
      icon: File03Icon,
    },
    {
      name: "Integrations",
      link: "/integrations",
      icon: Dataflow04Icon,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: Settings02Icon,
    },
  ];

  return (
    <aside
      className={`flex h-screen flex-col border-r border-gray-200 bg-white p-4 shadow-2xl ${
        open ? "w-[300px] max-w-[300px] min-w-[300px]" : ""
      }`}
    >
      <div>
        <img
          src="/logos/Amdragz full v4@4x.png"
          alt=""
          className="h-10 w-full object-cover"
        />
      </div>
      <ul className="mt-4 flex grow flex-col gap-1">
        {sections.map((section) => (
          <li key={section.link}>
            <NavLink
              to={section.link}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "hover:bg-primary-50 hover:text-primary-700 text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <section.icon
                    className={`h-6 w-6 ${
                      isActive
                        ? "text-primary-600"
                        : "group-hover:text-primary-600 text-gray-500"
                    }`}
                    strokeWidth={2}
                  />
                  <span className="text-base font-medium">{section.name}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li className="grow"></li>
        <li>
          <NavLink
            to={"/notifications"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "hover:bg-primary-50 hover:text-primary-700 text-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Bell02Icon
                  className={`h-6 w-6 ${
                    isActive
                      ? "text-primary-600"
                      : "group-hover:text-primary-600 text-gray-500"
                  }`}
                  strokeWidth={2}
                />
                <span className="text-base font-medium">Notifications</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/messages"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-md px-3 py-2 ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "hover:bg-primary-50 hover:text-primary-700 text-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Mail01Icon
                  className={`h-6 w-6 ${
                    isActive
                      ? "text-primary-600"
                      : "group-hover:text-primary-600 text-gray-500"
                  }`}
                  strokeWidth={2}
                />
                <span className="text-base font-medium">Messages</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
      <Menu as={"div"} className={"relative"}>
        <MenuButton
          as="div"
          className="relative mt-3 flex cursor-pointer items-center gap-3 border-t border-gray-200 pt-3 pr-4 pl-2"
        >
          <img
            src="/default.png"
            alt=""
            className="rounded-circle h-10 w-10 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">Lana Steiner</p>
            <div className="mt-2 flex items-center gap-1">
              <p className="text-sm font-medium text-gray-600">Admin</p>
              <RefreshCCW04Icon className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <ChevronRightIcon className="absolute top-1/2 right-0 h-5 w-5 text-gray-500" />
        </MenuButton>
        <MenuItems className="absolute top-0 -right-full w-56 origin-top-right -translate-y-4 divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none">
          <div className="px-1 py-1">
            <MenuItem>
              {({ focus }) => (
                <button
                  className={`group flex w-full cursor-pointer items-center rounded-md px-3 py-3 text-sm ${
                    focus ? "bg-gray-100" : ""
                  }`}
                  onClick={() => navigate("/profile")}
                >
                  <User01Icon className="mr-2 h-5 w-5" />
                  My Profile
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  className={`group flex w-full cursor-pointer items-center rounded-md px-3 py-3 text-sm ${
                    focus ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setLogout(true)}
                >
                  <LogOut01Icon className="mr-2 h-5 w-5" />
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <LogoutModal isOpen={logout} closeModal={() => setLogout(false)} />
    </aside>
  );
}
