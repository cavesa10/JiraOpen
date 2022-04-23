import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui'

interface Props {
  children: React.ReactNode,
  title?: string
}

export const Layout:FC<Props> = ({title="Jira Open",children}) => {
  return (
    <Box sx={{ flexFlow: 1 }} >
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar></Navbar>
      {/* SideBar */}

      <Box sx={{ padding:'10px 20px' }} >
        {children}
      </Box>

    </Box>
  )
}
