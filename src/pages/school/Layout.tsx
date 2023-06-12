import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useAppThemeContext,
  useDrawerContext,
  useSchoolContext,
} from "../../shared/contexts";
import {
  CardSchoolId,
  SelectSchoolSelectData,
  Tools,
} from "../../shared/components";
import { iChildren, iSchool } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { apiUsingNow } from "../../shared/services";

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
  const { smDown, setLoading } = useAppThemeContext();
  const { setSchoolSelect } = useSchoolContext();
  const { handleClickUser } = useDrawerContext();
  let onClickBack;

  if (back?.includes("user")) {
    onClickBack = handleClickUser;
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      apiUsingNow
        .get<iSchool>(`schools/${id}`)
        .then((res) => setSchoolSelect(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <LayoutBasePage
      title={title}
      school={
        isSchool ? (
          id ? (
            <CardSchoolId />
          ) : (
            <SelectSchoolSelectData />
          )
        ) : undefined
      }
      tools={
        tools ? (
          tools
        ) : back ? (
          <Tools isHome back={back} onClickBack={onClickBack} />
        ) : id ? (
          <Tools isHome back={`/school?id=${id}&order=name`} />
        ) : (
          smDown && <Tools isSingle />
        )
      }
    >
      {children}
    </LayoutBasePage>
  );
};
