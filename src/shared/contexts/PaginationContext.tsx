import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { iChildren } from "../interfaces";

interface iPaginationContextData {
  steps: number;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  is_active: (is_default?: boolean) => "&is_active=true" | "&is_active=false";
  query: (
    take?: number,
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  total: number;
  rowsPage: string[] | undefined;
  take: number | undefined;
  setTake: Dispatch<SetStateAction<number | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  skip: number | undefined;
  setSkip: Dispatch<SetStateAction<number | undefined>>;
  order: string | undefined;
  setOrder: Dispatch<SetStateAction<string | undefined>>;
  by: "asc" | "desc";
  setBy: Dispatch<SetStateAction<"asc" | "desc">>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  defineQuery: (
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    month?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
  handleNext: () => void;
  handleBack: () => void;
  define_step: (total: number, take: number) => void;
  steps_table: number;
  query_table: (
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    month?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
}

const PaginationContext = createContext({} as iPaginationContextData);

export const PaginationProvider = ({ children }: iChildren) => {
  const [steps, setSteps] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPage, setrowsPage] = useState<string[]>();
  const [take, setTake] = useState<number>();
  const [skip, setSkip] = useState<number>();
  const [order, setOrder] = useState<string | undefined>("name");
  const [by, setBy] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(true);

  const steps_table = useMemo(() => {
    if (take) {
      const arredSteps = Math.ceil(count / take);
      if (arredSteps === 1) {
        setSkip(undefined);
        setPage(1);
      }
      return arredSteps === 1 ? 0 : arredSteps;
    }
    return 0;
  }, [count, take]);

  const define_step = useCallback((total: number, take: number) => {
    setTotal(total);
    const arredSteps = Math.ceil(total / take);
    setSteps(arredSteps === 1 ? 0 : arredSteps);
    if (arredSteps === 1) setActiveStep(0);
  }, []);

  const define_is_active = useCallback(
    (is_default?: boolean) => {
      if (is_default) return "&is_active=true";
      if (!active) return "&is_active=false";
      return "&is_active=true";
    },
    [active]
  );

  const query = useCallback(
    (
      take?: number,
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      is_active?: boolean,
      orderData?: string
    ) => {
      orderData = orderData ? orderData : order;
      let queryData = `?by=${by}` + define_is_active(is_active);
      if (take) queryData += `&take=${take}&skip=${activeStep * take}`;
      if (orderData) queryData += `&order=${orderData}`;
      if (year_id) queryData += "&year_id=" + year_id;
      if (school_id) queryData += "&school_id=" + school_id;
      if (class_id) queryData += "&class_id=" + class_id;
      if (date) queryData += "&date=" + date;
      return queryData;
    },
    [by, order, define_is_active, activeStep]
  );

  const handleNext = () => {
    if (activeStep !== steps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else setActiveStep(0);
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else setActiveStep(steps - 1);
  };

  useEffect(() => {
    if (count < 10) {
      setrowsPage(["5", "Todos"]);
    }
    if (count < 20) {
      setrowsPage(["5", "10", "Todos"]);
    }
    if (count < 30) {
      setrowsPage(["5", "10", "20", "Todos"]);
    }
    if (count < 40) {
      setrowsPage(["5", "10", "20", "30", "Todos"]);
    }
    if (count > 45) {
      setrowsPage(["5", "10", "20", "30", "40"]);
    }
  }, [count]);

  const pag_table = useMemo(() => {
    let data = "";

    if (take) {
      data += "&take=" + take;
    } else {
      setTake(5);
      data += "&take=5";
    }
    if (skip) data += "&skip=" + skip;

    return data;
  }, [skip, take]);

  const query_table = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      month?: string,
      is_active?: boolean,
      orderData?: string
    ) => {
      orderData = orderData ? orderData : order;
      let query = "?by=" + by + define_is_active(is_active) + pag_table;
      if (orderData) query += `&order=${orderData}`;
      if (year_id) query += "&year_id=" + year_id;
      if (school_id) query += "&school_id=" + school_id;
      if (class_id) query += "&class_id=" + class_id;
      if (date) query += "&date=" + date;
      if (month) query += "&month=" + month;

      return query;
    },
    [order, by, define_is_active, pag_table]
  );

  const defineQuery = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      month?: string,
      is_active?: boolean,
      orderData?: string
    ) => {
      orderData = orderData ? orderData : order;
      let query = "?by=" + by + define_is_active(is_active);
      if (orderData) query += `&order=${orderData}`;
      if (take) query += "&take=" + take;
      if (skip) query += "&skip=" + skip;
      if (year_id) query += "&year_id=" + year_id;
      if (school_id) query += "&school_id=" + school_id;
      if (class_id) query += "&class_id=" + class_id;
      if (date) query += "&date=" + date;
      if (month) query += "&month=" + month;

      return query;
    },
    [by, take, skip, define_is_active, order]
  );

  return (
    <PaginationContext.Provider
      value={{
        steps,
        activeStep,
        setActiveStep,
        query,
        count,
        setCount,
        total,
        rowsPage,
        setTake,
        take,
        skip,
        order,
        setOrder,
        by,
        setBy,
        isLoading,
        setIsLoading,
        active,
        setActive,
        defineQuery,
        handleBack,
        handleNext,
        is_active: define_is_active,
        define_step,
        setSkip,
        page,
        setPage,
        steps_table,
        query_table,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
