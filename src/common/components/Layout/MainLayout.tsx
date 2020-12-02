import * as React from 'react'
import { Breadcrumb, Layout } from 'antd'
import {
  ContentWrapper,
  LayoutWrapper,
  LogoText,
  LogoWrapper,
  StyledBreadcrumb,
  StyledContent,
  StyledFooter,
  StyledHeader,
} from './MainLayoutStyled'

type Props = {
  breadcrumbs?: {
    to: string
    name: string
    active?: boolean
  }[]
}

export const MainLayout: React.FC<Props> = ({ children }) => (
  <LayoutWrapper>
    <StyledHeader>
      <LogoWrapper>
        <LogoText strong>Blockchain Explorer</LogoText>
      </LogoWrapper>
    </StyledHeader>
    <Layout>
      <ContentWrapper>
        <StyledBreadcrumb>
          <Breadcrumb.Item>Explorer</Breadcrumb.Item>
          <Breadcrumb.Item>Block</Breadcrumb.Item>
        </StyledBreadcrumb>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>© 2020 Igor Matias</StyledFooter>
      </ContentWrapper>
    </Layout>
  </LayoutWrapper>
)
