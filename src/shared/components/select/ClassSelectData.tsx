import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
  useSchoolContext,
} from "../../contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../services";
import { iClassWithSchool } from "../../interfaces";

const ValidateClass = () => {
  const { watch } = useFormContext();
  const { setClassWithSchoolSelect } = useClassContext();
  const classData: iClassWithSchool = watch("class");

  useEffect(() => {
    setClassWithSchoolSelect(classData);
  }, [classData]);

  return <></>;
};

interface iSelect extends iClassWithSchool {
  id: string;
  label: string;
}

export const SelectClassSelectData = () => {
  const { setLoading } = useAppThemeContext();
  const { schoolYear } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const [data, setData] = useState<iSelect[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClassWithSchool[]>(
        `classes/${schoolSelect?.id}?is_active=true&school_year_id=${schoolYear}`
      )
      .then((res) => {
        if (res.data) {
          setData(
            res.data.map((el) => {
              return { ...el, id: el.class.id, label: el.class.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [schoolSelect]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <AutocompleteElement
          name="class"
          label="Turma"
          loading={!data}
          options={
            data && data.length > 0
              ? data
              : [
                  {
                    id: 1,
                    label: "No momento, não há nenhuma turma cadastrada",
                  },
                ]
          }
        />
      </div>
      <ValidateClass />
    </>
  );
};
