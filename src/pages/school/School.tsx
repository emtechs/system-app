import { useSearchParams } from "react-router-dom";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect } from "react";
import { RetrieveSchoolPage } from "./Retrieve";
import { ListSchoolPage } from "./List";

export const SchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolDataRetrieve } = useSchoolContext();

  useEffect(() => {
    if (id) schoolDataRetrieve(id);
  }, [id]);

  if (id) return <RetrieveSchoolPage id={id} />;

  return <ListSchoolPage />;
};
