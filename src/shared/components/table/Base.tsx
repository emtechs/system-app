import { useMemo } from 'react'
import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from '@mui/material'
import {
  iTable,
  usePaginationContext,
  iLinkComp,
  TableCellLink,
  useParamsContext,
} from '../../../shared'
import { TableSort } from './Sort'

export const TableBase = ({
  message,
  children,
  headCells,
  link,
  isCount = true,
}: iTable) => {
  const { count } = usePaginationContext()
  const { isLoading } = useParamsContext()

  const msg = useMemo(() => {
    return message || 'Nenhum registro encontrado.'
  }, [message])

  const FooterComp = useMemo(() => {
    if (link) {
      if (isLoading) {
        return (
          <Box width="100%" p={2}>
            <LinearProgress variant="indeterminate" />
          </Box>
        )
      } else if (isCount && count === 0)
        return (
          <Box width="100%" p={2}>
            <Typography color="GrayText" variant="body2">
              {msg}
            </Typography>
          </Box>
        )
    }
    return <></>
  }, [count, isLoading, link, msg])

  const linkComp: iLinkComp = useMemo(() => {
    if (link) return { component: link }
    return {}
  }, [link])

  return (
    <TableContainer
      sx={{ mx: 2, mt: 1, width: 'auto' }}
      component={Paper}
      variant="outlined"
    >
      <Table {...linkComp}>
        <TableSort headCells={headCells} linkComp={linkComp} link={link} />
        <TableBody {...linkComp}>{children}</TableBody>
        {!link && isCount && count === 0 && !isLoading && (
          <caption>{msg}</caption>
        )}
        {!link && (
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCellLink colSpan={headCells.length}>
                  <LinearProgress variant="indeterminate" />
                </TableCellLink>
              </TableRow>
            )}
          </TableFooter>
        )}
      </Table>
      {FooterComp}
    </TableContainer>
  )
}
