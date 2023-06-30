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
import { adaptNameLabel } from "../scripts";
import { usePaginationContext } from ".";

interface iSchoolContextData {
  schoolSelect: iSchool | undefined;
  setSchoolSelect: Dispatch<SetStateAction<iSchool | undefined>>;
  updateServerData: iWorkSchool | undefined;
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>;
  listSchoolData: iSchool[] | undefined;
  setListSchoolData: Dispatch<SetStateAction<iSchool[] | undefined>>;
  serversData: iSchoolServer[] | undefined;
  isHome: boolean;
  director: boolean[];
  setDirector: Dispatch<SetStateAction<boolean[]>>;
  openActive: boolean;
  openCreate: boolean;
  openEdit: boolean;
  openDirector: boolean;
  handleOpenActive: () => void;
  handleOpenCreate: () => void;
  handleOpenEdit: () => void;
  handleOpenDirector: () => void;
  is_director: () => "" | "&is_director=true" | "&is_director=false";
  labelSchoolData: () => string;
  labelSchoolDataAdmin: () => string;
  schoolDataRetrieve: (id: string) => void;
  schoolDataAdminRetrieve: (id: string) => void;
  getSchool: (query: string, take: number) => void;
  getServers: (id: string, query: string, take: number) => void;
  createSchool: (data: iSchoolRequest) => Promise<void>;
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>;
  createServer: (data: iServerRequest, id: string) => Promise<void>;
  updateSchool: (
    data: FieldValues,
    id: string,
    type: "nome" | "diretor" | "estado",
    query?: string,
    back?: string
  ) => Promise<void>;
  deleteServer: (school_id: string, server_id: string) => Promise<void>;
}

const SchoolContext = createContext({} as iSchoolContextData);

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate();
  const { setLoading, handleSucess, handleError, mdDown } =
    useAppThemeContext();
  const {
    setSchoolData,
    yearData,
    schoolData,
    schoolDataAdmin,
    setSchoolDataAdmin,
  } = useAuthContext();
  const { setIsLoading, setCount, define_step } = usePaginationContext();
  const [schoolSelect, setSchoolSelect] = useState<iSchool>();
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>();
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>();
  const [serversData, setServersData] = useState<iSchoolServer[]>();
  const [isHome, setIsHome] = useState(false);
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

  const labelSchoolData = useCallback(() => {
    if (schoolData) {
      if (mdDown) return adaptNameLabel(schoolData.name);
      return schoolData.name;
    }
    return "";
  }, [schoolData, mdDown]);

  const labelSchoolDataAdmin = useCallback(() => {
    if (schoolDataAdmin) {
      if (mdDown) return adaptNameLabel(schoolDataAdmin.name);
      return schoolDataAdmin.name;
    }
    return "";
  }, [schoolDataAdmin, mdDown]);

  const schoolDataRetrieve = useCallback((id: string) => {
    setLoading(true);
    apiSchool
      .retrieve(id)
      .then((res) => setSchoolData(res))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  const schoolDataAdminRetrieve = useCallback(
    (id: string) => {
      if (yearData) {
        setLoading(true);
        apiSchool
          .retrieveClass(id, yearData.id)
          .then((res) => {
            setSchoolDataAdmin(res);
            setIsHome(true);
          })
          .catch(() => setIsHome(false))
          .finally(() => setLoading(false));
      }
    },
    [yearData]
  );

  const getSchool = useCallback(
    (query: string, take: number) => {
      if (mdDown) {
        setIsLoading(true);
        apiSchool
          .list(query)
          .then((res) => {
            setListSchoolData(res.result);
            setCount(res.total);
            define_step(res.total, take);
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
        apiSchool
          .listServers(id, query)
          .then((res) => {
            setServersData(res.result);
            setCount(res.total);
            define_step(res.total, take);
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
    async (data: iServerRequest, id: string) => {
      try {
        setLoading(true);
        const query = `?school_id=${id}`;
        await apiUser.create(data, query);
        getServers(id, "", 1);
        handleSucess("Servidor cadastrado com sucesso!");
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
        director,
        getSchool,
        getServers,
        handleOpenActive,
        handleOpenCreate,
        handleOpenDirector,
        handleOpenEdit,
        is_director,
        isHome,
        labelSchoolData,
        labelSchoolDataAdmin,
        listSchoolData,
        openActive,
        openCreate,
        openDirector,
        openEdit,
        schoolDataAdminRetrieve,
        schoolDataRetrieve,
        schoolSelect,
        serversData,
        setDirector,
        setListSchoolData,
        setSchoolSelect,
        setUpdateServerData,
        updateServerData,
        createSchool: handleCreateSchool,
        createServer: handleCreateServer,
        deleteServer: handleDeleteServer,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);
