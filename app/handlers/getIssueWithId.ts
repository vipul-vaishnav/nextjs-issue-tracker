import { Issue } from '@prisma/client'
import { QueryKey } from '@tanstack/react-query'
import axios from 'axios'
import { Request } from '../types/IRequest'

export const getIssueWithId = (id: string): Readonly<[QueryKey, () => Promise<Request<Issue>>]> => {
  const queryKey = [id, 'IssueId']
  const queryFunc = async () => {
    const res = await axios.get<Request<Issue>>(`/api/issues/${id}`)
    return res.data
  }

  return [queryKey, queryFunc] as const
}
