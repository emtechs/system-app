import { Tools } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";

export const ToolsSchool = () => {
  const { handleOpenCreate, onClickReset, search, setSearch } =
    useSchoolContext();

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
