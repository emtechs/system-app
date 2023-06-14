import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { SelectSchoolSelectData } from "../select";
import { CardSchoolId } from "./CardSchoolId";
import { CardSchool } from "./CardSchool";

export const SchoolCardDash = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { dashData } = useAuthContext();
  if (dashData === "ADMIN") {
    if (id) return <CardSchoolId />;
    return <SelectSchoolSelectData />;
  }
  return <CardSchool />;
};
