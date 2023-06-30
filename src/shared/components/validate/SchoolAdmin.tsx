import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useAuthContext } from "../../contexts";
import { iSchoolClass } from "../../interfaces";

export const ValidateSchoolAdmin = () => {
  const { watch } = useFormContext();
  const { setSchoolDataAdmin } = useAuthContext();
  const school: iSchoolClass = watch("school");

  useEffect(() => {
    setSchoolDataAdmin(school);
  }, [school]);

  return <></>;
};
