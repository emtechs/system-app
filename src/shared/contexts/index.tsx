import { iChildren } from "../interfaces";
import { AuthProvider } from "./AuthContext";
import { ClassProvider } from "./ClassContext";
import { DrawerProvider } from "./DrawerContext";
import { FrequencyProvider } from "./FrequencyContext";
import { ModalProvider } from "./ModalContext";
import { SchoolProvider } from "./SchoolContext";
import { TableProvider } from "./TableContext";
import { AppThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <ModalProvider>
      <DrawerProvider>
        <AuthProvider>
          <UserProvider>
            <SchoolProvider>
              <ClassProvider>
                <FrequencyProvider>
                  <TableProvider>{children}</TableProvider>
                </FrequencyProvider>
              </ClassProvider>
            </SchoolProvider>
          </UserProvider>
        </AuthProvider>
      </DrawerProvider>
    </ModalProvider>
  </AppThemeProvider>
);

export default Providers;
export { useAuthContext } from "./AuthContext";
export { useClassContext } from "./ClassContext";
export { useDrawerContext } from "./DrawerContext";
export { useFrequencyContext } from "./FrequencyContext";
export { useModalContext } from "./ModalContext";
export { useSchoolContext } from "./SchoolContext";
export { useTableContext } from "./TableContext";
export { useAppThemeContext } from "./ThemeContext";
export { useUserContext } from "./UserContext";
