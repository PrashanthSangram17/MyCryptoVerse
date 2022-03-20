import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Layout, Typography, Space} from 'antd';
import { Link } from "react-router-dom";
import {Navbar,Homepage,Cryptocurrencies,News,CryptoDetails} from './components'
import './App.css';

function App() {
  return (

    <div className="app">

      <div className="navbar">
        <Navbar/>
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>  {/* Switch is now Routes */}
              <Route exact path='/' element={<Homepage/>}> </Route>
              <Route exact path='/Cryptocurrencies' element={<Cryptocurrencies/>}> </Route>
              <Route path='/coin/:coinId' element={<CryptoDetails/>}> </Route>
              <Route exact path='/news' element={<News/>}> </Route>
            </Routes>
          </div>
        </Layout>
      

        <div className="footer">
          <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
              Crytpoverse.<br/>
              All rights reserved.
          </Typography.Title>

          <Space>  {/* basically a div */}
            <Link to='/'> Home</Link>
            <Link to='/exchanges'> Exchanges</Link>
            <Link to='/news'> News</Link>
          </Space>

        </div>

      </div>
    
    </div>
  );
}

export default App;
