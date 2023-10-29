'use client'

import axios, { AxiosError } from 'axios'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { CiCircleInfo } from 'react-icons/ci'
import { z } from 'zod'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import 'easymde/dist/easymde.min.css'

import { createIssueSchema } from '@/app/api/issues/route'
import { Request } from '@/app/types/IRequest'
import { Issue } from '@prisma/client'

import EditIssueLoading from './loading'

type TForm = z.infer<typeof createIssueSchema>

type EditIssuePageProps = {
  params: { id: string }
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const EditIssuePage: React.FC<EditIssuePageProps> = ({ params: { id } }) => {
  const [err, setErr] = useState<string | undefined>(undefined)
  const { data: issueData, isLoading, error } = useSWR<Request<Issue>>(`/api/issues/${id}`, fetcher)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TForm>({
    defaultValues: {
      title: '',
      description: ''
    },
    resolver: zodResolver(createIssueSchema)
  })
  const router = useRouter()

  const onSubmit = async (data: TForm) => {
    try {
      const res = await axios.put<Request<Issue>>(`/api/issues/${issueData?.data.id}`, { ...data })
      toast.success(`${res.data.message}`)
      reset()
      router.push(`/issues/${issueData?.data.id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message ?? error.message)
      } else if (error instanceof Error) {
        setErr(error.message)
      } else {
        setErr('An Unexpected Error Has Occured!')
      }
    } finally {
      setTimeout(() => setErr(undefined), 3500)
    }
  }

  useEffect(() => {
    setValue('title', issueData?.data.title ?? '')
    setValue('description', issueData?.data.description ?? '')
  }, [issueData])

  if (isLoading) {
    return <EditIssueLoading />
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="max-w-screen-sm space-y-4 mx-auto">
      {err && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CiCircleInfo size={20} />
          </Callout.Icon>
          <Callout.Text>{err}</Callout.Text>
        </Callout.Root>
      )}
      <div>
        <TextField.Root size={'3'}>
          <TextField.Input
            placeholder="Title"
            {...(errors.title?.message && { variant: 'soft', color: 'red' })}
            {...register('title')}
          />
        </TextField.Root>
        <p className="mt-2 text-sm text-red-600 font-medium">{errors.title?.message}</p>
      </div>

      <div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} ref={null} />}
        />
        <p className="mt-2 text-sm text-red-600 font-medium">{errors.description?.message}</p>
      </div>
      <Button size={'3'} disabled={isSubmitting}>
        Save Issue
      </Button>
    </form>
  )
}

export default EditIssuePage
