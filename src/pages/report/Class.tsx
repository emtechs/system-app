import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { BasePage, SelectSchool } from "../../shared/components";
import { iClassWithSchool, iPageProps } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FormContainer } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { apiUsingNow } from "../../shared/services";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Turma",
    editable: true,
  },
  {
    field: "count_students",
    headerName: "Alunos",
    type: "number",
    editable: true,
  },
  {
    field: "count_frequencies",
    headerName: "Frequências",
    type: "number",
    editable: true,
  },
  {
    field: "infrequency",
    headerName: "Infrequência (%)",
    editable: true,
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

interface iData extends iClassWithSchool {
  name: string;
  count_frequencies: number;
  count_students: number;
}

export const ReportClassPage = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<iData[]>();
  const [dataSelect, setDataSelect] = useState<iClassWithSchool[]>();
  const { setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iClassWithSchool[]>(
        `classes/${schoolSelect?.id}?is_active=true&year_id=${yearData?.id}`
      )
      .then((res) => {
        if (res.data) {
          setDataSelect(
            res.data.map((el) => {
              return { ...el, id: el.class.id, label: el.class.name };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [schoolSelect]);

  useEffect(() => {
    if (dataSelect) {
      setData(
        dataSelect.map((el) => {
          return {
            ...el,
            name: el.class.name,
            count_frequencies: el._count.frequencies,
            count_students: el._count.students,
          };
        })
      );
    }
  }, [dataSelect]);

  return (
    <>
      <BasePage isProfile back={back}>
        <DataGrid
          rows={data ? data : []}
          columns={columns}
          localeText={{
            toolbarExport: "Exportar",
            toolbarExportCSV: "Baixar como CSV",
            toolbarExportPrint: "Imprimir",
          }}
          slots={{ toolbar: CustomToolbar }}
        />
      </BasePage>
      <Dialog open={!schoolSelect} onClose={() => navigate(back ? back : "/")}>
        <DialogTitle>Listar Turmas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione uma escola para listar as turmas desejadas.
          </DialogContentText>
          <FormContainer>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <SelectSchool />
            </Box>
          </FormContainer>
          <DialogActions>
            <Button onClick={() => navigate(back ? back : "/")}>
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
