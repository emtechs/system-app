import {
  iChildren,
  iStudentImportRequest,
  iStudentRequest,
} from "../interfaces";
import { FieldValues } from "react-hook-form";
import { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { apiStudent } from "../services";
import { toast } from "react-toastify";

interface iStudentContextData {
  createStudent: (
    data: iStudentRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  updateStudent: (data: FieldValues, id: string) => Promise<void>;
  importStudent: (
    data: iStudentImportRequest,
    school_id: string,
    back?: string
  ) => Promise<void>;
  importStudentAll: (
    data: iStudentImportRequest,
    back?: string
  ) => Promise<void>;
}

const StudentContext = createContext({} as iStudentContextData);

export const StudentProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();

  const handleCreateStudent = useCallback(
    async (data: iStudentRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        await apiStudent.create(data, id);
        toast.success("Estudante cadastrado com sucesso!");
        navigate(back ? back : "/");
      } catch {
        toast.error("Não foi possível cadastrar o estudante no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateStudent = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true);
        await apiStudent.update(data, id);
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleImportStudent = useCallback(
    async (data: iStudentImportRequest, school_id: string, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      const class_id = data.class_id ? data.class_id : "";
      try {
        setLoading(true);
        await apiStudent.impStudent(file, class_id, school_id);
        toast.success("Estudantes importados com sucesso!");
        navigate(back ? back : "/");
      } catch {
        toast.error("Não foi possível importar os estudantes no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleImportStudentAll = useCallback(
    async (data: iStudentImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await apiStudent.impStudentAll(file);
        toast.success("Estudantes importados com sucesso!");
        navigate(back ? back : "/");
      } catch {
        toast.error("Não foi possível importar os estudantes no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <StudentContext.Provider
      value={{
        createStudent: handleCreateStudent,
        updateStudent: handleUpdateStudent,
        importStudent: handleImportStudent,
        importStudentAll: handleImportStudentAll,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
