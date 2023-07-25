import { z } from 'zod'

export const MAX_FILE_SIZE = 2 * 1024 * 1024

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const imageSchema = z
  .instanceof(FileList)
  .transform((list) => list.item(0)!)
  .refine((file) => {
    try {
      return file.size <= MAX_FILE_SIZE
    } catch {
      /* empty */
    }
  }, 'A imagem precisa ter no máximo 2Mb')
  .refine((file) => {
    try {
      return ACCEPTED_IMAGE_TYPES.includes(file.type)
    } catch {
      /* empty */
    }
  }, 'Somente esses tipos de imagens são permitidos .jpg, .jpeg, .png e .webp')

export const csvSchema = z
  .instanceof(FileList)
  .transform((list) => list.item(0)!)
  .refine((file) => {
    try {
      return file.size <= MAX_FILE_SIZE
    } catch {
      /* empty */
    }
  }, 'O arquivo precisa ter no máximo 2Mb')
  .refine((file) => {
    try {
      return file.type === 'text/csv'
    } catch {
      /* empty */
    }
  }, 'Somente arquivo .csv é permitido')
