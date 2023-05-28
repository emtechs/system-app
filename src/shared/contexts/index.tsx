import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ClassProvider } from "./ClassContext";
import { DrawerProvider } from "./DrawerContext";
import { ModalProvider } from "./ModalContext";
import { SchoolProvider } from "./SchoolContext";
import { AppThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <DrawerProvider>
      <ModalProvider>
        <AuthProvider>
          <UserProvider>
            <SchoolProvider>
              <ClassProvider>{children}</ClassProvider>
            </SchoolProvider>
          </UserProvider>
        </AuthProvider>
      </ModalProvider>
    </DrawerProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useClassContext } from "./ClassContext";
export { useDrawerContext } from "./DrawerContext";
export { useModalContext } from "./ModalContext";
export { useSchoolContext } from "./SchoolContext";
export { useAppThemeContext } from "./ThemeContext";
export { useUserContext } from "./UserContext";
