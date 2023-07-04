import { useDialogContext, useSchoolContext } from "../../contexts";
import { iDialogSchoolProps } from "../../interfaces";
import { DialogActive } from "./structure";

export const DialogActiveSchool = ({ school }: iDialogSchoolProps) => {
  const { handleOpenActive, openActive } = useDialogContext();
  const { updateSchool, onClickReset } = useSchoolContext();
  return (
    school && (
      <DialogActive
        action={() => {
          updateSchool(
            {
              is_active: !school.is_active,
            },
            school.id,
            "estado",
            undefined,
            school.is_active ? "/school" : "/school/" + school.id
          );
          onClickReset();
          handleOpenActive();
        }}
        description={`a escola ${school.name.toUpperCase()}`}
        is_active={school.is_active}
        onClose={handleOpenActive}
        open={openActive}
        title="Escola"
      />
    )
  );
};
