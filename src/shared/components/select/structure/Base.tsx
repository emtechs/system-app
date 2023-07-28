import { ReactNode } from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
} from '@mui/material'
import { iChildren } from '../../../interfaces'
import { PaginationList } from '../../pagination'
import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'

interface iBaseProps extends iChildren {
  card: ReactNode
  open: boolean
  title: string
  name: string
  label: string
  loading: boolean
  options?: unknown[]
  validate: ReactNode
}

export const Base = ({
  card,
  children,
  label,
  loading,
  name,
  open,
  title,
  validate,
  options,
}: iBaseProps) => {
  return (
    <>
      {card}
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <List sx={{ p: 0 }}>
          <Divider component="li" />
          <ListItem>
            <Box width="100%">
              <FormContainer>
                <AutocompleteElement
                  name={name}
                  label={label}
                  loading={loading}
                  options={
                    options || [
                      {
                        id: 1,
                        label: `No momento, não há nenhuma ${label.toLowerCase()} cadastrada`,
                      },
                    ]
                  }
                  textFieldProps={{ fullWidth: true }}
                />
                {validate}
              </FormContainer>
            </Box>
          </ListItem>
          <Divider component="li" />
          {children}
          <PaginationList />
        </List>
      </Dialog>
    </>
  )
}
