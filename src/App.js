import React, {useEffect} from 'react'
import './App.css';
import Main from './components/main';
import { useDispatch, useSelector } from 'react-redux';
import {initWeb3} from './state/ui/index'

function App() {

 
  const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle;
  });

const dispatch = useDispatch()
useEffect(() => {
dispatch(initWeb3())


  return () => {
  
  }
}, [toggle])

  return (
    <div >
      <Main></Main>
    </div>
  );
}

export default App;
