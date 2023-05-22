import { AutocompleteElement } from "react-hook-form-mui";
import { useSchoolContext } from "../../contexts";
import { ValidateClass } from "../validate";

export const SelectClass = () => {
  const { classDataSelect } = useSchoolContext();

  return (
    <>
      <div style={{ width: "100%" }}>
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
        />
      </div>
      <ValidateClass />
    </>
  );
};
