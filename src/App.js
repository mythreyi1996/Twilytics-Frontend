import React, { Component } from "react";
import Form from "./Form";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import Chart from "./components/Chart";
import Facets from "./components/facets";
import News from "./components/News";
import {BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import "./App.css";
import "./logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.News = React.createRef();
    this.Chart = React.createRef();
  }


  state = {
    searchKey: "",
    fields: {},
    contacts :[],
    News :{},
    Chart:{},
    facets:{"poiName":[],
    "lang":[],
    "hashtags":[],
    "mentions":[],
    "userLocation":[],
    "additionalProperties":{}},
    facet_query:{"poiName":[],
    "lang":[],
    "hashtags":[],
    "mentions":[],
    "userLocation":[],
    "additionalProperties":{}}
  };


//http://localhost:8080/list?name=Donald

  onChange = updatedValue => {
    this.setState({
        searchKey: updatedValue
    });
  };

  //http://twilytics.us-east-2.elasticbeanstalk.com/list?name=donald 

   /*componentDidMount = async() => {
     await fetch('http://localhost:8080/fetch/fields?name=')
     //await fetch('http://twilytics.us-east-2.elasticbeanstalk.com/fetch/fields?name')
    .then(res => res.json())
     .then((data) => {
       this.setState({ facets: data })
     })
     .catch(console.log)
     console.log(this.state.facets)
   }*/

   componentDidMount = async() => {
    console.log(this.state.facets)
    await fetch('http://localhost:8080/fetch/fields?name=', {
    //  await fetch('http://twilytics.us-east-2.elasticbeanstalk.com/fetch/fields?name' , {
       method: 'POST',
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       },
       body: JSON.stringify(this.state.facet_query)
     })
   .then(res => res.json())
    .then((data) => {
      this.setState({ facets: data })
    })
    .catch(console.log)
    console.log(this.state.facets)
  }

  onSearch = async(search) => {
    await fetch(`http://localhost:8080/query/search?name=${search}`)
    //await fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/query/search?name=${search}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      this.setState({analyse:true})
      console.log(this.state.contacts)
      this.News.current.Processing();
      this.Chart.current.Processing();
    })
    .catch(console.log)

       this.setState({
           searchKey: search
       })
    this.onFacet(search)  
  };

  /*onFacet = async(query) => {
    await fetch(`http://localhost:8080/fetch/fields?name=${query}`)
    //await fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/fetch/fields?name=${query}`)
    .then(res => res.json())
    .then((data) => {
     this.setState({ facets: data })
    })
    .catch(console.log)
    console.log("onFacetcalled" + query)
  };*/

  onFacet = async(query) => {
    await fetch(`http://localhost:8080/fetch/fields?name=${query}`, 
    //await fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/fetch/fields?name=${query}` ,
    {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.facet_query)
    }
    )
    //await fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/fetch/fields?name=${query}`)
    .then(res => res.json())
    .then((data) => {
     this.setState({ facets: data })
     
    })
    .catch(console.log)
    console.log("onFacetcalled" + query)
  };

  onFilter = async(query) => {
    console.log(query)
    await fetch(`http://localhost:8080/query/facet?name=${this.state.searchKey}`, {
    //  await fetch(`http://twilytics.us-east-2.elasticbeanstalk.com/query/facet?name=${this.state.searchKey}`, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: query
    }).then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
      this.News.current.Processing();
    })
    .catch(console.log)
    console.log("onFiltercalled") 
    /// Call onfacet after filter is changed
    this.setState({facet_query: query})
    console.log(this.state.facet_query)
    console.log(this.state.searchKey)
    //this.onFacet(this.state.searchKey)
  }

  onDate = (startDate, endDate) => {
    console.log("onDate called")
    fetch('http://localhost:8080/list?name=Donald')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render() {
    const  {searchKey} = this.state;
    return (
      <Router>
      <div className="App">
      <ul>
        <li>
        <NavLink to="/" exact activeStyle = {
          {color:'green'}
        }>Home</NavLink>
        </li>
        <li>
        <NavLink to="/analyse"  exact activeStyle = {
          {color:'green'}
        }>Analyse</NavLink>
        </li>
      </ul>
      <Route path="/" exact strict render = {
        () => {
          return (
          <div className = "App_1"> 
          <Form onChange={this.onChange} onSearch={this.onSearch} />
            <div className = "App-components" > 
              <Facets facets={this.state.facets} onFacet={this.onFacet} onFilter={this.onFilter}/> 
              <Contacts contacts={this.state.contacts} searchKey={searchKey}/>
              <News ref={this.News} newsData={this.state.contacts} />
            </div>
          </div>
          )
        }
       } />
      <Route path="/analyse" exact strict render = {
        () => {
         return (
          <div className = "App_1">
            <Chart ref={this.Chart} chartData={this.state.contacts} />
            </div>
          )
        }
      } />
      </div>
      </Router>
    );
  }
}


export default App;