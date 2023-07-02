import { DialogActive } from "../../../../shared/components";
import {
  usePaginationContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { iSchool } from "../../../../shared/interfaces";

interface iDialogActiveSchoolProps {
  school: iSchool;
}

export const DialogActiveSchool = ({ school }: iDialogActiveSchoolProps) => {
  const {
    openActive,
    updateSchool,
    handleOpenActive,
    setServersData,
    setOpenActive,
  } = useSchoolContext();
  const { setActive } = usePaginationContext();
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
          if (!school.is_active) setServersData(undefined);
          setActive(true);
          setOpenActive(false);
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
