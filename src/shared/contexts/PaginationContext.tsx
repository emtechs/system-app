import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { iChildren } from "../interfaces";
import { useAppThemeContext } from "./ThemeContext";

interface iPaginationContextData {
  steps: number;
  is_active: (is_default?: boolean) => "&is_active=true" | "&is_active=false";
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  order: string | undefined;
  setOrder: Dispatch<SetStateAction<string | undefined>>;
  by: "asc" | "desc";
  setBy: Dispatch<SetStateAction<"asc" | "desc">>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  query: (
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    month?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
  handleChange: (_event: ChangeEvent<unknown>, value: number) => void;
  page_def: number;
  take: 5 | 10;
  handlePage: (page_data: number) => string;
  page: number;
}

const PaginationContext = createContext({} as iPaginationContextData);

export const PaginationProvider = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<string>();
  const [by, setBy] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(true);

  const handleChange = (_event: ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const take = useMemo(() => {
    if (mdDown) return 5;
    return 10;
  }, [mdDown]);

  const steps = useMemo(() => {
    const arredSteps = Math.ceil(count / take);
    return arredSteps === 1 ? 0 : arredSteps;
  }, [count, take]);

  const page_def = useMemo(() => {
    if (page > steps) return steps;

    return page;
  }, [page, steps]);

  const define_is_active = useCallback(
    (is_default?: boolean) => {
      if (is_default) return "&is_active=true";
      if (!active) return "&is_active=false";
      return "&is_active=true";
    },
    [active]
  );

  const handlePage = useCallback(
    (page_data: number) => {
      if (page_data > steps || page_data === steps) {
        setPage(steps);
        if (steps === 0) {
          return "";
        }
        return `&skip=${(steps - 1) * take}`;
      }
      setPage(page_data + 1);
      return `&skip=${page_data * take}`;
    },
    [steps, take]
  );

  const define_query = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      month?: string,
      is_active?: boolean
    ) => {
      let query = "?by=asc" + define_is_active(is_active);
      if (year_id) query += "&year_id=" + year_id;
      if (school_id) query += "&school_id=" + school_id;
      if (class_id) query += "&class_id=" + class_id;
      if (date) query += "&date=" + date;
      if (month) query += "&month=" + month;
      if (take) query += "&take=" + take;

      return query;
    },
    [define_is_active, take]
  );

  return (
    <PaginationContext.Provider
      value={{
        steps,
        count,
        setCount,
        order,
        setOrder,
        by,
        setBy,
        isLoading,
        setIsLoading,
        active,
        setActive,
        is_active: define_is_active,
        handleChange,
        page_def,
        query: define_query,
        take,
        handlePage,
        page,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
