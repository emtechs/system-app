import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import Providers from "./shared/contexts";
import "react-toastify/dist/ReactToastify.css";
import { First, Login, Menu } from "./shared/components";

const App = () => {
  return (
    <Providers>
      <Login>
        <First>
          <Menu>
            <AppRoutes />
          </Menu>
        </First>
      </Login>
      <ToastContainer />
    </Providers>
  );
};

export default App;
