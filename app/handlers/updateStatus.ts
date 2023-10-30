import axios from 'axios'
import { Request } from '../types/IRequest'
import { Issue, Status } from '@prisma/client'

export interface Payload {
  status: Status
  issueId: number
}

export const updateStatus = async (payload: Payload) => {
  const res = await axios.put<Request<Issue>>(`/api/issues/${payload.issueId}`, {
    status: payload.status
  })
  const data = res.data
  return data
}
