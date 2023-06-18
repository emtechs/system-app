import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useSchoolContext } from "../../contexts";
import { iSchool } from "../../interfaces";

export const ValidateSchool = () => {
  const { watch } = useFormContext();
  const { setSchoolSelect } = useSchoolContext();
  const school: iSchool = watch("school");

  useEffect(() => {
    setSchoolSelect(school);
  }, [school]);

  return <></>;
};
