import { Outlet } from "react-router-dom";
import { Login } from "../login";
import { First } from "../first";
import { Menu } from "../menu";

export const ProtectedAuth = () => {
  return (
    <Login>
      <First>
        <Menu>
          <Outlet />
        </Menu>
      </First>
    </Login>
  );
};
