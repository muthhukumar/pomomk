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

function LinkWrapper({
  isActive,
  children,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <div
      className={clsx("p-3 m-2 border rounded-md", {
        "border-smoke bg-matt-black": isActive,
        "border-black rounded-md": !isActive,
      })}
    >
      {children}
    </div>
  );
}

export default function Sidebar() {
  const pathname = useLocation().pathname;

  return (
    <header className="h-screen bg-black">
      <nav className="flex flex-col justify-between items-center mt-16">
        <div className="flex flex-col">
          {links.map(({ id, href, size, Icon }) => (
            <Link to={href} key={id}>
              <LinkWrapper isActive={pathname === href}>
                <Icon size={size} />
              </LinkWrapper>
            </Link>
          ))}

          <LinkWrapper isActive={pathname === "/settings"}>
            <Link to="/settings">
              <IoSettingsOutline size={20} />
            </Link>
          </LinkWrapper>
        </div>
      </nav>
    </header>
  );
}
