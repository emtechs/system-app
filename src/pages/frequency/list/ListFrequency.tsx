import { useAuthContext } from "../../../shared/contexts";
import { ListFrequencyCommon } from "./ListFrequencyCommon";
import { ListFrequencyAdm } from "./ListFrequencyAdm";
import { ListFrequencySchool } from "./ListFrequencySchool";

export const ListFrequencyPage = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <ListFrequencyAdm />;

    case "SCHOOL":
      return <ListFrequencyCommon />;

    case "COMMON":
      return <ListFrequencySchool />;

    default:
      return <></>;
  }
};
