import { Box, Card, useTheme } from "@mui/material";
import { useAppThemeContext } from "../../contexts";
import { CardSchoolContent } from "./CardSchoolContent";
import { iSchool } from "../../interfaces";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../services";

interface iCardSchoolIdProps {
  school_id: string;
}

export const CardSchoolId = ({ school_id }: iCardSchoolIdProps) => {
  const theme = useTheme();
  const { setLoading } = useAppThemeContext();
  const [data, setData] = useState<iSchool>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iSchool>(`schools/${school_id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [school_id]);

  return data ? (
    <Box mx={2} width={theme.spacing(45)} maxWidth="90%">
      <Card>
        <CardSchoolContent school={data} />
      </Card>
    </Box>
  ) : (
    <></>
  );
};
