import React, { useState } from 'react';
import { Typography, Row, Col, Card } from 'antd';import moment from 'moment';
const demoImage = 'https://t3.ftcdn.net/jpg/04/78/07/44/360_F_478074474_AvG7dHjw5jHR5BI5tBPjgve5ZYyX2wTE.jpg';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader'

const { Text, Title } = Typography;

const TruncatedDescription = ({ description, maxLengthInWords }) => {
  const truncateDescription = (description) => {
    const words = description.split(' '); 
    if (words.length > maxLengthInWords) {
      return words.slice(0, maxLengthInWords).join(' ') + '...';
    } else {
      return description;
    }
  };

  return <p>{truncateDescription(description)}</p>;
};

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({ set: simplified ? 'bitcoinist' : 'coindesk' });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.data) return <Loader />;

  return (
    <>
    {!simplified &&(
      <Typography.Title level={2} className="heading">Latest News about Crytocurrencies</Typography.Title>
    )}

    <Row gutter={[24, 24]}>
      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}} src={news?.thumbnail || demoImage} alt=""/>
              </div>

              <TruncatedDescription description={news.description} maxLengthInWords={30} />
 
                <div className="provider-container">
                <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default News;
