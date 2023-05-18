import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../../shared/components";
import { useAppThemeContext, useSchoolContext } from "../../../shared/contexts";
import { Link } from "react-router-dom";
import { People } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../../shared/services";
import { iFrequency, iPageProps } from "../../../shared/interfaces";

export const ListFrequencyAdm = ({ back }: iPageProps) => {
  const { setLoading } = useAppThemeContext();
  const { setFrequencyData } = useSchoolContext();
  const [data, setData] = useState<iFrequency[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iFrequency[]>("frequencies?status=OPENED")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <BasePage isProfile back={back}>
      {data &&
        data.map((frequency) => (
          <Card
            key={frequency.id}
            sx={{
              width: "100%",
              height: 80,
              maxWidth: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/frequency/retrieve">
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setFrequencyData(frequency)}
              >
                <CardContent sx={{ display: "flex", gap: 2 }}>
                  <People />
                  <Typography>{frequency.date}</Typography>
                  <Typography>{frequency.class.name}</Typography>
                </CardContent>
              </button>
            </Link>
          </Card>
        ))}
    </BasePage>
  );
};
