import { School } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import { useAuthContext } from "../../../../shared/contexts";

interface iToolsRetrieveSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
  onClickNew: () => void;
}

export const ToolsServerSchool = ({
  search,
  setSearch,
  onClickNew,
}: iToolsRetrieveSchoolProps) => {
  const { schoolData } = useAuthContext();
  return (
    <Tools
      back={"/school/" + schoolData?.id}
      iconNew={<School />}
      titleNew="Nova"
      onClickNew={onClickNew}
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
    />
  );
};
