import { iChildren } from "../../interfaces";
import { BasePageDefault } from "./Default";
import { BasePageProfile } from "./Profile";

interface iBasePageProps extends iChildren {
  isProfile?: boolean;
  padding?: number;
}

export const BasePage = ({
  isProfile,
  padding,

  children,
}: iBasePageProps) => {
  if (isProfile) {
    return <BasePageProfile>{children}</BasePageProfile>;
  }
  return <BasePageDefault padding={padding}>{children}</BasePageDefault>;
};
