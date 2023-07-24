import React from 'react';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools'; // react-query devtools

function App() {
  return (
    <>
      <Router />
      <ReactQueryDevtools />
    </>
  );
}
export default App;
