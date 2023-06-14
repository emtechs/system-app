import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import Providers, { useAppThemeContext } from "./shared/contexts";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { smDown } = useAppThemeContext();
  return (
    <Providers>
      <AppRoutes />
      <ToastContainer
        position={smDown ? "bottom-right" : undefined}
        autoClose={3000}
        limit={smDown ? 1 : undefined}
        pauseOnHover={false}
      />
    </Providers>
  );
};

export default App;
