'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from '@/app/components/Skeleton'

type AuthLinksProps = {
  session: Session | null
  status: 'authenticated' | 'loading' | 'unauthenticated'
}

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  const { session, status } = props

  return (
    <React.Fragment>
      {status === 'loading' && (
        <>
          <div className="w-9 h-9 animate-pulse bg-neutral-300 rounded-full"></div>
          <div className="hidden sm:block">
            <Skeleton width={'5rem'} />
          </div>
        </>
      )}

      {status === 'unauthenticated' && (
        <div className="mr-3">
          <Link href="/api/auth/signin">Sign In</Link>
        </div>
      )}

      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex gap="3" align={'center'} className="cursor-pointer">
              <Image
                width={36}
                height={36}
                className="rounded-full"
                src={session?.user?.image ?? ''}
                alt="user-image"
                referrerPolicy="no-referrer"
              />

              <Text className="hidden sm:block" as="p">
                {session?.user?.name ?? ''}
              </Text>
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </React.Fragment>
  )
}

export default AuthLinks
