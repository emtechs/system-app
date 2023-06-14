import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { iChildren } from "../interfaces";
import { useSearchParams } from "react-router-dom";

interface iTableContextData {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  rowsPage: iRowsPage[] | undefined;
  take: number | undefined;
  setTake: Dispatch<SetStateAction<number | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  skip: number | undefined;
  order: string | null | undefined;
  setOrder: Dispatch<SetStateAction<string | undefined | null>>;
  by: "asc" | "desc";
  setBy: Dispatch<SetStateAction<"asc" | "desc">>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  defineQuery: (year_id?: string, school_id?: string, date?: string) => string;
}

type iRowsPage =
  | number
  | {
      value: number;
      label: string;
    };

const TableContext = createContext({} as iTableContextData);

export const TableProvider = ({ children }: iChildren) => {
  const [searchParams] = useSearchParams();
  const orderData = searchParams.get("order");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState<iRowsPage[]>();
  const [take, setTake] = useState<number>();
  const [skip, setSkip] = useState<number>();
  const [order, setOrder] = useState<string | null>();
  const [by, setBy] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (count < 10) {
      setTake(undefined);
      setrowsPage([{ label: "Todos", value: -1 }]);
    }
    if (count < 20) {
      setTake(10);
      setrowsPage([10, { label: "Todos", value: -1 }]);
    }
    if (count < 30) {
      setTake(10);
      setrowsPage([10, 20, { label: "Todos", value: -1 }]);
    }
    if (count < 40) {
      setTake(10);
      setrowsPage([10, 20, 30, { label: "Todos", value: -1 }]);
    }
    if (count > 45) {
      setTake(10);
      setrowsPage([10, 20, 30, 40]);
    }
  }, [count]);

  useEffect(() => {
    if (page === 0) {
      setSkip(undefined);
    } else if (take) {
      setSkip(page * take);
    }
  }, [page, take]);

  const defineQuery = useCallback(
    (year_id?: string, school_id?: string, date?: string) => {
      let query = "?by=" + by;
      if (order) {
        query += `&order=${order}`;
      } else if (orderData) {
        setOrder(orderData);
        query += `&order=${orderData}`;
      }
      if (take) query += "&take=" + take;
      if (skip) query += "&skip=" + skip;
      if (year_id) query += "&year_id=" + year_id;
      if (school_id) query += "&school_id=" + school_id;
      if (date) query += "&date=" + date;

      return query;
    },
    [by, take, skip, order, orderData]
  );

  return (
    <TableContext.Provider
      value={{
        count,
        setCount,
        rowsPage,
        setTake,
        take,
        page,
        setPage,
        skip,
        order,
        setOrder,
        by,
        setBy,
        isLoading,
        setIsLoading,
        defineQuery,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
