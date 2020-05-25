import React,{useEffect,useState} from 'react'
import styles from './CountryPicker.module.css';
import {fetchCountries} from "../../api/index";
import { NativeSelect, FormControl ,InputLabel} from '@material-ui/core';

export default function CountryPicker({handleCountryChange}) {

 const [countries,setCountries] = useState([])
 
 // only run when the countries array changes
 // useEffect hook only returns a function
 useEffect(() =>{
   const fetchAPI = async () => {
     setCountries(await fetchCountries())
   }
   fetchAPI();
 },[])

 

 return (
  <div>
    <FormControl className={styles.formControl} >
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">Global</option>
          { countries.map((country,index) => 
            <option key={index}>{country.name}</option>
           )} 
         
        </NativeSelect>
      </FormControl> 
    
  </div>
 )
}
