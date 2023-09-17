import { apiUsingNow } from './api'

const createUser = async (data: FormData): Promise<void> => {
  await apiUsingNow.post('images/user', data)
}

export const apiImage = { createUser }
