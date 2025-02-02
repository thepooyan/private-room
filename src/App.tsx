import type { Component } from 'solid-js';
import ChatView from './components/ChatView';
import ChatInput from './components/ChatInput';
import NavBar from './components/Layout/NavBar';

const App: Component = () => {
  
  return (
    <>
      <NavBar/>
      <ChatView/>
      <ChatInput/>
    </>
  );
};

export default App;
