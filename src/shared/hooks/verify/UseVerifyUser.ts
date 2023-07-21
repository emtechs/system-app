import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppThemeContext,
  useAuthContext,
  useUserContext,
} from "../../contexts";
import { apiAuth } from "../../services";

export const useVerifyUser = () => {
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setListYear, yearData } = useAuthContext();
  const { setUserSelect } = useUserContext();

  const verifyUser = useCallback((id: string) => {
    setLoading(true);
    apiAuth
      .verify(`?user_id=${id}`)
      .then((res) => {
        setUserSelect(res.select);
        if (res.years) {
          if (res.years.length > 0) {
            setListYear(res.years);
          } else if (yearData) {
            setListYear([yearData]);
          }
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  return { verifyUser };
};
