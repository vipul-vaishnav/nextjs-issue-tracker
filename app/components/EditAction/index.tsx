import React from 'react'
import NextLink from 'next/link'
import { Button } from '@radix-ui/themes'
import { LiaEditSolid } from 'react-icons/lia'

type EditActionProps = {
  id: number
}

const EditAction: React.FC<EditActionProps> = ({ id }) => {
  return (
    <NextLink href={`/issues/${id}/edit`}>
      <Button size="3">
        <LiaEditSolid size={20}/>
        Edit Issue
      </Button>
    </NextLink>
  )
}
export default EditAction
