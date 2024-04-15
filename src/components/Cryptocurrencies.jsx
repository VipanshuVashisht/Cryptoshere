import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      const filteredData = cryptosList.data.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if(isFetching) return <Loader />

  return (
    <>
       
      {!simplified &&(
        <>
          <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Typography.Title level={2} className="heading">Top ranking Crytocurrencies</Typography.Title>
        </>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, id) => 
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
             <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} />}
                  hoverable
                  >
                    <p>Price: {millify(currency.price)}</p>
                    <p>Daily Change: {millify(currency.change)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                </Card>
             </Link>
          </Col>
        )}
      </Row>
    </>
  )
}

export default Cryptocurrencies;
