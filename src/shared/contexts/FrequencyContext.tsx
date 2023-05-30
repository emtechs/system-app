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
  iFrequencyStudentsWithInfreq,
  iFrequencyWithInfreq,
} from "../interfaces";
import {
  deleteFrequency,
  patchFrequency,
  patchFrequencyStudent,
  postFrequency,
} from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from ".";
import { FieldValues } from "react-hook-form";

interface iFrequencyContextData {
  createFrequency: (data: FieldValues) => Promise<void>;
  updateFrequency: (data: FieldValues, id: string) => Promise<void>;
  updateFrequencyStudent: (data: FieldValues, id: string) => Promise<void>;
  destroyFrequency: (id: string) => Promise<void>;
  frequencyData: iFrequency | undefined;
  setFrequencyData: Dispatch<SetStateAction<iFrequency | undefined>>;
  studentData: iFrequencyStudentsWithInfreq | undefined;
  setStudentData: Dispatch<
    SetStateAction<iFrequencyStudentsWithInfreq | undefined>
  >;
  retrieveFreq: iFrequencyWithInfreq | undefined;
  setRetrieveFreq: Dispatch<SetStateAction<iFrequencyWithInfreq | undefined>>;
}

const FrequencyContext = createContext({} as iFrequencyContextData);

export const FrequencyProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [frequencyData, setFrequencyData] = useState<iFrequency>();
  const [studentData, setStudentData] =
    useState<iFrequencyStudentsWithInfreq>();
  const [retrieveFreq, setRetrieveFreq] = useState<iFrequencyWithInfreq>();

  const handleCreateFrequency = useCallback(async (data: FieldValues) => {
    try {
      setLoading(true);
      const frequency = await postFrequency(data);
      toast.success("Frequência cadastrado com sucesso!");
      setFrequencyData(frequency);
      setLoading(false);
      navigate(`/frequency/${frequency.id}`);
    } catch {
      setLoading(false);
      toast.error("Não foi possível cadastrar a frequência no momento!");
    }
  }, []);

  const handleUpdateFrequency = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await patchFrequency(data, id);
        toast.success("Frequência realizada com sucesso!");
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Não foi possível realizar a frequência no momento!");
      }
    },
    []
  );

  const handleUpdateStudentFrequency = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await patchFrequencyStudent(data, id);
        toast.success("Falta cadastrada com sucesso!");
        setStudentData(undefined);
        setLoading(false);
      } catch {
        setStudentData(undefined);
        setLoading(false);
        toast.error("Não foi possível cadastrar a falta no momento!");
      }
    },
    []
  );

  const handleDeleteFrequency = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteFrequency(id);
      toast.success("Frequência deletada com sucesso!");
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Não foi possível deletar a frequência no momento!");
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
      }}
    >
      {children}
    </FrequencyContext.Provider>
  );
};

export const useFrequencyContext = () => useContext(FrequencyContext);
