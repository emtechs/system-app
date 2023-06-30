import { useSearchParams } from "react-router-dom";
import { useSchoolContext } from "../../shared/contexts";
import { useEffect } from "react";
import { RetrieveSchoolPage } from "./Retrieve";
import { ListSchoolPage } from "./List";

export const SchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { schoolRetrieve, schoolClassRetrieve } = useSchoolContext();

  useEffect(() => {
    if (id) {
      schoolRetrieve(id);
      schoolClassRetrieve(id);
    }
  }, [id]);

  if (id) return <RetrieveSchoolPage id={id} />;

  return <ListSchoolPage />;
};
