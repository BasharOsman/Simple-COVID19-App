import React, {useState} from 'react'

export default function Search(props) {
    const {placeholder, data, field, onChange } = props;

    const onInputChange = (e)=>{
        const value = e.target.value.toLowerCase();
        const searchValues = data.filter((search)=>{
          return search[field].toLowerCase().indexOf(value) >=0;
        });
        
        onChange(searchValues)
      }
    return (
    <>
        <input type="text" className="searchInput" placeholder={placeholder} onChange={onInputChange} />
        <style jsx>{`
            .searchInput{
            width: 100%;
            padding: 1.5rem;
            height: 50px;
            border-radius: 10px;
            outline: none;
            }
            `}</style>
    </>
    )
}
