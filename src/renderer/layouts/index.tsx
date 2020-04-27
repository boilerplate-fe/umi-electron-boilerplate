import React from 'react';
import { Layout, Menu } from 'antd';

export default () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider>
        <Menu theme="dark"></Menu>
      </Layout.Sider>
    </Layout>
  );
};
