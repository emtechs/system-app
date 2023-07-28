import { UploadFile } from '@mui/icons-material'
import { Box, IconButton, InputLabel, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form-mui'

export const InputFile = () => {
  const [fileName, setFileName] = useState('Nenhum arquivo escolhido')
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext()

  const file: FileList = watch('file')

  let message = ''
  let colorError = '#0009'

  try {
    if (errors.file) {
      colorError = '#D91604'
      message = String(errors.file.message)
    }
  } catch {
    /* empty */
  }

  useEffect(() => {
    if (file) {
      if (file[0]) setFileName(file[0].name)
    }
  }, [file])

  return (
    <Box position="relative" marginBottom={2}>
      <Box minWidth={200} display="flex" alignItems="center" gap={1}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            id="file"
            accept="text/csv"
            type="file"
            {...register('file')}
          />
          <UploadFile />
        </IconButton>
        <InputLabel
          htmlFor="file"
          sx={{ cursor: 'pointer', color: `${colorError}` }}
        >
          {fileName}
        </InputLabel>
      </Box>
      {message && (
        <Typography position="absolute" left={15} fontSize={12} color="#D91604">
          {message}
        </Typography>
      )}
    </Box>
  )
}
