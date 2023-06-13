import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import Providers from "./shared/contexts";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Providers>
      <AppRoutes />
      <ToastContainer autoClose={3000} limit={2} pauseOnHover={false} />
    </Providers>
  );
};

export default App;
