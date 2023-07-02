import { Tools } from "../../../../shared/components";

interface iToolsListSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
  onClickReset: () => void;
  onClickNew: () => void;
}

export const ToolsListSchool = ({
  onClickReset,
  search,
  setSearch,
  onClickNew,
}: iToolsListSchoolProps) => {
  return (
    <Tools
      isHome
      onClickNew={onClickNew}
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
