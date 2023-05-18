import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { apiUsingNow } from "../../services";
import { iUser } from "../../interfaces";
import { Button } from "@mui/material";

interface iValidateCPFProps {
  school_id?: string;
}

export const ValidateCPF = ({ school_id }: iValidateCPFProps) => {
  const { setValue, watch, setError, clearErrors, formState } =
    useFormContext();
  const cpf = watch("cpf");
  const { isValid } = formState;

  useEffect(() => {
    if (typeof cpf === "string") {
      const notNumber = cpf.replace(/\D/g, "");
      setValue("cpf", notNumber);
      const limitNumber = notNumber.substring(0, 11);
      setValue("cpf", limitNumber);
      if (limitNumber.length === 11) {
        if (school_id) {
          apiUsingNow
            .get<iUser>(`servers/${school_id}/cpf/${limitNumber}`)
            .then((res) => {
              if (res.data.id) {
                setError("cpf", {
                  message: "Usuário já está cadastrado",
                });
                setValue("login", 1);
              } else {
                clearErrors("cpf");
              }
            });
        } else {
          apiUsingNow.get<iUser>(`users/cpf/${limitNumber}`).then((res) => {
            if (res.data.id) {
              setError("cpf", {
                message: "Usuário já está cadastrado",
              });
              setValue("login", 1);
            } else {
              clearErrors("cpf");
            }
          });
        }
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
