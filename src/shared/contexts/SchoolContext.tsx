import { createContext, useCallback, useContext } from "react";
import {
  iChildren,
  iClassRequest,
  iSchoolRequest,
  iStudentRequest,
} from "../interfaces";
import { postClass, postSchool, postServer, postStudent } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from ".";

interface iSchoolContextData {
  createSchool: (data: iSchoolRequest) => Promise<void>;
  createServer: (data: iSchoolRequest, id: string) => Promise<void>;
  createClass: (data: iClassRequest, id: string) => Promise<void>;
  createStudent: (data: iStudentRequest, id: string) => Promise<void>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();

  const handleCreateSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      await postSchool(data);
      toast.success("Escola cadastrada com sucesso!");
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
      toast.error("Não foi possível cadastrar a escola no momento!");
    }
  }, []);

  const handleCreateServer = useCallback(
    async (data: iSchoolRequest, id: string) => {
      try {
        setLoading(true);
        await postServer(data, id);
        toast.success("Servidor cadastrado com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar o servidor no momento!");
      }
    },
    []
  );

  const handleCreateClass = useCallback(
    async (data: iClassRequest, id: string) => {
      try {
        setLoading(true);
        await postClass(data, id);
        toast.success("Turma cadastrada com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a turma no momento!");
      }
    },
    []
  );

  const handleCreateStudent = useCallback(
    async (data: iStudentRequest, id: string) => {
      try {
        setLoading(true);
        await postStudent(data, id);
        toast.success("Estudante cadastrado com sucesso!");
        setLoading(false);
        navigate("/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar o estudante no momento!");
      }
    },
    []
  );

  return (
    <SchoolContext.Provider
      value={{
        createSchool: handleCreateSchool,
        createServer: handleCreateServer,
        createClass: handleCreateClass,
        createStudent: handleCreateStudent,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
