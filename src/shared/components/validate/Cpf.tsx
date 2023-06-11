import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { apiUsingNow } from "../../services";
import { iUser } from "../../interfaces";
import { Button } from "@mui/material";

interface iValidateCPFProps {
  school_id?: string;
  allNotServ?: boolean;
  director?: boolean;
}

export const ValidateCPF = ({
  school_id,
  allNotServ,
  director,
}: iValidateCPFProps) => {
  const { setValue, watch, setError, clearErrors, formState } =
    useFormContext();
  const cpf = watch("cpf");
  const { isValid } = formState;
  const query = () => {
    if (director) return `?school_id=${school_id}&director=true`;
    if (school_id) return `?school_id=${school_id}&allNotServ=true`;
    if (allNotServ) return `?allNotServ=${allNotServ}`;
    return "";
  };

  useEffect(() => {
    if (typeof cpf === "string") {
      const notNumber = cpf.replace(/\D/g, "");
      setValue("cpf", notNumber);
      const limitNumber = notNumber.substring(0, 11);
      setValue("cpf", limitNumber);
      if (limitNumber.length === 11) {
        apiUsingNow
          .get<iUser>(`users/cpf/${limitNumber}` + query())
          .then(() => {
            setError("cpf", {
              message: "Usuário já está cadastrado",
            });
            setValue("login", 1);
          })
          .catch(() => clearErrors("cpf"));
      } else {
        clearErrors("cpf");
      }
      const value = limitNumber.replace(
        /^(\d{3})(\d{3})(\d{3})(\d)/,
        "$1.$2.$3-$4"
      );
      setValue("cpf", value);
      setValue("login", limitNumber);
    }
  }, [cpf]);
  return (
    <Button variant="contained" type="submit" disabled={!isValid} fullWidth>
      Salvar
    </Button>
  );
};
