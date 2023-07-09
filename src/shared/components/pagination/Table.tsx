import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { usePaginationContext } from "../../contexts";
import { useMemo, useState } from "react";

interface iPaginationTableProps {
  onClick: () => void;
}

export const PaginationTable = ({ onClick }: iPaginationTableProps) => {
  const { face, take, count, isLoading } = usePaginationContext();
  const [disabled, setDisabled] = useState(false);

  const total = useMemo(() => {
    const base = face * take;
    if (base > count) {
      setDisabled(true);
      return count;
    }
    setDisabled(false);
    return base;
  }, [count, face, take]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={2}
    >
      <Typography>
        {total}/{count}
      </Typography>
      <LoadingButton
        variant="contained"
        disableElevation
        loading={isLoading}
        loadingPosition="end"
        endIcon={<KeyboardArrowDown />}
        disabled={disabled}
        onClick={onClick}
      >
        Carregar mais
      </LoadingButton>
    </Box>
  );
};
