import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { useEffect } from "react";
import { apiSchool } from "../../services";
import { iSchool } from "../../interfaces";

const ValidateSchool = () => {
  const { watch } = useFormContext();
  const { setSchoolSelect } = useSchoolContext();
  const school: iSchool = watch("school");

  useEffect(() => {
    setSchoolSelect(school);
  }, [school]);

  return <></>;
};

export const SelectSchool = () => {
  const { setLoading } = useAppThemeContext();
  const { schoolDataSelect, setSchoolDataSelect } = useSchoolContext();

  useEffect(() => {
    setLoading(true);
    apiSchool
      .list("?is_active=true")
      .then((res) => {
        if (res) {
          setSchoolDataSelect(
            res.result.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
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
                    label: "No momento, não há nenhuma escola cadastrada",
                  },
                ]
          }
        />
      </div>
      <ValidateSchool />
    </>
  );
};
