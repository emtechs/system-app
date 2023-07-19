import { useEffect, useMemo } from "react";
import sortArray from "sort-array";
import {
  useClassContext,
  usePaginationContext,
} from "../../../shared/contexts";
import { iStudent, iViewBaseProps } from "../../../shared/interfaces";
import { TableStudentSchoolClass } from "./TableClassStudent";

export const ViewClassStudent = ({ id }: iViewBaseProps) => {
  const { setIsLoading, order, by } = usePaginationContext();
  const { getStudents, listStudentData } = useClassContext();

  useEffect(() => {
    setIsLoading(true);
    if (id) getStudents(id);
  }, [id]);

  const table = useMemo(() => {
    let students: iStudent[];

    students = sortArray<iStudent>(listStudentData, { by: order, order: by });
    if (order === "class_name")
      students = sortArray<iStudent>(listStudentData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      });

    if (order === "school_name")
      students = sortArray<iStudent>(listStudentData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      });

    return <TableStudentSchoolClass id="" data={students} />;
  }, [by, listStudentData, order]);

  return table;
};
