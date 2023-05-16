import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import { apiUsingNow } from "../../services";
import { iDash, iUser } from "../../interfaces";
import { Button } from "@mui/material";

interface iValidateCPFProps {
  dash: iDash;
  school_id?: string;
}

export const ValidateCPF = ({ dash, school_id }: iValidateCPFProps) => {
  const { setValue, watch, setError, clearErrors, formState } =
    useFormContext();
  const cpf = watch("cpf");
  const { isValid } = formState;

  useEffect(() => {
    if (typeof cpf === "string") {
      const notNumber = cpf.replace(/\D/g, "");
      setValue("cpf", notNumber);
      setValue("cpf", notNumber.substring(0, 11));
      if (notNumber.length === 11) {
        switch (dash) {
          case "ADMIN":
            apiUsingNow.get<iUser>(`users/cpf/${notNumber}`).then((res) => {
              if (res.data.id) {
                setError("cpf", {
                  message: "Usuário já está cadastrado",
                });
                setValue("login", 1);
              } else {
                clearErrors("cpf");
              }
            });
            break;
          case "SCHOOL":
            apiUsingNow
              .get<iUser>(`servers/${school_id}/cpf/${notNumber}`)
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
            break;
        }
      } else {
        clearErrors("cpf");
      }
      const value = notNumber.replace(
        /^(\d{3})(\d{3})(\d{3})(\d)/,
        "$1.$2.$3-$4"
      );
      setValue("cpf", value);
      setValue("login", notNumber);
    }
  }, [cpf]);
  return (
    <Button variant="contained" type="submit" disabled={!isValid} fullWidth>
      Salvar
    </Button>
  );
};
