import { useEffect, useState } from "react";
import { useSchoolContext } from "../../shared/contexts";
import { iClass, iPageProps } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { BasePage, BoxResp, SelectSchool } from "../../shared/components";
import {
  AutocompleteElement,
  FormContainer,
  useFormContext,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentImportSchema } from "../../shared/schemas";
import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

interface iData extends iClass {
  label: string;
}

const InputFile = () => {
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext();

  const file: FileList = watch("file");

  let message = "";
  let colorError = "#0009";

  try {
    if (errors.file) {
      colorError = "#D91604";
      message = String(errors.file.message);
    }
  } catch {
    /* empty */
  }

  useEffect(() => {
    if (file) {
      if (file[0]) setFileName(file[0].name);
    }
  }, [file]);

  return (
    <Box position="relative" marginBottom={2}>
      <Box minWidth={200} display="flex" alignItems="center" gap={1}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            id="file"
            accept="text/csv"
            type="file"
            {...register("file")}
          />
          <UploadFile />
        </IconButton>
        <InputLabel
          htmlFor="file"
          sx={{ cursor: "pointer", color: `${colorError}` }}
        >
          {fileName}
        </InputLabel>
      </Box>
      {message && (
        <Typography position="absolute" left={15} fontSize={12} color="#D91604">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export const ImportStudentPage = ({ back }: iPageProps) => {
  const { importStudent, schoolSelect } = useSchoolContext();
  const [data, setData] = useState<iData[]>();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    apiUsingNow
      .get<iClass[]>(`classes?school_id=${schoolSelect?.id}`)
      .then((res) => {
        setData(
          res.data.map((el) => {
            return { ...el, label: el.name };
          })
        );
        setloading(false);
      });
  }, [schoolSelect]);

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          console.log(data);
          if (schoolSelect) importStudent(data, schoolSelect.id, back);
        }}
        resolver={zodResolver(studentImportSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
          <div style={{ width: "100%" }}>
            <AutocompleteElement
              name="class"
              label="Turma"
              options={
                data?.length
                  ? data
                  : [
                      {
                        id: 1,
                        label: "No momento, não há nenhuma turma cadastrada",
                      },
                    ]
              }
              loading={loading}
            />
          </div>
          <InputFile />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
