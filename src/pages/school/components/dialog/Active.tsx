import { DialogActive } from "../../../../shared/components";
import {
  usePaginationContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { iDialogSchoolProps } from "../../interface";

export const DialogActiveSchool = ({
  onClose,
  open,
  school,
}: iDialogSchoolProps) => {
  const { updateSchool, setServersData } = useSchoolContext();
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
          onClose();
        }}
        description={`a escola ${school.name.toUpperCase()}`}
        is_active={school.is_active}
        onClose={onClose}
        open={open}
        title="Escola"
      />
    )
  );
};
