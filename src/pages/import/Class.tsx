import { useState } from "react";
import { useClassContext } from "../../shared/contexts";
import { iPageProps } from "../../shared/interfaces";
import { BasePage, BoxResp, InputFile } from "../../shared/components";
import { FormContainer } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolImportSchema } from "../../shared/schemas";
import { Button } from "@mui/material";

export const ImportClassPage = ({ back }: iPageProps) => {
  const { importClass } = useClassContext();
  const urlToDownload = "/schools.csv";
  const [download, setDownload] = useState("");
  const [count, setCount] = useState(0);

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => importClass(data, back)}
        resolver={zodResolver(schoolImportSchema)}
      >
        <BoxResp isProfile>
          <Button
            onClick={() => {
              setDownload(urlToDownload);
              setCount((old) => old + 1);
            }}
          >
            Modelo do Arquivo .csv
          </Button>
          {download && (
            <iframe
              src={download + "?c=" + count}
              style={{ display: "none" }}
            ></iframe>
          )}
          <InputFile />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
