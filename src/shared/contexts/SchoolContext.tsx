import {
  iChildren,
  iSchool,
  iSchoolImportRequest,
  iSchoolRequest,
  iSchoolServer,
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
import { apiSchool, apiUser } from "../services";
import { useAuthContext } from "./AuthContext";
import { adaptName } from "../scripts";
import { usePaginationContext } from ".";

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
    query?: string,
    back?: string
  ) => Promise<void>;
  deleteServer: (school_id: string, server_id: string) => Promise<void>;
  schoolSelect: iSchool | undefined;
  setSchoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  schoolRetrieve: (id: string) => void;
  labelSchool: () => string;
  director: boolean[];
  setDirector: Dispatch<SetStateAction<boolean[]>>;
  is_director: () => "" | "&is_director=true" | "&is_director=false";
  openActive: boolean;
  handleOpenActive: () => void;
  openCreate: boolean;
  handleOpenCreate: () => void;
  openEdit: boolean;
  handleOpenEdit: () => void;
  openDirector: boolean;
  handleOpenDirector: () => void;
  serversData: iSchoolServer[] | undefined;
  getServers: (id: string, query: string, take: number) => void;
  getSchool: (query: string, take: number) => void;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown } =
    useAppThemeContext();
  const { schoolData, setSchoolData } = useAuthContext();
  const { setIsLoading, setCount, setTotal, setSteps, setActiveStep } =
    usePaginationContext();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [schoolSelect, setSchoolSelect] = useState<iSchool>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [serversData, setServersData] = useState<iSchoolServer[]>();
  const [director, setDirector] = useState([true, true]);
  const [openActive, setOpenActive] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDirector, setOpenDirector] = useState(false);
  const handleOpenActive = () => setOpenActive(!openActive);
  const handleOpenCreate = () => setOpenCreate(!openCreate);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const handleOpenDirector = () => setOpenDirector(!openDirector);

  const is_director = useCallback(() => {
    if (director[0] !== director[1]) {
      if (director[0]) return "&is_director=true";
      if (director[1]) return "&is_director=false";
    }
    return "";
  }, [director]);

  const labelSchool = useCallback(() => {
    if (schoolData) {
      if (mdDown) return adaptName(schoolData.name);
      return schoolData.name;
    }
    return "";
  }, [schoolData, mdDown]);

  const schoolRetrieve = useCallback((id: string) => {
    setLoading(true);
    apiSchool
      .retrieve(id)
      .then((res) => setSchoolData(res))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  const getSchool = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        setActiveStep(0);
        apiSchool
          .list(query)
          .then((res) => {
            setTotal(res.total);
            setListSchoolData(res.result);
            setCount(res.total);
            const arredSteps = Math.ceil(res.total / take);
            setSteps(arredSteps === 1 ? 0 : arredSteps);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListSchoolData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const getServers = useCallback(
    (id: string, query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        setActiveStep(0);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setTotal(res.total);
            setServersData(res.result);
            setCount(res.total);
            const arredSteps = Math.ceil(res.total / take);
            setSteps(arredSteps === 1 ? 0 : arredSteps);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setServersData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [mdDown]
  );

  const handleCreateSchool = useCallback(async (data: iSchoolRequest) => {
    try {
      setLoading(true);
      const school = await apiSchool.create(data);
      handleSucess("A escola foi cadastrada com sucesso!");
      navigate(`/school?id=${school.id}`);
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
      query?: string,
      back?: string
    ) => {
      try {
        setLoading(true);
        const school = await apiSchool.update(data, id, query);
        setSchoolData(school);
        if (type === "diretor") getServers(school.id, "", 1);
        handleSucess(`Sucesso ao alterar o ${type} da Escola!`);
      } catch {
        handleError(
          `Não foi possível atualizar o ${type} da escola no momento!`
        );
      } finally {
        setSchoolSelect(undefined);
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
        updateServerData,
        setUpdateServerData,
        labelSchool,
        schoolRetrieve,
        director,
        setDirector,
        is_director,
        handleOpenDirector,
        handleOpenEdit,
        openDirector,
        openEdit,
        serversData,
        getServers,
        handleOpenCreate,
        openCreate,
        handleOpenActive,
        openActive,
        getSchool,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
