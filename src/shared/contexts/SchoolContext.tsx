import {
  iChildren,
  iSchool,
  iSchoolImportRequest,
  iSchoolRequest,
  iServerRequest,
  iWorkSchool,
} from "../interfaces";
import { FieldValues } from "react-hook-form";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "./ThemeContext";
import { apiSchool, apiUser, apiUsingNow } from "../services";
import { useAuthContext } from "./AuthContext";
import { adaptName } from "../scripts";

interface iSchoolContextData {
  createSchool: (data: iSchoolRequest) => Promise<void>;
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  createServer: (
    data: iServerRequest,
    id: string,
    back?: string
  ) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    back?: string
  ) => Promise<void>;
  deleteServer: (school_id: string, server_id: string) => Promise<void>;
  schoolSelect: iSchool | undefined;
  setSchoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  updateSchoolData: iSchool | undefined;
  setUpdateSchoolData: Dispatch<SetStateAction<iSchool | undefined>>;
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  schoolRetrieve: (id: string) => void;
  labelSchool: () => string;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown } =
    useAppThemeContext();
  const { schoolData, setSchoolData } = useAuthContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [schoolSelect, setSchoolSelect] = useState<iSchool>();
  const [updateSchoolData, setUpdateSchoolData] = useState<iSchool>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();

  const schoolRetrieve = useCallback((id: string) => {
    setLoading(true);
    apiUsingNow
      .get<iSchool>(`schools/${id}`)
      .then((res) => setSchoolData(res.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  const labelSchool = useCallback(() => {
    if (schoolData) {
      if (mdDown) return adaptName(schoolData.name);
      return schoolData.name;
    }
    return "";
  }, [schoolData, mdDown]);

  const handleCreateSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      const school = await apiSchool.create(data);
      handleSucess("A escola foi cadastrada com sucesso!");
      navigate(`/school?id=${school.id}&order=name`);
    } catch {
      handleError(
        "No momento, não foi possível cadastrar a escola. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImportSchool = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData();
      file.append("file", data.file);
      try {
        setLoading(true);
        await apiSchool.impSchool(file);
        handleSucess("Escolas importadas com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível importar as escolas no momento!");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateSchool = useCallback(
    async (
      data: FieldValues,
      id: string,
      type: "nome" | "diretor" | "estado",
      back?: string
    ) => {
      try {
        setLoading(true);
        await apiSchool.update(data, id);
        handleSucess(`Sucesso ao alterar o ${type} da Escola!`);
      } catch {
        handleError(
          `Não foi possível atualizar o ${type} da escola no momento!`
        );
      } finally {
        setSchoolSelect(undefined);
        setUpdateSchoolData(undefined);
        setLoading(false);
        if (back) navigate(back);
      }
    },
    []
  );

  const handleCreateServer = useCallback(
    async (data: iServerRequest, id: string, back?: string) => {
      try {
        setLoading(true);
        const query = `?school_id=${id}`;
        await apiUser.create(data, query);
        handleSucess("Servidor cadastrado com sucesso!");
        navigate(back ? back : "/");
      } catch {
        handleError("Não foi possível cadastrar o servidor no momento!");
      } finally {
        setSchoolSelect(undefined);
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteServer = useCallback(
    async (school_id: string, server_id: string) => {
      try {
        setLoading(true);
        await apiSchool.deleteServer(school_id, server_id);
        handleSucess("Usuário removido da função com sucesso!");
      } catch {
        handleError(
          "Não foi possível remover o usuário removido da função no momento!"
        );
      } finally {
        setUpdateServerData(undefined);
        setLoading(false);
      }
    },
    []
  );

  return (
    <SchoolContext.Provider
      value={{
        createSchool: handleCreateSchool,
        importSchool: handleImportSchool,
        createServer: handleCreateServer,
        updateSchool: handleUpdateSchool,
        deleteServer: handleDeleteServer,
        listSchoolData,
        setListSchoolData,
        schoolSelect,
        setSchoolSelect,
        updateSchoolData,
        setUpdateSchoolData,
        updateServerData,
        setUpdateServerData,
        labelSchool,
        schoolRetrieve,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
