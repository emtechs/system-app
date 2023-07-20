import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthContext, usePaginationContext } from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { iSchoolStudent } from "../../../shared/interfaces";
import { DialogRemoveStudent, TableStudentSchool } from "../components";
import sortArray from "sort-array";
import { apiSchoolRetrieve } from "../../../shared/services";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { TabsYear } from "../../../shared/components";

export const ViewStudent = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { listYear } = useAuthContext();
  const { search, order, by, setCount, setIsLoading } = usePaginationContext();
  const [listData, setListData] = useState<iSchoolStudent[]>([]);
  const [index, setIndex] = useState(0);
  const [studentData, setStudentData] = useState<iSchoolStudent>();

  const handleStudent = (newStudent: iSchoolStudent) =>
    setStudentData(newStudent);

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setIndex(Number(newValue));
  };

  const getStudent = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true);
        apiSchoolRetrieve
          .student(school_id, query)
          .then((res) => {
            setListData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [school_id]
  );

  const queryData = useMemo(() => {
    return `&year_id=${listYear[index].id}`;
  }, [index, listYear]);

  useEffect(() => {
    let query_data = queryData;
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getStudent(query_data);
      });
    } else getStudent(query_data);
  }, [queryData, search]);

  const table = useMemo(() => {
    let listStundet: iSchoolStudent[];

    if (order === "class_name")
      listStundet = sortArray<iSchoolStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      });

    listStundet = sortArray<iSchoolStudent>(listData, {
      by: order,
      order: by,
    });

    return (
      <TableStudentSchool data={listStundet} handleStudent={handleStudent} />
    );
  }, [by, listData, order]);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <TabsYear value={index} handleChange={handleChange} />
        <Box flex={1}>{table}</Box>
      </Box>
      {studentData && (
        <DialogRemoveStudent student={studentData} getStudent={getStudent} />
      )}
    </>
  );
};
