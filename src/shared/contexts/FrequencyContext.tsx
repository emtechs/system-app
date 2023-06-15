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
  iFrequencyStudents,
  iFrequencyWithInfreq,
} from "../interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from ".";
import { FieldValues } from "react-hook-form";
import { apiClass, apiFrequency, apiStudent } from "../services";

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
  studentData: iFrequencyStudents | undefined;
  setStudentData: Dispatch<SetStateAction<iFrequencyStudents | undefined>>;
  retrieveFreq: iFrequencyWithInfreq | undefined;
  setRetrieveFreq: Dispatch<SetStateAction<iFrequencyWithInfreq | undefined>>;
  isInfreq: boolean;
  setIsInfreq: Dispatch<SetStateAction<boolean>>;
}

const FrequencyContext = createContext({} as iFrequencyContextData);

export const FrequencyProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();
  const [studentData, setStudentData] = useState<iFrequencyStudents>();
  const [retrieveFreq, setRetrieveFreq] = useState<iFrequencyWithInfreq>();
  const [isInfreq, setIsInfreq] = useState(false);

  const handleCreateFrequency = useCallback(async (data: FieldValues) => {
    try {
      setLoading(true);
      const frequency = await apiFrequency.create(data);
      toast.success("Frequência cadastrado com sucesso!");
      navigate(`/frequency/realize?id=${frequency.id}`);
    } catch {
      toast.error("Não foi possível cadastrar a frequência no momento!");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateFrequency = useCallback(
    async (data: FieldValues, id: string, isOpen?: boolean) => {
      try {
        setLoading(true);
        const frequency = await apiFrequency.update(data, id);
        const students = frequency.students.map((el) => {
          return { infreq: el.infrequency, id: el.id };
        });
        await apiFrequency.updateInfreq({ infreq: frequency.infrequency }, id);
        await apiStudent.updateMany({ students });
        await apiClass.updateSchool({
          class_id: frequency.class.class.id,
          school_id: frequency.class.school.id,
          year_id: frequency.class.year.id,
          class_infreq: frequency.class_infreq ? frequency.class_infreq : 0,
          school_infreq: frequency.school_infreq ? frequency.school_infreq : 0,
        });
        if (isOpen) {
          toast.success("Frequência reaberta com sucesso!");
        } else {
          toast.success("Frequência realizada com sucesso!");
        }
        navigate("/");
      } catch {
        if (isOpen) {
          toast.success("Não foi possível reabrir a frequência no momento!");
        } else {
          toast.error(
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
        await apiFrequency.updateFreqStudent(data, id);
      } catch {
        toast.error("Não foi possível cadastrar a falta no momento!");
      } finally {
        setStudentData(undefined);
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteFrequency = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await apiFrequency.destroy(id);
      toast.success("Frequência deletada com sucesso!");
    } catch {
      toast.error("Não foi possível deletar a frequência no momento!");
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
      }}
    >
      {children}
    </FrequencyContext.Provider>
  );
};

export const useFrequencyContext = () => useContext(FrequencyContext);
