import { User } from '@prisma/client'
import { QueryKey } from '@tanstack/react-query'
import axios from 'axios'
import { Request } from '../types/IRequest'

export const getUsers = (): Readonly<[QueryKey, () => Promise<Request<User[]>>]> => {
  const queryKey: QueryKey = ['Users']
  const queryFunc = async () => {
    const res = await axios.get<Request<User[]>>(`/api/users`)
    return res.data
  }

  return [queryKey, queryFunc] as const
}
