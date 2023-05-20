import { useFormContext } from "react-hook-form-mui";
import { iSchool } from "../../interfaces";
import { useSchoolContext } from "../../contexts";
import { useEffect } from "react";
import { ValidateCPF } from "./cpf";

interface iValidateSchoolProps {
  isCPF?: boolean;
}

export const ValidateSchool = ({ isCPF }: iValidateSchoolProps) => {
  const { watch } = useFormContext();
  const { schoolSelect, setschoolSelect } = useSchoolContext();
  const school: iSchool = watch("school");

  useEffect(() => {
    setschoolSelect(school);
  }, [school]);

  return isCPF ? <ValidateCPF school_id={schoolSelect?.id} /> : <></>;
};
