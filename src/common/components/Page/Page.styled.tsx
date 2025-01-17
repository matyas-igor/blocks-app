import styled from 'styled-components'
import { Typography, Descriptions } from 'antd'

export const AlertWrapper = styled.div`
  margin-bottom: 24px;
`
export const TableWrapper = styled.div`
  margin-bottom: 24px;
`
export const DescriptionsWrapper = styled.div`
  margin-bottom: 24px;
`
export const DescriptionsBlock = styled(Descriptions)`
  margin-bottom: -4px;
`
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 24px;
`

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 84px;
`

export const PageTitle = styled(Typography.Title)`
  margin-top: 0 !important;
`

export const PageText = styled(Typography.Text)`
  font-size: 14px;
`
export const PageParagraph = styled(Typography.Paragraph)`
  font-size: 14px;
`

export const LinkMono = styled(Typography.Link)`
  font-family: monospace, monospace;
`
export const TextMono = styled(Typography.Text)`
  font-family: monospace, monospace;
`
