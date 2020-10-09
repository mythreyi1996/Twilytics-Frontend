import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import "./news.css";
import "./contacts.css"

class News extends React.Component {
    
    state = {
      newsData: {},
      people : [],
      UrlLink : "No news to Display",
      Data:{}
    };

    static defaultProps = {
        displayTitle:true,
        displayLegend:true,
        lengendPosition:'right'
    }

    constructor(props){
   
        super(props);
        this.state = {
        newsData :{},
        }
        this.state = {
            people : [{
                news: "No News",
                url: ""
            }]
        }           
    }

    componentDidMount() { 
        this.setState({})
    }

    Processing =  () => {

        var count = 0
        var people = [];
        var news = [];
        var urls = []
        if(this.props.newsData !=  undefined ) {
        for(var i = 0; i < this.props.newsData.length - 1; i++) {
            if(count < 10) {
            var obj = this.props.newsData[i];
            if(obj["numberOfArticles"] > 0) {
             news = obj.news;
             urls = obj.news_url;

                for (var j =0 ; j<5; j++) {
                    if(news[j] != null) {
                        count = count + 1
                        people.push({
                            news: news[j],
                            url: urls[j]
                        });
                    }
                }
        }
    }
    }
    if(count < 1) {
        alert("No news articles found")
    }
}
    this.setState({
        people : people})

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.contacts !== prevState.newsData) {
            return { newsData: nextProps.contacts };
        }
        return null;
    }

    render(){
            return (
            <div className="news">
            <div news_button>
            </div>
            <div className='news_cardWrapper'>
            {this.state.people.map((person, index) => (
            <div className="news_card" key={index}>
               <div className = "card-title">
                  <news_cardWrapper className="link_button" onClick={()=> window.open(`${person.url}`)} > {person.news} </news_cardWrapper>
               </div>
            </div>
            ))}
            </div>
            </div>
        )
    }
}

ReactDOM.render(<News />, document.getElementById("root"));
export default News;