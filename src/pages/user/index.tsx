import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../../shared/contexts";
import { useEffect } from "react";
import { RetrieveUserPage } from "./Retrieve";
import { ListUserPage } from "./List";

export const UserPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { userRetrieve } = useUserContext();

  useEffect(() => {
    if (id) userRetrieve(id);
  }, [id]);

  if (id) return <RetrieveUserPage id={id} />;

  return <ListUserPage />;
};
