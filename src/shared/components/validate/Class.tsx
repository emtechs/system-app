import { useFormContext } from "react-hook-form-mui";
import { iClass } from "../../interfaces";
import { useSchoolContext } from "../../contexts";
import { useEffect } from "react";

export const ValidateClass = () => {
  const { watch } = useFormContext();
  const { setClassSelect } = useSchoolContext();
  const classData: iClass = watch("class");

  useEffect(() => {
    setClassSelect(classData);
  }, [classData]);

  return <></>;
};
