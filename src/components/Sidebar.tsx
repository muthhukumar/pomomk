import { BsClockHistory } from "react-icons/bs";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";

import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  {
    id: 1,
    Icon: BsClockHistory,
    size: 20,
    href: "/pomo",
  },
  {
    id: 2,
    Icon: IoAnalyticsOutline,
    size: 20,
    href: "/analytics",
  },
  {
    id: 3,
    Icon: CiViewTimeline,
    size: 20,
    href: "/sessions",
  },
];

export default function Sidebar() {
  const pathname = useLocation().pathname;

  return (
    <header className="h-screen bg-gray-800">
      <nav className="flex flex-col justify-between items-center mt-16">
        <div className="flex flex-col">
          {links.map(({ id, href, size, Icon }) => (
            <div
              key={id}
              className={clsx("p-4", {
                "bg-gray-700": pathname === href,
              })}
            >
              <Link to={href}>
                <Icon size={size} />
              </Link>
            </div>
          ))}

          <div
            className={clsx("p-4", {
              "bg-gray-700": pathname === "/settings",
            })}
          >
            <Link to="/settings">
              <IoSettingsOutline size={20} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
