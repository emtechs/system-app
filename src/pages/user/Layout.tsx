import { ReactNode, useEffect } from "react";
import { useAppThemeContext, useUserContext } from "../../shared/contexts";
import { Tools } from "../../shared/components";
import { iChildren, iUser } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { apiUsingNow } from "../../shared/services";

interface iLayoutSchoolPageProps extends iChildren {
  title: string;
  back?: string;
  tools?: ReactNode;
}

export const LayoutUserPage = ({
  children,
  title,
  back,
  tools,
}: iLayoutSchoolPageProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const backData = searchParams.get("back");
  const { smDown, setLoading } = useAppThemeContext();
  const { setUpdateUserData } = useUserContext();

  useEffect(() => {
    if (id) {
      setLoading(true);
      apiUsingNow
        .get<iUser>(`users/${id}`)
        .then((res) => setUpdateUserData(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (backData) {
    back = backData;
  }

  return (
    <LayoutBasePage
      title={title}
      tools={
        tools ? (
          tools
        ) : back ? (
          <Tools isHome back={back} />
        ) : (
          smDown && <Tools isSingle />
        )
      }
    >
      {children}
    </LayoutBasePage>
  );
};
