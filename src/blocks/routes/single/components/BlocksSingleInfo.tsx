import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Descriptions, Spin } from 'antd'
import { DescriptionsWrapper, LinkMono, SpinnerContainer, TextMono } from '../../../../common/components/Page'
import { ApolloError } from '@apollo/client'
import { FORMAT_LONG } from '../../../../common/helpers/date'
import { formatValue, getBlockReward } from '../../../../common/helpers/format'

const LABEL_STYLE = { width: 180 }

type Props = {
  block: any
  loading?: boolean
  error?: ApolloError
}

export const BlocksSingleInfo: React.FC<Props> = ({ block, loading, error }) => (
  <Spin tip="Loading..." spinning={loading}>
    {block ? (
      <>
        <DescriptionsWrapper>
          <Descriptions bordered size={'small'} column={1}>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Hash">
              <Link component={LinkMono} to={`/blocks/${block.hash}`}>
                {block.hash}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Previous hash">
              <Link component={LinkMono} to={`/blocks/${block.prev_block}`}>
                {block.prev_block}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Merkle root">
              <TextMono>{block.mrkl_root}</TextMono>
            </Descriptions.Item>
          </Descriptions>
        </DescriptionsWrapper>
        <DescriptionsWrapper>
          <Descriptions bordered size={'small'} column={2}>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Timestamp">
              {moment(block.time * 1000).format(FORMAT_LONG)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Bits">
              {parseInt(block.bits, 10).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Height">
              {block.height.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Size">
              {parseInt(block.size, 10).toLocaleString()} bytes
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Transactions">
              {block.n_tx.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Version">
              0x{parseInt(block.ver, 10).toString(16)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Fee reward">
              {formatValue(block.fee)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Weight">
              {parseInt(block.weight, 10).toLocaleString()} WU
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Block reward">
              {getBlockReward(block.height)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={LABEL_STYLE} label="Nonce">
              {parseInt(block.nonce, 10).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </DescriptionsWrapper>
      </>
    ) : !error ? (
      <SpinnerContainer />
    ) : null}
  </Spin>
)
