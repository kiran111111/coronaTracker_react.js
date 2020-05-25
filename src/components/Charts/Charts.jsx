import React,{useEffect,useState} from 'react'
import {fetchDailyData} from "../../api/index"
import { Line, Bar } from 'react-chartjs-2';
import styles from "./Charts.module.css"


export default function Charts({data: { confirmed, recovered, deaths },country}) {

 console.log(country)

 const [dailyData,setDailyData] = useState([])

 useEffect(()=>{
   const fetchAPI = async () => {
    setDailyData(await fetchDailyData());
   }
   fetchAPI()
   console.log(dailyData)
 },[])

 if(dailyData.length ===0){
  return "coming"
 }


 const lineChart = (
  dailyData[0] ? (
   <Line 
    data = {{
      labels: dailyData.map(data => data.date),
      datasets : [{
       data: dailyData.map((data) => data.confirmed),
       label: 'Infected',
       borderColor: '#3333ff',
       fill: true,
      },
      {
       data:dailyData.map(data => data.deaths),
       label:'Deaths',
       borderColor:'red',
       backgroundColor:'rgba(255, 0, 0, 0.5)',
       fill:true,
      }
     ]
    }}
   /> 
  ): null
 )

 const barChart = (
  confirmed ?(
   <Bar 
   data = {{
    labels:['Confirmed','Recovered','Deaths'],
    datasets : [{
     label: 'People',
     data: [confirmed.value, recovered.value, deaths.value],
     backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
     fill: true,
         }]  
      }}
   />
  ) : null
 )

 let  chart = lineChart;
 if(country){
   chart = barChart
 }
 

 return (
  <div className={styles.container}>
     {chart}
   </div>
  )
}