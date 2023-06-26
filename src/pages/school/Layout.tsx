import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useSchoolContext,
} from "../../shared/contexts";
import { LinkRouter, Tools } from "../../shared/components";
import { iChildren, iSchool } from "../../shared/interfaces";
import { LayoutBasePage } from "../../shared/layouts";
import { apiUsingNow } from "../../shared/services";
import { Breadcrumbs, Chip } from "@mui/material";
import { School } from "@mui/icons-material";

interface iLayoutSchoolPageProps extends iChildren {
  title: ReactNode;
  isSchool?: boolean;
  tools?: ReactNode;
}

export const LayoutSchoolPage = ({
  children,
  title,
  tools,
}: iLayoutSchoolPageProps) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const back = searchParams.get("back");
  const { smDown, setLoading } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { handleClickButtonTools } = useDrawerContext();
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
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter
            underline="none"
            color="inherit"
            to="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={schoolData?.name}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </LinkRouter>
          {title}
        </Breadcrumbs>
      }
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
