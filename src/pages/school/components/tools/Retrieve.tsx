import { PersonAdd } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import { useAuthContext } from "../../../../shared/contexts";
import { iYear } from "../../../../shared/interfaces";

interface iToolsRetrieveSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
  year?: iYear;
  onClickNew: () => void;
}

export const ToolsRetrieveSchool = () => {
  return <Tools isSchool back="/school" />;
};

export const ToolsRetrieveSchoolServers = ({
  search,
  setSearch,
  onClickNew,
}: iToolsRetrieveSchoolProps) => {
  return (
    <Tools
      back="/school"
      isSchool
      iconNew={<PersonAdd />}
      onClickNew={onClickNew}
      titleNew="Servidor"
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
    />
  );
};

export const ToolsRetrieveSchoolClasses = ({
  search,
  setSearch,
  year,
  onClickNew,
}: iToolsRetrieveSchoolProps) => {
  const { yearData } = useAuthContext();

  return (
    <Tools
      back="/school"
      isSchool
      onClickNew={year === yearData ? onClickNew : undefined}
      titleNew="Turma"
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
    />
  );
};
