import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppThemeContext, useSchoolContext } from "../../shared/contexts";
import { Tools } from "../../shared/components";
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
      isSchool={isSchool}
      tools={
        tools ? (
          tools
        ) : back ? (
          <Tools isHome back={back} />
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
