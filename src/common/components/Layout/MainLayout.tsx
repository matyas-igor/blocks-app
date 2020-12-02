import React from 'react'
import { Link } from 'react-router-dom'
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
} from './MainLayout.styled'

type Props = {
  breadcrumbs: {
    to: string
    name: string
    active?: boolean
  }[]
}

export const MainLayout: React.FC<Props> = ({ breadcrumbs, children }) => (
  <LayoutWrapper>
    <StyledHeader>
      <LogoWrapper>
        <LogoText strong>Blockchain Explorer</LogoText>
      </LogoWrapper>
    </StyledHeader>
    <Layout>
      <ContentWrapper>
        <StyledBreadcrumb>
          {breadcrumbs.map(({ to, name, active }, index) => (
            <Breadcrumb.Item key={index}>{active ? name : <Link to={to}>{name}</Link>}</Breadcrumb.Item>
          ))}
        </StyledBreadcrumb>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>© 2020 Igor Matias</StyledFooter>
      </ContentWrapper>
    </Layout>
  </LayoutWrapper>
)
