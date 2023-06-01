import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import Providers from "./shared/contexts";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Providers>
      <AppRoutes />
      <ToastContainer />
    </Providers>
  );
};

export default App;
