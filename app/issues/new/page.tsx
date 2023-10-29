'use client'

import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

interface IssueForm {
  title: string
  description: string
}

type NewIssuePageProps = {}

const NewIssuePage: React.FC<NewIssuePageProps> = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const router = useRouter()

  const onSubmit = async (data: IssueForm) => {
    const res = await axios.post('/api/issues', { ...data })

    router.push('/issues')
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="max-w-screen-sm space-y-4">
      <TextField.Root size={'3'}>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button size={'3'}>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
