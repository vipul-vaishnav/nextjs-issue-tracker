import axios from 'axios'
import { Request } from '../types/IRequest'
import { Issue } from '@prisma/client'

export interface Payload {
  userId: string | null
  issueId: number
}

export const assignReq = async (payload: Payload) => {
  const res = await axios.put<Request<Issue>>(`/api/issues/${payload.issueId}`, {
    assignedToUserId: payload.userId
  })
  const data = res.data
  return data
}
