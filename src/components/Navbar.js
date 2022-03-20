import React from 'react';
import { Link } from 'react-router-dom';
import { Typography,Menu,Avatar } from 'antd';
import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';
import icon from '../images/crypto.png';


const Navbar = () => {
  return (
    <div className='nav-container'>
      
      <div className='logo-container'>
        <Avatar src={icon} size="large"/>
        <Typography.Title level={2} className='logo'>
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>

      <div className='menu-container'>
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined/>}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined/>}>
            <Link to='/cryptocurrencies'>cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined/>}>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      </div>
    
    </div>
  )
}

export default Navbar