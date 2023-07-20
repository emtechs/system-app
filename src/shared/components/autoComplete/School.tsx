import { useState, useEffect } from "react";
import { AutocompleteElement } from "react-hook-form-mui";
import { iSchool } from "../../interfaces";
import { apiSchool } from "../../services";

export const AutoCompleteSchool = () => {
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();
  useEffect(() => {
    apiSchool
      .list("?is_active=true")
      .then((res) => setSchoolDataSelect(res.schools));
  }, []);
  return (
    <AutocompleteElement
      name="school"
      label="Escola"
      loading={!schoolDataSelect}
      options={
        schoolDataSelect && schoolDataSelect.length > 0
          ? schoolDataSelect
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
