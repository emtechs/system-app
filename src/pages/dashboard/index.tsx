import { useAuthContext } from "../../shared/contexts";
import { DashboardAdmin } from "./Admin";
import { DashboardCommon } from "./Common";
import { DashboardSchool } from "./School";

export const DashboardPage = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <DashboardAdmin />;

    case "SCHOOL":
      return <DashboardSchool />;

    case "COMMON":
      return <DashboardCommon />;

    default:
      return <></>;
  }
};
