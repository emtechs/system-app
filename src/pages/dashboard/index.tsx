import { DashboardAdmin } from "./Admin";
import { DashboardSchool } from "./School";
import { useAuthContext } from "../../shared/contexts";
import { DashboardCommon } from "./Common";

export const Dashboard = () => {
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
