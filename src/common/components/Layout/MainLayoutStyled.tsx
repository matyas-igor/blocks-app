import styled from 'styled-components/macro'

import { Breadcrumb, Layout, Typography } from 'antd'
import { LIGHT_GREY_COLOR, WHITE_COLOR } from '../../constants/colors'

const { Text } = Typography
const { Header, Footer, Content } = Layout

export const LayoutWrapper = styled(Layout)`
  min-height: 100%;
`
export const ContentWrapper = styled(Layout)`
  padding: 0 24px;
`
export const StyledHeader = styled(Header)`
  padding: 0 45px;
`
export const LogoWrapper = styled.div`
  float: left;
  width: 155px;
`
export const LogoText = styled(Text)`
  color: ${LIGHT_GREY_COLOR};
  font-size: 18px;
`
export const StyledContent = styled(Content)`
  background-color: ${WHITE_COLOR};
  padding: 24px;
  min-width: 800px;
  min-height: 280px;
`

export const StyledFooter = styled(Footer)`
  text-align: center;
`
export const StyledBreadcrumb = styled(Breadcrumb)`
  margin: 24px 0;
`
