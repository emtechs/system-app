import { AutocompleteElement } from "react-hook-form-mui";
import { ValidateSchool } from "../validate";
import { useSchoolContext } from "../../contexts";

interface iSelectSchoolProps {
  isCPF?: boolean;
}

export const SelectSchool = ({ isCPF }: iSelectSchoolProps) => {
  const { schoolDataSelect } = useSchoolContext();

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
      {isCPF ? <></> : <ValidateSchool />}
    </>
  );
};
