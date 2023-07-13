import { useCallback } from "react";
import {
  useCalendarContext,
  useClassContext,
  useSchoolContext,
  useUserContext,
} from "../contexts";

export const useVerify = () => {
  const { verifyUser } = useUserContext();
  const { verifySchool } = useSchoolContext();
  const { verifyClass, verifyClassYear } = useClassContext();
  const { verifyYear } = useCalendarContext();

  const verify = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      user_id?: string
    ) => {
      if (year_id) verifyYear(year_id);
      if (school_id) verifySchool(school_id);
      if (class_id) verifyClass(class_id);
      if (year_id && school_id && class_id)
        verifyClassYear(class_id, school_id, year_id);
      if (user_id) verifyUser(user_id);
    },
    []
  );

  return { verify };
};
