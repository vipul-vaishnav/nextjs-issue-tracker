'use client'

import React, { ComponentPropsWithoutRef, useState } from 'react'
import { AlertDialog, Box, Button, Flex, Text } from '@radix-ui/themes'
import { MdDeleteOutline } from 'react-icons/md'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type ButtonProps = ComponentPropsWithoutRef<typeof Button>

type DeleteActionProps = {
  id: number
} & Omit<ButtonProps, 'id'>

const DeleteAction: React.FC<DeleteActionProps> = ({ id, ...restProps }) => {
  const router = useRouter()
  const [err, setErr] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await axios.delete<{ message: string }>('/api/issues/' + id)
      toast.success(`${res.data.message}`)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message ?? error.message)
      } else if (error instanceof Error) {
        setErr(error.message)
      } else {
        setErr('An Unexpected Error Has Occured!')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger className="md:max-w-max">
          <Button size="3" disabled={loading} variant="soft" color="red" {...restProps}>
            {loading ? (
              'Deleting...'
            ) : (
              <>
                <MdDeleteOutline size={20} />
                Delete Issue
              </>
            )}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button disabled={loading} color="red" onClick={handleDelete}>
                {loading ? 'Deleting...' : 'Delete Issue'}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={Boolean(err)}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error While Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            <Box className="space-y-3">
              <Text as="p">{err}</Text>
              <Button onClick={() => setErr(undefined)}>Ok</Button>
            </Box>
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
export default DeleteAction
