import * as React from 'react'
import { Alert, Button } from 'antd'
import { ApolloError } from '@apollo/client'
import { AlertWrapper } from '../Page'

type Props = {
  refetch?: (...args: any) => void
  error?: ApolloError
  loading?: boolean
}

export const NetworkAlert: React.FC<Props> = ({ loading, refetch, error }) =>
  error ? (
    <AlertWrapper>
      <Alert
        message="Network error while fetching data"
        description={error.message}
        type="error"
        action={
          refetch ? (
            <Button disabled={loading} size="small" danger onClick={() => refetch()}>
              Retry
            </Button>
          ) : null
        }
      />
    </AlertWrapper>
  ) : null
