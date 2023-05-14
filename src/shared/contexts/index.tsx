import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { ModalProfileProvider } from "./ModalProfileContext";
import { AppThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <ModalProfileProvider>
      <ModalProvider>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ModalProvider>
    </ModalProfileProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useModalContext } from "./ModalContext";
export { useModalProfileContext } from "./ModalProfileContext";
export { useAppThemeContext } from "./ThemeContext";
export { useUserContext } from "./UserContext";
