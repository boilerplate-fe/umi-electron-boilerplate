import React, { useState, useEffect } from 'react';
import { Button, Space, Calendar } from 'antd';

export default () => {
  const [data, setData] = useState('');
  const [mockData, setMockData] = useState('');
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:10000/api');
      const json = await response.json();
      setData(json.data);
      const mock = await fetch('api/message');
      const mockJSON = await mock.json();
      setMockData(mockJSON.message);
    })();
  }, []);
  return (
    <div style={{ padding: 24, width: 400 }}>
      <Space direction="vertical">
        <Space>
          <Button type="primary">Hello World</Button>
          <Button>Message From Server: {data}</Button>
          <Button>Message From Mock Server: {mockData}</Button>
        </Space>
        <div style={{ width: '100%', border: '1px solid #ccc' }}>
          <Calendar fullscreen={false} />
        </div>
      </Space>
    </div>
  );
};
