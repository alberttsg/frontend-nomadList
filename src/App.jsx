import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { UserContext } from './context/UserState';
import { Login } from './pages/Login/Login';
import { NavBar } from './aaaaa/NavBar/NavBar';
import { SearchBar } from './aaaaa/Header/SearchBar';
import { Routes } from './routes/Routes';
import { ChatLayout } from './components/Chat/components/ChatLayout';
import { CollapseSiderButton } from './aaaaa/Header/CollapseSiderButton';
import { notification, Layout, Row } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './App.scss';
import { Logo } from './aaaaa/Header/Logo';

export const App = () => {
  const { token } = useContext(UserContext);
  const [collapsedSider, setCollapsedSider] = useState(false);
  const siderCollapse = () => { setCollapsedSider(!collapsedSider) };

  useEffect(() => {
    if (token) {
      return notification.success({
        message: `Welcome to Nomad, your social network!`,
      });
    }
  }, [token]);

  return (
    <BrowserRouter>
      {!token ? <Login /> :
        <Layout style={{ minHeight: '100%' }}>
          <Header style={{ background: 'white', position: 'sticky', top: '10px', zIndex: 1, paddingTop: '15px' }}>
            <Row style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              {collapsedSider && <Logo size={30} />}
              <CollapseSiderButton handle={siderCollapse} sider={collapsedSider} />
              <SearchBar />
            </Row>
          </Header>
          <Layout>
            <Sider
              trigger={null}
              collapsed={collapsedSider}
              collapsible
              theme='light'
              breakpoint='lg'
              onBreakpoint={siderCollapse}
              collapsedWidth='0'
              width='30%'
            >
              <NavBar />
            </Sider>
            <Content>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      }
      <ChatLayout />
    </BrowserRouter >
  )
}

