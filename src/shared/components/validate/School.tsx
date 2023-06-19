import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useAuthContext } from "../../contexts";
import { iSchool } from "../../interfaces";

export const ValidateSchool = () => {
  const { watch } = useFormContext();
  const { setSchoolData } = useAuthContext();
  const school: iSchool = watch("school");

  useEffect(() => {
    setSchoolData(school);
  }, [school]);

  return <></>;
};
