import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  iChildren,
  iFrequency,
  iFrequencyStudentsBase,
  iFrequencyWithInfreq,
} from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext, useSchoolContext } from ".";
import { FieldValues } from "react-hook-form";
import { apiFrequency } from "../services";

interface iFrequencyContextData {
  createFrequency: (data: FieldValues) => Promise<void>;
  updateFrequency: (
    data: FieldValues,
    id: string,
    isOpen?: boolean
  ) => Promise<void>;
  updateFrequencyStudent: (data: FieldValues, id: string) => Promise<void>;
  destroyFrequency: (id: string) => Promise<void>;
  frequencyData: iFrequency | undefined;
  setFrequencyData: Dispatch<SetStateAction<iFrequency | undefined>>;
  studentData: iFrequencyStudentsBase | undefined;
  setStudentData: Dispatch<SetStateAction<iFrequencyStudentsBase | undefined>>;
  alterStudents: iFrequencyStudentsBase[] | undefined;
  setAlterStudents: Dispatch<
    SetStateAction<iFrequencyStudentsBase[] | undefined>
  >;
  retrieveFreq: iFrequencyWithInfreq | undefined;
  setRetrieveFreq: Dispatch<SetStateAction<iFrequencyWithInfreq | undefined>>;
  dataStudents: iFrequencyStudentsBase[] | undefined;
  setDataStudents: Dispatch<
    SetStateAction<iFrequencyStudentsBase[] | undefined>
  >;
  isInfreq: boolean;
  setIsInfreq: Dispatch<SetStateAction<boolean>>;
}

const FrequencyContext = createContext({} as iFrequencyContextData);

export const FrequencyProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError } = useAppThemeContext();
  const { schoolRetrieve } = useSchoolContext();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();
  const [studentData, setStudentData] = useState<iFrequencyStudentsBase>();
  const [retrieveFreq, setRetrieveFreq] = useState<iFrequencyWithInfreq>();
  const [dataStudents, setDataStudents] = useState<iFrequencyStudentsBase[]>();
  const [alterStudents, setAlterStudents] =
    useState<iFrequencyStudentsBase[]>();
  const [isInfreq, setIsInfreq] = useState(false);

  const handleCreateFrequency = useCallback(async (data: FieldValues) => {
    try {
      setLoading(true);
      const frequency = await apiFrequency.create(data);
      handleSucess("Frequência cadastrado com sucesso!");
      navigate(`/frequency/realize?id=${frequency.id}`);
    } catch {
      handleError("Não foi possível cadastrar a frequência no momento!");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateFrequency = useCallback(
    async (data: FieldValues, id: string, isOpen?: boolean) => {
      try {
        setLoading(true);
        await apiFrequency.update(data, id);
        if (isOpen) {
          handleSucess("Frequência reaberta com sucesso!");
        } else {
          handleSucess("Frequência realizada com sucesso!");
        }
        navigate("/" + schoolRetrieve?.id);
      } catch {
        if (isOpen) {
          handleSucess("Não foi possível reabrir a frequência no momento!");
        } else {
          handleError(
            "No momento, não foi possível realizar a frequência. Por favor, tente enviar novamente."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateStudentFrequency = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        const { frequency_id } = await apiFrequency.updateFreqStudent(data, id);
        const students = await apiFrequency.students(frequency_id, "");
        setDataStudents(students.result);
      } catch {
        handleError("Não foi possível cadastrar a falta no momento!");
      } finally {
        setAlterStudents(undefined);
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteFrequency = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await apiFrequency.destroy(id);
      handleSucess("Frequência deletada com sucesso!");
    } catch {
      handleError("Não foi possível deletar a frequência no momento!");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FrequencyContext.Provider
      value={{
        createFrequency: handleCreateFrequency,
        updateFrequency: handleUpdateFrequency,
        updateFrequencyStudent: handleUpdateStudentFrequency,
        destroyFrequency: handleDeleteFrequency,
        frequencyData,
        setFrequencyData,
        studentData,
        setStudentData,
        retrieveFreq,
        setRetrieveFreq,
        isInfreq,
        setIsInfreq,
        dataStudents,
        setDataStudents,
        alterStudents,
        setAlterStudents,
      }}
    >
      {children}
    </FrequencyContext.Provider>
  );
};

export const useFrequencyContext = () => useContext(FrequencyContext);
