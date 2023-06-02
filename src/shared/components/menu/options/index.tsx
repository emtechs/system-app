import { useAuthContext } from "../../../contexts";
import { OptionsAdmin } from "./OptionsAdmin";
import { OptionsCommon } from "./OptionsCommon";
import { OptionsSchool } from "./OptionsSchool";

export const Options = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <OptionsAdmin />;

    case "SCHOOL":
      return <OptionsSchool />;

    case "COMMON":
      return <OptionsCommon />;

    default:
      return <></>;
  }
};
