import { Outlet } from "react-router-dom";
import { Login } from "../login";
import { First } from "../first";
import { Menu } from "../menu";
import { HomeNotAdmin } from "./components/Home";

export const ProtectedAuth = () => {
  return (
    <Login>
      <First>
        <HomeNotAdmin>
          <Menu>
            <Outlet />
          </Menu>
        </HomeNotAdmin>
      </First>
    </Login>
  );
};
