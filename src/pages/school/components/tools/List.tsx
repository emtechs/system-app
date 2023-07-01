import { Tools } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";

interface iToolsListSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
  onClickReset: () => void;
}

export const ToolsListSchool = ({
  onClickReset,
  search,
  setSearch,
}: iToolsListSchoolProps) => {
  const { handleOpenCreate } = useSchoolContext();
  return (
    <Tools
      isHome
      onClickNew={handleOpenCreate}
      isSearch
      search={search}
      setSearch={setSearch}
      isDirector
      isActive
      titleNew="Nova"
      onClickReset={onClickReset}
    />
  );
};
