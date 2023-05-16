import { Admin } from "./Admin";
import { School } from "./School";
import { useAuthContext } from "../../shared/contexts";
import { Common } from "./Common";

export const Dashboard = () => {
  const { dashData } = useAuthContext();
  switch (dashData) {
    case "ADMIN":
      return <Admin />;

    case "SCHOOL":
      return <School />;

    default:
      return <Common />;
  }
};
