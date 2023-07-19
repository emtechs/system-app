import {
  AutocompleteElement,
  FieldValues,
  FormContainer,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import {
  useAppThemeContext,
  useClassContext,
  useDialogContext,
} from "../../../contexts";
import { iClass, iSchool, iStudent } from "../../../interfaces";
import { BaseContentChildren, DialogBaseChildren } from "../structure";
import { apiClass, apiSchool } from "../../../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentTransferSchema } from "../../../schemas";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface iClassSelectProps {
  year_id: string;
}

const ClassSelect = ({ year_id }: iClassSelectProps) => {
  const { watch } = useFormContext();
  const school: iSchool = watch("school");
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>();

  useEffect(() => {
    if (school) {
      apiClass
        .list(`?year_id=${year_id}&school_id=${school.id}&is_active=true`)
        .then((res) => setClassDataSelect(res.classes));
    }
  }, [school, year_id]);

  return (
    <AutocompleteElement
      name="class"
      label="Turma"
      loading={!classDataSelect}
      options={
        classDataSelect && classDataSelect.length > 0
          ? classDataSelect
          : [
              {
                id: 1,
                label: "No momento, não há nenhuma turma cadastrada",
              },
            ]
      }
      textFieldProps={{ fullWidth: true }}
    />
  );
};

interface iDialogTransferStudentProps {
  student: iStudent;
  id: string;
}

export const DialogTransferStudent = ({
  student,
  id,
}: iDialogTransferStudentProps) => {
  const { getStudents } = useClassContext();
  const { setLoading, handleError, handleSucess } = useAppThemeContext();
  const { openEdit, handleOpenEdit } = useDialogContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>();

  useEffect(() => {
    apiSchool.list("").then((res) => setSchoolDataSelect(res.schools));
  }, []);

  const transferStudent = async (data: FieldValues) => {
    try {
      setLoading(true);
      await apiClass.transfer(data);
      handleSucess("Aluno transferido com sucesso!");
      getStudents(id);
    } catch {
      handleError("Não foi possível transferir o aluno no momento!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Transferir Aluno de Turma"
      description={`Deseja continuar transferindo o aluno ${student.name.toUpperCase()} da
      Turma ${student.class.name.toUpperCase()} da Escola ${
        student.school.name
      }?`}
    >
      <FormContainer
        onSuccess={(data) => {
          console.log(data);
          handleOpenEdit();
          transferStudent(data);
        }}
        values={{
          year_id: student.year_id,
          student_id: student.id,
          key: student.key,
        }}
        resolver={zodResolver(studentTransferSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="justify_disabled"
            label="Justificativa"
            required
            fullWidth
          />
          <AutocompleteElement
            name="school"
            label="Escola"
            loading={!schoolDataSelect}
            options={
              schoolDataSelect && schoolDataSelect.length > 0
                ? schoolDataSelect
                : [
                    {
                      id: 1,
                      label: "No momento, não há nenhuma turma cadastrada",
                    },
                  ]
            }
            textFieldProps={{ fullWidth: true }}
          />
          <ClassSelect year_id={student.year_id} />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  );
};
