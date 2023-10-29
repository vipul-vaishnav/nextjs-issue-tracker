'use client'

import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { CiCircleInfo } from 'react-icons/ci'
import { z } from 'zod'
import toast from 'react-hot-toast'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import 'easymde/dist/easymde.min.css'

import { createIssueSchema } from '@/app/api/issues/route'
import { Request } from '@/app/types/IRequest'
import { Issue } from '@prisma/client'

type TForm = z.infer<typeof createIssueSchema>

type NewIssuePageProps = {}

const NewIssuePage: React.FC<NewIssuePageProps> = () => {
  const [err, setErr] = useState<string | undefined>(undefined)
  const {
    register,
    control,
    handleSubmit,
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
      const res = await axios.post<Request<Issue>>('/api/issues', { ...data })
      toast.success(`${res.data.message} with Id ${res.data.data.id}`)
      reset()
      router.push('/issues')
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
        Submit New Issue
      </Button>
    </form>
  )
}

export default NewIssuePage
