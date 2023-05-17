import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { SchoolProvider } from "./SchoolContext";
import { AppThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <ModalProvider>
      <AuthProvider>
        <UserProvider>
          <SchoolProvider>{children}</SchoolProvider>
        </UserProvider>
      </AuthProvider>
    </ModalProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useModalContext } from "./ModalContext";
export { useSchoolContext } from "./SchoolContext";
export { useAppThemeContext } from "./ThemeContext";
export { useUserContext } from "./UserContext";
