import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ClassProvider } from "./ClassContext";
import { ModalProvider } from "./ModalContext";
import { SchoolProvider } from "./SchoolContext";
import { AppThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <ModalProvider>
      <AuthProvider>
        <UserProvider>
          <SchoolProvider>
            <ClassProvider>{children}</ClassProvider>
          </SchoolProvider>
        </UserProvider>
      </AuthProvider>
    </ModalProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useClassContext } from "./ClassContext";
export { useModalContext } from "./ModalContext";
export { useSchoolContext } from "./SchoolContext";
export { useAppThemeContext } from "./ThemeContext";
export { useUserContext } from "./UserContext";
