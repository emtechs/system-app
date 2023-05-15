import { Admin } from "./Admin";
import { School } from "./School";
import { useUserContext } from "../../shared/contexts";
import { Common } from "./Common";

export const Dashboard = () => {
  const { dashData } = useUserContext();
  switch (dashData) {
    case "ADMIN":
      return <Admin />;

    case "SCHOOL":
      return <School />;

    default:
      return <Common />;
  }
};
