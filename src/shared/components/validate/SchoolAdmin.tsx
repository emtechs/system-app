import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { iSchoolClass } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const ValidateSchoolAdmin = () => {
  const navigate = useNavigate();
  const { watch } = useFormContext();
  const school: iSchoolClass = watch("school");

  useEffect(() => {
    if (school) navigate("/home/school/" + school.id);
  }, [school]);

  return <></>;
};
