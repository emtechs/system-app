import {
  Box,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iSchoolClass } from "../../../shared/interfaces";
import { apiUser } from "../../../shared/services";
import { PaginationMobile } from "../../../shared/components";
import { School as SchoolIcon } from "@mui/icons-material";
import { DialogSchool } from "./DialogSchool";
import { CardSchool } from "./CardSchool";

interface iSchoolProps {
  isHome?: boolean;
}

export const School = ({ isHome }: iSchoolProps) => {
  const { debounce } = useDebounce();
  const { smDown, mdDown, theme } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { define_step, query } = usePaginationContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [schoolsData, setSchoolsData] = useState<iSchoolClass[]>();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(!open);

  const getSchools = useCallback(
    (query: string, take: number) => {
      if (yearData) {
        setLoading(true);
        apiUser
          .schoolsClass(yearData.id, query)
          .then((res) => {
            setSchoolsData(res.result);
            define_step(res.total, take);
          })
          .finally(() => setLoading(false));
      }
    },
    [yearData]
  );

  const take = useMemo(() => {
    if (smDown) {
      return 1;
    } else if (mdDown) return 2;

    return 3;
  }, [smDown, mdDown]);

  useEffect(() => {
    let queryData = query(take);
    if (search) {
      queryData += `&name=${search}`;
      debounce(() => {
        getSchools(queryData, take);
      });
    } else getSchools(queryData, take);
  }, [query, search, take]);

  return (
    <>
      <Grid item xs={12} md={9}>
        <Box component={Paper}>
          <Box
            height={theme.spacing(7)}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Typography
              component="div"
              variant="h6"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SchoolIcon />
              Escolas
            </Typography>
            <Box display="flex" gap={2}>
              <Tooltip title="Selecione">
                <IconButton color="primary" onClick={onClose}>
                  <SchoolIcon />
                </IconButton>
              </Tooltip>
              <TextField
                size="small"
                value={search}
                placeholder="Pesquisar..."
                onChange={(e) => setSearch?.(e.target.value)}
              />
            </Box>
          </Box>
          <Divider />
          <Box p={1}>
            <Grid container spacing={2}>
              {loading ? (
                <Grid item xs={12}>
                  <LinearProgress variant="indeterminate" />
                </Grid>
              ) : (
                schoolsData?.map((el) => (
                  <Grid key={el.id} item xs={12} sm={6} md={4}>
                    <CardSchool school={el} isHome={isHome} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
          <PaginationMobile />
        </Box>
      </Grid>
      <DialogSchool open={open} onClose={onClose} isHome={isHome} />
    </>
  );
};
