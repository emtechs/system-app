import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useClassContext } from "../../contexts";
import { iClass } from "../../interfaces";

export const ValidateClass = () => {
  const { watch } = useFormContext();
  const { setClassSelect } = useClassContext();
  const classData: iClass = watch("class");

  useEffect(() => {
    setClassSelect(classData);
  }, [classData]);

  return <></>;
};
