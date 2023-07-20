import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AutocompleteElement } from "react-hook-form-mui";
import { iSchool, iClass } from "../../interfaces";
import { apiClass } from "../../services";

interface iAutoCompleteClassProps {
  year_id: string;
  school_id?: string;
}

export const AutoCompleteClass = ({
  year_id,
  school_id,
}: iAutoCompleteClassProps) => {
  const { watch } = useFormContext();
  const school: iSchool = watch("school");
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>();

  useEffect(() => {
    let query = "";
    if (school_id) {
      query = `?year_id=${year_id}&school_id=${school_id}&is_active=true`;
    } else if (school)
      query = `?year_id=${year_id}&school_id=${school.id}&is_active=true`;

    apiClass.list(query).then((res) => setClassDataSelect(res.classes));
  }, [school, school_id, year_id]);

  return (
    <AutocompleteElement
      name="class"
      label="Turma"
      loading={!classDataSelect}
      options={
        classDataSelect && classDataSelect.length > 0
          ? classDataSelect
          : [
              {
                id: 1,
                label: "No momento, não há nenhuma turma cadastrada",
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  );
};
