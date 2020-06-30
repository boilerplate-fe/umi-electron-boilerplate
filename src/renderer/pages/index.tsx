import React, { useState, useEffect } from 'react';
import { Button, Space, Calendar } from 'antd';

export default () => {
  const [data, setData] = useState('');
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:10000/api');
      const json = await response.json();
      setData(json.data);
    })();
  }, []);
  return (
    <div style={{ padding: 24, width: 400 }}>
      <Space direction="vertical">
        <Space>
          <Button type="primary">Hello World</Button>
          <Button>Message From Server: {data}</Button>
        </Space>
        <div style={{ width: '100%', border: '1px solid #ccc' }}>
          <Calendar fullscreen={false} />
        </div>
      </Space>
    </div>
  );
};
