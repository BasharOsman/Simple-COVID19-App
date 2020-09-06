import React, { useState } from 'react';
import Head from 'next/head'
import Table from 'comp/Table'
import getDate from 'fun/getDate'
import numbersFormat from 'fun/numbersFormat'
import Link from 'next/link'
const countryEndpoint = process.env.country;

export default class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  async componentDidMount(){
    const {slug} = this.props;
    
    const data = await fetch(`${countryEndpoint}/${slug}`);
    const cases = await data.json();

    this.setState({
      cases,
      isLoading: false,
    });

  }
  render () {
    const { slug } = this.props
    const { cases, isLoading } = this.state
    if(isLoading){return <Head><title>Country: {slug}</title></Head>}
    const {CountryCode} = cases[cases.length - 1];
    const afterDateFormat = cases.map(
      (item)=>{
              const obj = Object.assign({}, item);
              obj.Date = getDate(obj.Date);
              return obj;
          }
      ).sort((a, b)=>{
        var c = new Date(a.Date);
        var d = new Date(b.Date);

        return d-c;
      });
      const totalData = cases.reduce((a, b) => ({
        Active: b.Active,
        Confirmed: b.Confirmed,
        Deaths: b.Deaths,
        Recovered:b.Recovered,
        countryName: b.Country,
        dateOfDay: b.Date
      }))
    const { Active,  Confirmed,  Deaths, Recovered,countryName,dateOfDay } = totalData;

    return (
      <>
        <Head>
          <title>
            Country: {countryName}
          </title>
        </Head>
        <div className="back"> <Link href="/"><a>Return home</a></Link> </div>
        <div className="container dark">
          <div className="toDay">
            <div className="cases">
              <h2>{countryName}</h2>
              <p>Total conformed Cases</p>
              <ul>
                <li>Active: <span>{numbersFormat(Active)}</span></li>
                <li>Confirmed: <span className="gray">{numbersFormat(Confirmed)}</span></li>
                <li>Date: <span>{getDate(dateOfDay)}</span></li>
                <li>Deaths: <span className="red">{numbersFormat(Deaths)}</span></li>
                <li>Recovered: <span className="green">{numbersFormat(Recovered)}</span></li>
              </ul>
            </div>
            <div className="image">
              <img src={`/static/flags/${CountryCode}.png`} alt={slug} width="160" height="100"/>
            </div>
          </div>
          <div>
          <Table data={afterDateFormat}/>
          </div>
          
        </div>
        <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              max-width: 1280px;
              margin: auto;
            }
            .dark{
              color: #fff;
            }
            ul{
              list-style: none;
              padding: 10px;
              display: flex;
              width: 720px;
              margin: auto;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            ul li{
              width: 100px;
              margin: auto;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            ul li span{
              display: block;
            }
            .toDay{
              display: flex;
              flex-wrap: wrap;
              items-align: center;
              justify-content: space-between;
              width: 960px; 
              margin-top: 1rem;
            }
            .toDay .image{
              flex-grow: 0;
            }
            .toDay .cases{
              flex-grow: 1;
              padding-left: 40px;
            }
            .toDay h2{
              font-size: 2rem;
            }
            .back{
              max-width: 1280px;
              margin: auto;
              padding:  0.5rem;
              color: #0080FF;
            }
            .back:hover{
              text-decoration: underline;
            }
          `}</style>
    </>
    )
  }
}
Country.getInitialProps = ({query}) =>{
  // query.slug
  const {slug}=query;
  return {
     slug,
  }
}