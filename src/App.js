import React from 'react';
import './App.css';
import Routes from './components/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
 constructor(props){
   super(props);
 }
render(){
   return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}
}

export default App;

