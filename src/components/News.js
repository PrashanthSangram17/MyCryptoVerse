import React,{useState} from 'react'
import {Select, Typography,Row,Col,Card} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text,Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {

  const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 8 : 20 });
  const {data} = useGetCryptosQuery(100);
  console.log(cryptoNews);

  if(!cryptoNews?.value) return 'Loading...';

  return (
    <>
        <Row gutter={[24,24]}>
          { !simplified && (
            <Col span={24}>
              <Select 
                showSearch
                className='select-news'
                placeholder='select a specific crypto'
                optionFilterProp='children'
                onChange={(value)=>setnewsCategory(value)}
                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0} //filtering options to show specific crypto
              >
                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
              </Select>
            </Col>
          )}
            {cryptoNews.value.map((news,i)=>(
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className='news-image-container'>
                          <Title className='news-title' level={4}>{news.name}</Title>
                      </div>
                      <p>
                        {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description }...
                      </p>
                    </a>
                    <div className='provider-container'>
                      <Text className='provider-name'> By {news.provider[0]?.name} </Text>
                      <Text> {moment(news.datePublished).startOf('ss').fromNow()}</Text>
                    </div>
                </Card>
              </Col>
              ))}
        </Row>
    </>
    
  )
}

export default News