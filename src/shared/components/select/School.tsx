import { AutocompleteElement } from "react-hook-form-mui";
import { ValidateSchool } from "../validate";
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { useEffect } from "react";
import { apiUsingNow } from "../../services";
import { iSchool } from "../../interfaces";

export const SelectSchool = () => {
  const { setLoading } = useAppThemeContext();
  const { schoolDataSelect, setListSchoolData, setSchoolDataSelect } =
    useSchoolContext();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=true")
      .then((res) => {
        if (res.data) {
          setListSchoolData(res.data);
          setSchoolDataSelect(
            res.data.map((school) => {
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
