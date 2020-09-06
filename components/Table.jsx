import React, { Component } from 'react'
import MaterialTable from 'material-table';
import Head from 'next/head';
export default class Table extends Component {
    render() {
        const {data}= this.props;
        
        const columns = [
            { title: 'Date', field: 'Date'  ,},

            { title: 'Active', field: 'Active' ,},

            { title: 'Confirmed', field: 'Confirmed' , },

            { title: 'Deaths', field: 'Deaths',  },
            { title: "Recovered", field: 'Recovered',},
        ];
        const options = {
            pageSize: 20,
            pageSizeOptions: [5,10,20,30,40,50],
            headerStyle: {backgroundColor: '#507091',color: '#FFF'},
            cellStyle: {backgroundColor: '#395168',color: '#FFF'},
            draggable: false,
        }
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                <div className="w100">

                    <MaterialTable
                        title="Total Cases by day"
                        columns={columns}
                        data={data}
                        options={options}        
                    />
                </div>
                <style  jsx>{`
                    .w100{
                        width: 1280px;
                    }
                    :global(.MuiToolbar-root){
                        background-color: #45617D;
                        color: #fff;
                    }
                    :global(.MuiToolbar-root span){
                        color: #fff;
                    }
                `}</style>
               </> 
        )
    }
}
