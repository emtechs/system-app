import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { iChildren } from "../interfaces";

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
}

type iRowsPage =
  | number
  | {
      value: number;
      label: string;
    };

const TableContext = createContext({} as iTableContextData);

export const TableProvider = ({ children }: iChildren) => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState<iRowsPage[]>();
  const [take, setTake] = useState<number>();
  const [skip, setSkip] = useState<number>();
  const [order, setOrder] = useState<string | null>();
  const [by, setBy] = useState<"asc" | "desc">("asc");

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
      setSkip(page * take + 1);
    }
  }, [page, take]);

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
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
