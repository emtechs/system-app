import { useAuthContext } from "../../../shared/contexts";
import { ListFrequencyCommon } from "./ListFrequency";
import { ListFrequencyAdm } from "./ListFrequencyAdm";

export const ListFrequency = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <ListFrequencyAdm />;

    case "SCHOOL":
      return <ListFrequencyCommon />;

    case "COMMON":
      return <ListFrequencyCommon />;

    default:
      return <></>;
  }
};
