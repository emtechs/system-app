import { School } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import { useAuthContext, useSchoolContext } from "../../../../shared/contexts";

interface iToolsRetrieveSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
}

export const ToolsServerSchool = ({
  search,
  setSearch,
}: iToolsRetrieveSchoolProps) => {
  const { schoolData } = useAuthContext();
  const { handleOpenCreate } = useSchoolContext();
  return (
    <Tools
      back={"/school/" + schoolData?.id}
      iconNew={<School />}
      titleNew="Nova"
      onClickNew={handleOpenCreate}
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
    />
  );
};
