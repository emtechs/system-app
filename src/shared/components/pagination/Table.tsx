import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { usePaginationContext } from "../../contexts";

interface iPaginationTableProps {
  total: number;
  onClick: () => void;
}

export const PaginationTable = ({ onClick, total }: iPaginationTableProps) => {
  const { count, isLoading } = usePaginationContext();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={2}
    >
      {isLoading ? (
        <Typography>
          <Skeleton width={50} />
        </Typography>
      ) : (
        <Typography>
          {total}/{count}
        </Typography>
      )}
      <LoadingButton
        variant="contained"
        disableElevation
        loading={isLoading}
        loadingPosition="end"
        endIcon={<KeyboardArrowDown />}
        disabled={count === total}
        onClick={onClick}
      >
        Carregar mais
      </LoadingButton>
    </Box>
  );
};
