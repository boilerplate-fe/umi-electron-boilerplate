import React from 'react';
import { Layout, Menu } from 'antd';

const layout: React.FC = ({ children }) => {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider>
        <Menu theme="dark"></Menu>
      </Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default layout;
