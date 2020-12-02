import styled from 'styled-components/macro'

import { Breadcrumb, Layout, Typography } from 'antd'
import { LIGHT_GREY_COLOR, WHITE_COLOR } from '../../constants/colors'

export const LayoutWrapper = styled(Layout)`
  min-height: 100%;
`
export const ContentWrapper = styled(Layout)`
  margin: 0 auto;
  padding: 0 24px;
  width: 1440px;
`

export const LogoWrapper = styled.div`
  float: left;
  width: 180px;
`
export const LogoText = styled(Typography.Text)`
  color: ${LIGHT_GREY_COLOR};
  font-size: 18px;
`
export const StyledContent = styled(Layout.Content)`
  background-color: ${WHITE_COLOR};
  padding: 24px;
  min-width: 800px;
  min-height: 280px;
  border-radius: 4px;
`

export const StyledHeader = styled(Layout.Header)`
  padding: 0 24px;
`
export const StyledFooter = styled(Layout.Footer)`
  text-align: center;
`
export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 24px 0;
`
