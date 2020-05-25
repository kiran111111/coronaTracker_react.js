import React from 'react';
import styles from './App.module.css';
import image from "./images/covid.png"
import fetchData from "./api/index"
import Charts from "./components/Charts/Charts"
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      countri :""
    }
  }

  // All the fetched data is undefined OK !  so you need to resolve the 
  // the promise by awaiting for it and gettig it .
  async componentDidMount(){
    const fetchedData = await  fetchData();
    this.setState({
      data:fetchedData
    })
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({
      data : data,
      countri: country
    })
  }


  render(){
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>COVID-19</h2>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards  data={this.state.data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={this.state.data} country={this.state.countri}/>
      </div>
    );
  }
}

export default App;


// Note : The app will be the class component
// Rest all will be the functional component