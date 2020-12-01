import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { MainLayout } from '../../../common/components/Layout'

const GET_BLOCK = gql`
  query GetBlock($hash: Hash!) {
    block(date: $date) {
      height
      hash
      time
    }
  }
`

export const BlocksSingleRoute: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BLOCK, {
    variables: { hash: '2020-11-30' },
  })

  console.log('DATA', loading, error, data)

  if (loading) return null
  if (error) return <>Error! {error}`</>

  return (
    <MainLayout>
      <div>{data.blocks.length}</div> Content
    </MainLayout>
  )
}
