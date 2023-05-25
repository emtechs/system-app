import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import {
  useAppThemeContext,
  useClassContext,
  useSchoolContext,
} from "../../contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../services";
import { iClassWithSchool, iSchool } from "../../interfaces";

const ValidateSchoolClass = () => {
  const { watch } = useFormContext();
  const { setSchoolSelect } = useSchoolContext();
  const { setClassWithSchoolSelect } = useClassContext();
  const school: iSchool = watch("school");
  const classData: iClassWithSchool = watch("class");

  useEffect(() => {
    setSchoolSelect(school);
  }, [school]);

  useEffect(() => {
    setClassWithSchoolSelect(classData);
  }, [classData]);

  return <></>;
};

interface iSelect extends iClassWithSchool {
  id: string;
  label: string;
}

export const SelectSchoolClass = () => {
  const { setLoading } = useAppThemeContext();
  const { schoolSelect, schoolDataSelect, setSchoolDataSelect } =
    useSchoolContext();
  const [data, setData] = useState<iSelect[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool[]>("schools?is_active=true")
      .then((res) => {
        if (res.data) {
          setSchoolDataSelect(
            res.data.map((school) => {
              return { ...school, label: school.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClassWithSchool[]>(`classes/${schoolSelect?.id}?is_active=true`)
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
      <ValidateSchoolClass />
    </>
  );
};
