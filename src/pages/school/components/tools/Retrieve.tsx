import { PersonAdd } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";

export const ToolsRetrieveSchool = () => {
  const { isHome } = useSchoolContext();
  return <Tools back="/school" isSchool={isHome} />;
};

interface iToolsRetrieveSchoolServersProps {
  search?: string;
  setSearch: (text: string) => void;
}

export const ToolsRetrieveSchoolServers = ({
  search,
  setSearch,
}: iToolsRetrieveSchoolServersProps) => {
  const { handleOpenCreate, isHome } = useSchoolContext();
  return (
    <Tools
      back="/school"
      iconNew={<PersonAdd />}
      onClickNew={handleOpenCreate}
      titleNew="Servidor"
      isSchool={isHome}
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
    />
  );
};
