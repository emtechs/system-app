import { iChildren } from '../interfaces'
import { AuthProvider } from './AuthContext'
import { CalendarProvider } from './CalendarContext'
import { ClassProvider } from './ClassContext'
import { DialogProvider } from './DialogContext'
import { DrawerProvider } from './DrawerContext'
import { FrequencyProvider } from './FrequencyContext'
import { PaginationProvider } from './PaginationContext'
import { ParamsProvider } from './ParamsContext'
import { SchoolProvider } from './SchoolContext'
import { StudentProvider } from './StundetContext'
import { AppThemeProvider } from './ThemeContext'
import { UserProvider } from './UserContext'

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <DialogProvider>
      <AuthProvider>
        <PaginationProvider>
          <ParamsProvider>
            <UserProvider>
              <SchoolProvider>
                <ClassProvider>
                  <FrequencyProvider>
                    <StudentProvider>
                      <CalendarProvider>
                        <DrawerProvider>{children}</DrawerProvider>
                      </CalendarProvider>
                    </StudentProvider>
                  </FrequencyProvider>
                </ClassProvider>
              </SchoolProvider>
            </UserProvider>
          </ParamsProvider>
        </PaginationProvider>
      </AuthProvider>
    </DialogProvider>
  </AppThemeProvider>
)

export default Providers
export { useAuthContext } from './AuthContext'
export { useCalendarContext } from './CalendarContext'
export { useClassContext } from './ClassContext'
export { useDialogContext } from './DialogContext'
export { useDrawerContext } from './DrawerContext'
export { useFrequencyContext } from './FrequencyContext'
export { usePaginationContext } from './PaginationContext'
export { useParamsContext } from './ParamsContext'
export { useSchoolContext } from './SchoolContext'
export { useStudentContext } from './StundetContext'
export { useAppThemeContext } from './ThemeContext'
export { useUserContext } from './UserContext'
