import React from 'react';
import { useFetch } from '@shihengtech/hooks';
import { extend } from 'umi-request';

export default () => {
  const request = useFetch(() => extend({}).get('/api/TestService/hello'), []);
  return <div style={{ padding: 20 }}>{request.data}</div>;
};
