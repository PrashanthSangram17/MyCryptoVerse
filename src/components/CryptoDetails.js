import React,{useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, NumberOutlined,TrophyOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

import LineChart from './LineChart';

const {Title,Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId}=useParams();  //take param from url
  const [timeperiod, setTimeperiod] = useState('7d'); //for the charts
  const {data,isFetching} = useGetCryptoDetailsQuery(coinId)
  const {data:coinHistory} = useGetCryptoHistoryQuery({coinId,timeperiod})
  
  if (isFetching) return 'Loading...';

  const cryptoDetails = data?.data?.coin;  //getting elaborate data from the coin

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },

    { title: 'Market Cap', value: `$${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high', value: `$${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
  
    { title: 'Total Supply', value: `$${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  console.log(cryptoDetails); 
  console.log(coinHistory);
  return (
    <Col className='coin-detail-container'>

      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      
      <Select defaultValue='7d' 
      className='select-timeperiod' 
      placeholder='select time period' 
        onChange={(value)=>setTimeperiod(value)}>
            {time.map((date)=><Option key={date}>{date}</Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>
      
      <Col className='stats-container'>
        <div className='top-part'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statics-heading'>
            <Title level={3} className='coin-details-heading'>{cryptoDetails.name} statistics.</Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}.
            </p>
          </Col>
          {stats.map(({icon,title,value})=>
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>)}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statics-heading'>
            <Title level={3} className='coin-details-heading'>Other statistics.</Title>
            <p>
              An overview showing the stats of all Cryptocurrencies.
            </p>
          </Col>
          {genericStats.map(({icon,title,value})=>
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>)}
        </Col>
        </div>

        <Col className='coin-desc-link'>
          <Row className='coin-desc'>
            <Title level={3} className='coin-details-heading'> 
              What is {cryptoDetails.name}? <br/> <br/>
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className='coin-links'>
            <Title level={5} className='coin-details-heading'>
              Find some useful {cryptoDetails.name} links below.
            </Title>
            {cryptoDetails.links.map((link)=>
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>)}
          </Col>
        </Col>
        
        

      </Col>
    </Col>
  )
}

export default CryptoDetails