import React, { ComponentPropsWithoutRef } from 'react'
import NextLink from 'next/link'
import { Button } from '@radix-ui/themes'
import { LiaEditSolid } from 'react-icons/lia'

type ButtonProps = ComponentPropsWithoutRef<typeof Button>

type EditActionProps = {
  id: number
} & Omit<ButtonProps, 'id'>

const EditAction: React.FC<EditActionProps> = ({ id, ...restProps }) => {
  return (
    <NextLink href={`/issues/${id}/edit`}>
      <Button size="3" {...restProps}>
        <LiaEditSolid size={20} />
        Edit Issue
      </Button>
    </NextLink>
  )
}
export default EditAction
