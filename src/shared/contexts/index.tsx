import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ModalProfileProvider } from "./ModalProfileContext";
import { AppThemeProvider } from "./ThemeContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <ModalProfileProvider>
      <AuthProvider>{children}</AuthProvider>
    </ModalProfileProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useModalProfileContext } from "./ModalProfileContext";
export { useAppThemeContext } from "./ThemeContext";
