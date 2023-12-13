import React, { useState } from 'react';
import { Menu } from 'antd';
import { useEffect } from 'react';
import { navigateToUrl } from 'single-spa';

const items = [
  {
    label: 'React MFE',
    key: '#/react_mfe',
  },
  {
    label: 'Vue MFE',
    key: '#/vue_mfe',
  },
  {
    label: 'Svelte MFE',
    key: '#/svelte_mfe',
  },
];


const App = () => {
  const [current, setCurrent] = useState('react_mfe');
  useEffect(() => {
    setCurrent('#/vue_mfe');
    navigateToUrl('#/vue_mfe')
  }, [])
  const onClick = (e) => {
    setCurrent(e.key);
    navigateToUrl(e.key)
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default App;