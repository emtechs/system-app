import { iChildren } from '../interfaces'
import { AuthProvider } from './AuthContext'
import { CalendarProvider } from './CalendarContext'
import { ClassProvider } from './ClassContext'
import { DrawerProvider } from './DrawerContext'
import { DialogProvider } from './DialogContext'
import { FrequencyProvider } from './FrequencyContext'
import { SchoolProvider } from './SchoolContext'
import { StudentProvider } from './StundetContext'
import { PaginationProvider } from './PaginationContext'
import { AppThemeProvider } from './ThemeContext'
import { UserProvider } from './UserContext'

const Providers = ({ children }: iChildren) => (
  <AppThemeProvider>
    <DialogProvider>
      <AuthProvider>
        <PaginationProvider>
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
        </PaginationProvider>
      </AuthProvider>
    </DialogProvider>
  </AppThemeProvider>
)

export default Providers
export { useAuthContext } from './AuthContext'
export { useCalendarContext } from './CalendarContext'
export { useClassContext } from './ClassContext'
export { useDrawerContext } from './DrawerContext'
export { useDialogContext } from './DialogContext'
export { useFrequencyContext } from './FrequencyContext'
export { useSchoolContext } from './SchoolContext'
export { useStudentContext } from './StundetContext'
export { usePaginationContext } from './PaginationContext'
export { useAppThemeContext } from './ThemeContext'
export { useUserContext } from './UserContext'
