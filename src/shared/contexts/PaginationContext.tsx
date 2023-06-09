import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { iChildren } from "../interfaces";

interface iPaginationContextData {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  rowsPage: iRowsPage[] | undefined;
  take: number | undefined;
  setTake: Dispatch<SetStateAction<number | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  skip: number | undefined;
}

type iRowsPage =
  | number
  | {
      value: number;
      label: string;
    };

const PaginationContext = createContext({} as iPaginationContextData);

export const PaginationProvider = ({ children }: iChildren) => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState<iRowsPage[]>();
  const [take, setTake] = useState<number>();
  const [skip, setSkip] = useState<number>();

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
    <PaginationContext.Provider
      value={{ count, setCount, rowsPage, setTake, take, page, setPage, skip }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
