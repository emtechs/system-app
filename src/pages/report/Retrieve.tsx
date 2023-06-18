import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { BasePage, SelectSchoolClass } from "../../shared/components";
import { iPageProps, iStudentClass } from "../../shared/interfaces";
import { useClassContext } from "../../shared/contexts";
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

const columns: GridColDef[] = [
  {
    field: "registry",
    headerName: "Matrícula",
    type: "number",
    editable: true,
  },
  {
    field: "name",
    headerName: "Aluno",
    editable: true,
  },
  {
    field: "presented",
    headerName: "Presenças",
    type: "number",
    editable: true,
  },
  {
    field: "justified",
    headerName: "Justificadas",
    type: "number",
    editable: true,
  },
  {
    field: "missed",
    headerName: "Faltas",
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

export const ReportRetrievePage = ({ back }: iPageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<iStudentClass[]>();
  const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();

  useEffect(() => {
    setClassWithSchoolSelect(undefined);
  }, []);

  useEffect(() => {
    if (classWithSchoolSelect) {
      setData(classWithSchoolSelect.students);
    }
  }, [classWithSchoolSelect]);
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
      <Dialog
        open={!classWithSchoolSelect}
        onClose={() => navigate(back ? back : "/")}
      >
        <DialogTitle>Editar Turma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione a escola e, em seguida, a turma que você deseja editar.
          </DialogContentText>
          <FormContainer>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <SelectSchoolClass />
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
