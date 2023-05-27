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
  iClass,
  iClassRequest,
  iClassSelect,
  iClassWithSchool,
  iSchoolImportRequest,
} from "../interfaces";
import { patchClassSchool, postClass, postImportClass } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { FieldValues } from "react-hook-form";

interface iClassContextData {
  createClass: (data: iClassRequest, back?: string) => Promise<void>;
  importClass: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  updateClassSchool: (data: FieldValues, back?: string) => Promise<void>;
  classDataSelect: iClassSelect[] | undefined;
  setClassDataSelect: Dispatch<SetStateAction<iClassSelect[] | undefined>>;
  listClassData: iClass[] | undefined;
  setListClassData: Dispatch<SetStateAction<iClass[] | undefined>>;
  classSelect: iClass | undefined;
  setClassSelect: Dispatch<SetStateAction<iClass | undefined>>;
  classWithSchoolSelect: iClassWithSchool | undefined;
  setClassWithSchoolSelect: Dispatch<
    SetStateAction<iClassWithSchool | undefined>
  >;
}

const ClassContext = createContext({} as iClassContextData);

export const ClassProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const [classDataSelect, setClassDataSelect] = useState<iClassSelect[]>();
  const [listClassData, setListClassData] = useState<iClass[]>();
  const [classSelect, setClassSelect] = useState<iClass>();
  const [classWithSchoolSelect, setClassWithSchoolSelect] =
    useState<iClassWithSchool>();

  const handleCreateClass = useCallback(
    async (data: iClassRequest, back?: string) => {
      try {
        setLoading(true);
        await postClass(data);
        toast.success("Turma cadastrada com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível cadastrar a turma no momento!");
      }
    },
    []
  );

  const handleImportClass = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await postImportClass(file);
        toast.success("Turmas importadas com sucesso!");
        setLoading(false);
        navigate(back ? back : "/");
      } catch {
        setLoading(false);
        toast.error("Não foi possível importar as turmas no momento!");
      }
    },
    []
  );

  const handleUpdateClassSchool = useCallback(
    async (data: FieldValues, back?: string) => {
      try {
        setLoading(true);
        await patchClassSchool(data);
        navigate(back ? back : "/");
        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
    []
  );

  return (
    <ClassContext.Provider
      value={{
        createClass: handleCreateClass,
        importClass: handleImportClass,
        updateClassSchool: handleUpdateClassSchool,
        classDataSelect,
        listClassData,
        classSelect,
        setClassSelect,
        setListClassData,
        setClassDataSelect,
        classWithSchoolSelect,
        setClassWithSchoolSelect,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => useContext(ClassContext);
