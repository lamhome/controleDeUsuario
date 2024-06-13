import React from 'react';
import { Menu, Button, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';

const Header: React.FC = () => {
  const { logout, loginWithRedirect, user } = useAuth0();

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <LogoutOutlined /> Logoff
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="logo">LOGO</div>
      <div className="user-info">
        {user ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" icon={<UserOutlined />}>
              {user.name}
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={() => loginWithRedirect()}>
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;