import { useSearchParams } from "react-router-dom";
import { useAppThemeContext } from "../../shared/contexts";
import {
  CardSchoolId,
  SelectSchoolSelectData,
  Tools,
} from "../../shared/components";
import { iChildren } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { ReactNode } from "react";

interface iLayoutSchoolPageProps extends iChildren {
  title: string;
  isSchool?: boolean;
  tools?: ReactNode;
}

export const LayoutSchoolPage = ({
  children,
  title,
  isSchool,
  tools,
}: iLayoutSchoolPageProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const back = searchParams.get("back");
  const { smDown } = useAppThemeContext();
  return (
    <LayoutBasePage
      title={title}
      school={
        isSchool ? (
          id ? (
            <CardSchoolId school_id={id} />
          ) : (
            <SelectSchoolSelectData />
          )
        ) : undefined
      }
      tools={
        tools ? (
          tools
        ) : back ? (
          <Tools isHome back={back} />
        ) : id ? (
          <Tools isHome back={`/school/${id}`} />
        ) : (
          smDown && <Tools isSingle />
        )
      }
    >
      {children}
    </LayoutBasePage>
  );
};
