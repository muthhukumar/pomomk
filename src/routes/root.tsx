import { Outlet } from "react-router-dom";
import * as React from "react";

import { Sidebar } from "../components";
import { useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/pomo");
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
