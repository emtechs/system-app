import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { useAppThemeContext, useFrequencyContext } from "../../shared/contexts";
import { iFrequencyWithInfreq } from "../../shared/interfaces";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  DialogDeleteFrequency,
  DialogRetrieveFrequency,
} from "../../shared/components";
dayjs.locale("pt-br");
dayjs.extend(relativeTime);

interface iFreqDashProps {
  freq: iFrequencyWithInfreq;
  isOpen?: boolean;
  handleOpen: () => void;
}

const FreqDash = ({ freq, isOpen, handleOpen }: iFreqDashProps) => {
  const { setRetrieveFreq } = useFrequencyContext();
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Typography gutterBottom>{freq.date}</Typography>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            gutterBottom
          >
            {freq.class.school.name}
          </Typography>
          <Typography gutterBottom>{freq.class.class.name}</Typography>
          <Typography gutterBottom>{freq._count.students} Alunos</Typography>
          <Typography gutterBottom>
            {String(freq.infrequency).replace(".", ",")}% de Infrequência
          </Typography>
          <Typography>{freq.user.name}</Typography>
          <Typography gutterBottom>{freq.user.cpf}</Typography>
          <Typography variant="caption">
            {freq.finished_at
              ? dayjs(freq.finished_at).fromNow()
              : dayjs(freq.created_at).fromNow()}
          </Typography>
        </CardContent>
        <CardActions>
          {isOpen ? (
            <Button
              size="small"
              onClick={() => {
                setRetrieveFreq(freq);
                handleOpen();
              }}
            >
              Excluir
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                setRetrieveFreq(freq);
                handleOpen();
              }}
            >
              Reabrir
            </Button>
          )}
          <Button size="small">Saber Mais</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const DashboardAdmin = () => {
  const theme = useTheme();
  const mdLgBetween = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { setLoading } = useAppThemeContext();
  const [listFreqData, setListFreqData] = useState<iFrequencyWithInfreq[]>();
  const [listFreqOpenData, setListFreqOpenData] =
    useState<iFrequencyWithInfreq[]>();
  const { retrieveFreq } = useFrequencyContext();
  const [openRetrieve, setOpenRetrieve] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenRetrieve = () => setOpenRetrieve(!openRetrieve);
  const handleOpenDelete = () => setOpenDelete(!openDelete);

  useEffect(() => {
    let take = 1;
    if (mdLgBetween) {
      take = 2;
    } else if (mdUp) {
      take = 3;
    }

    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq[]>(
        `frequencies?status=CLOSED&take=${take}&is_infreq=true`
      )
      .then((res) => setListFreqData(res.data))
      .finally(() => setLoading(false));

    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq[]>(`frequencies?is_dash=true&take=${take}`)
      .then((res) => setListFreqOpenData(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let take = 1;
    if (mdLgBetween) {
      take = 2;
    } else if (mdUp) {
      take = 3;
    }
    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq[]>(
        `frequencies?status=CLOSED&take=${take}&is_infreq=true`
      )
      .then((res) => setListFreqData(res.data))
      .finally(() => setLoading(false));
    setLoading(true);
    apiUsingNow
      .get<iFrequencyWithInfreq[]>(`frequencies?is_dash=true&take=${take}`)
      .then((res) => setListFreqOpenData(res.data))
      .finally(() => setLoading(false));
  }, [retrieveFreq]);

  return (
    <>
      <LayoutBasePage title="Página Inicial">
        <Box
          mx={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Card>
            <CardContent>
              <Grid container direction="column" p={2} spacing={2}>
                <Typography variant="h6">Últimas Frequências</Typography>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  {listFreqData &&
                    listFreqData.map((el) => (
                      <FreqDash
                        key={el.id}
                        freq={el}
                        handleOpen={handleOpenRetrieve}
                      />
                    ))}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button>Saber Mais</Button>
            </CardActions>
          </Card>
        </Box>
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Card>
            <CardContent>
              <Grid container direction="column" p={2} spacing={2}>
                <Typography variant="h6">Frequências Em Aberto</Typography>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  {listFreqOpenData &&
                    listFreqOpenData.map((el) => (
                      <FreqDash
                        key={el.id}
                        freq={el}
                        isOpen
                        handleOpen={handleOpenDelete}
                      />
                    ))}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button>Saber Mais</Button>
            </CardActions>
          </Card>
        </Box>
      </LayoutBasePage>
      {retrieveFreq && (
        <DialogRetrieveFrequency
          open={openRetrieve}
          onClose={handleOpenRetrieve}
          frequency={retrieveFreq}
        />
      )}
      {retrieveFreq && (
        <DialogDeleteFrequency
          open={openDelete}
          onClose={handleOpenDelete}
          frequency={retrieveFreq}
        />
      )}
    </>
  );
};
