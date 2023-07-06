import { Outlet } from "react-router-dom";
import { Login } from "../login";
import { First } from "../first";

export const ProtectedAuth = () => {
  return (
    <Login>
      <First>
        <Outlet />
      </First>
    </Login>
  );
};
