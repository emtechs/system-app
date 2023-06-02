import { useAuthContext } from "../../../shared/contexts";
import { CreateServerAdm } from "./CreateServerAdm";
import { CreateServerCommon } from "./CreateServerCommon";

export const CreateServerPage = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <CreateServerAdm />;

    case "SCHOOL":
      return <CreateServerCommon />;

    default:
      return <></>;
  }
};
