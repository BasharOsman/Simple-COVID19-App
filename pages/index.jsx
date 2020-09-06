import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import numbersFormat from 'fun/numbersFormat'
import Search from 'comp/Search'
export default function Home({ data:{Countries, Global}, data , location}) {

const [search, setSearch] = useState(Countries)
const {NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered} = Global;

const onInputChange = (searchedData)=>{
  setSearch(searchedData)
}
  return (
    <div className="container dark">
      <Head>
        <title>COVID19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="global">
      <h1>Global Cases</h1>
        <div className="block">
          <span >Total Confirmed: <span className="gray">{numbersFormat(TotalConfirmed)}</span></span>
          <span>Total Deaths: <span  className="red">{numbersFormat(TotalDeaths)}</span></span>
          <span >Total Recovered: <span className="green">{numbersFormat(TotalRecovered)}</span></span>
        </div>
        <div className="block">
          <div >New Confirmed: <span className="gray">{numbersFormat(NewConfirmed)}</span> </div>
          <div >New Deaths: <span className="red">{numbersFormat(NewDeaths)}</span></div>
          <div >New Recovered: <span className="green">{numbersFormat(NewRecovered)}</span></div>
        </div>
      </div>
      <div className="search">
        <h2>Search by Countries</h2>
        <p>Did You Want to Know about <Link href={`countries/${location}`}><button className="btn blue" >{location}</button></Link>?</p>
        <Search placeholder="Search by country" data={Countries} field={"Country"} onChange={onInputChange} />
      </div>
      <div className="countries">
        {search.map(({CountryCode, Country, Slug}, i)=>{
          return (
            <div className="country" key={i}>
              <a href={`countries/${Slug}`}>
                <img src={`/static/flags/${CountryCode.toLowerCase()}.png`} alt={Country} width="160" height="100"/>
              </a> 
              <div className="center countryName">{Country.split("(")[0].split(",")[0]}</div>
            </div>
          )
          })}
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
        
        .countries{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin: auto;
        }
        .country{
          margin: 1rem;
          position: relative;
        }
        .global{
          padding: 1rem;
          width: 100%;
          margin-top: 3rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .global span{
          margin: 1rem;
        }
        .global div{

          font-size: 2rem;
        }
        .global div span{
          font-size: 2.5rem;
          display: block;
        }
        .global h1{
          font-size: 4rem;
        }
        .global .block{
          border: 2px solid green;
          margin: 0.5rem;
        }
        .search{
          width: 100%;
        }
        .search .searchInput{
          width: 100%;
          padding: 1.5rem;
          height: 50px;
          border-radius: 10px;
          outline: none;
        }
        .btn{
          cursor: pointer;
          outline: none;
          background-color: transparent;
          border: 0px solid transparent;
        }
        .center{
          text-align: center;
        }
        
      `}</style>
    </div>
  )
}

const ipEndpoint = process.env.ip;
const summaryEndpoint = process.env.summary;
export async function getStaticProps() {

  const res = await fetch(summaryEndpoint)
  const data = await res.json()

  const local = await fetch(ipEndpoint);
  const json = await local.json();

  return {
    props: {
      data,
      location: json.country,
    },
  }
}