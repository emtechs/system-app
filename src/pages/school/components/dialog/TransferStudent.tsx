import { FieldValues, useFormContext } from "react-hook-form";
import { iClass, iSchool, iSchoolStudent } from "../../../../shared/interfaces";
import { useEffect, useState } from "react";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { apiClass, apiSchool } from "../../../../shared/services";
import {
  useAppThemeContext,
  useDialogContext,
} from "../../../../shared/contexts";
import { DialogBaseChildren } from "../../../../shared/components";
import { studentTransferSchema } from "../../../../shared/schemas";

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
  student: iSchoolStudent;
  getStudent: (query: string) => void;
}

export const DialogTransferStudent = ({
  getStudent,
  student,
}: iDialogTransferStudentProps) => {
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
      getStudent("");
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
      Turma ${student.class.name.toUpperCase()}?`}
    >
      <FormContainer
        onSuccess={(data) => {
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
