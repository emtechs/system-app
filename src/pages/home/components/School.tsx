import {
  Box,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { School as SchoolIcon } from '@mui/icons-material'
import {
  PaginationBase,
  apiUser,
  iSelectBase,
  iWorkSchool,
  useAppThemeContext,
  useAuthContext,
  useDebounce,
  usePaginationContext,
} from '../../../shared'
import { DialogSchool } from './DialogSchool'
import { CardSchool } from './CardSchool'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const School = () => {
  const { debounce } = useDebounce()
  const { smDown, mdDown, theme } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { setCount, query_page } = usePaginationContext()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [listSchoolSelect, setListSchoolSelect] = useState<iSelectBase[]>()
  const [schoolsData, setSchoolsData] = useState<iWorkSchool[]>()
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen(!open)

  const getSchools = useCallback((query: string) => {
    setLoading(true)
    apiUser
      .schools(query)
      .then((res) => {
        setSchoolsData(res.result)
        setListSchoolSelect(res.schools)
        setCount(res.total)
      })
      .finally(() => setLoading(false))
  }, [])

  const take = useMemo(() => {
    if (smDown) {
      return 1
    } else if (mdDown) return 2

    return 3
  }, [smDown, mdDown])

  const query_data = useCallback(
    (comp: string) => {
      return `?year_id=${yearData?.id}&date=${dayjs().format(
        'DD/MM/YYYY',
      )}${comp}${query_page(take, true)}`
    },
    [query_page, take, yearData?.id],
  )

  useEffect(() => {
    let queryData = ''
    if (search) {
      queryData += `&name=${search}`
      debounce(() => {
        getSchools(query_data(queryData))
      })
    } else getSchools(query_data(queryData))
  }, [query_data, search])

  return (
    <>
      <Grid item xs={12} md={9}>
        <Box component={Paper}>
          <Box
            height={theme.spacing(7)}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Typography
              component="div"
              variant="h6"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SchoolIcon />
              Escolas
            </Typography>
            <Box display="flex" gap={2}>
              <Tooltip title="Selecione">
                <IconButton color="primary" onClick={onClose}>
                  <SchoolIcon />
                </IconButton>
              </Tooltip>
              <TextField
                size="small"
                value={search}
                placeholder="Pesquisar..."
                onChange={(e) => setSearch?.(e.target.value)}
              />
            </Box>
          </Box>
          <Divider />
          <Box p={1}>
            <Grid container spacing={2}>
              {loading ? (
                <Grid item xs={12}>
                  <LinearProgress variant="indeterminate" />
                </Grid>
              ) : schoolsData && schoolsData.length > 0 ? (
                schoolsData.map((el) => (
                  <Grid key={el.school.id} item xs={12} sm={6} md={4}>
                    <CardSchool school={el.school} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Nenhuma escola encotrada
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          <PaginationBase />
        </Box>
      </Grid>
      <DialogSchool
        open={open}
        onClose={onClose}
        listSchoolSelect={listSchoolSelect}
      />
    </>
  )
}
