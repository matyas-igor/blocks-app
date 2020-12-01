import * as React from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import { ApartmentOutlined, NodeExpandOutlined } from '@ant-design/icons'
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

const { Sider } = Layout

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
        <LogoText strong>Blockchain</LogoText>
      </LogoWrapper>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Explorer</Menu.Item>
      </Menu>
    </StyledHeader>
    <Layout>
      <Sider width={200}>
        <Menu mode="inline" selectedKeys={['1']} style={{ height: '100%' }}>
          <Menu.Item key="1" icon={<ApartmentOutlined />}>
            Blocks
          </Menu.Item>
          <Menu.Item key="2" icon={<NodeExpandOutlined />}>
            Transactions
          </Menu.Item>
        </Menu>
      </Sider>
      <ContentWrapper>
        <StyledBreadcrumb>
          <Breadcrumb.Item>Blocks</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </StyledBreadcrumb>
        <StyledContent>{children}</StyledContent>
        <StyledFooter>© 2020 Igor Matias</StyledFooter>
      </ContentWrapper>
    </Layout>
  </LayoutWrapper>
)
