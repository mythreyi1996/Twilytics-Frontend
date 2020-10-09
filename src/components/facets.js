import React from "react";
import "./facets.css";
import cloneDeep from "lodash/cloneDeep";
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

class RenderCalender extends React.Component {
    constructor(props) {
        super(props)
        const date = new Date()
        const startDate = date.getTime()
        this.state = { 
          startDate, // Today
          endDate: new Date(startDate).setDate(date.getDate()),
        }
    }

    onChange = (startDate, endDate) =>{
        this.setState({ startDate, endDate })
        this.props.onChange(startDate, endDate); 
    }

    render() {
      return (
        <div>
        <ReactLightCalendar className="calender" startDate={this.state.startDate} endDate={this.state.endDate} disableDates={date => date > new Date().getTime()} onChange={this.onChange} range displayTime />
        </div>
      );
    }
  }

  class Filter extends React.Component {
    constructor(props) {
        super(props)
        const date = new Date()
        const startDate = date.getTime()
        this.state = { 
        date_check: false,
        startDate, // Today
        endDate: new Date(startDate).setDate(date.getDate())
        }
    }
    onDateChanged(e){
        this.setState({date_check: !this.state.date_check});
    };

    onChange = (startDate, endDate) =>{
      this.setState({ startDate, endDate })
      //this.props.onDate(startDate, endDate); 

      this.props.ondateSubmit(startDate, endDate, "dateFrom", "dateTo")
    }

    render = () => {
        const { startDate, endDate } = this.state
        return (
            <div className = "dateFilter">
            <input type="checkbox" name="Date" checked={this.state.date_check} onChange={e => this.onDateChanged(e)}/> Date <br/>
            {this.state.date_check === true ? <RenderCalender onChange={this.onChange} /> : ""}
            </div>
        )
      }
}  

class Facets extends React.Component {
    state = {
        name: {},
        query: "",
        verified_check:false,
        facet: {
            poiName: [],
            lang: [],
            hashtags: [],
            mentions: [],
            loc: [],
            dateTo:"",
            dateFrom:"",
            verified:""
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.facets !== prevState.name) {
            console.log(nextProps.facets);
            return { name: nextProps.facets };
        }
        return null;
    }

    ondateSubmit = (fieldValue1,fieldValue2,fieldName1,fieldName2) => {
        const facet = cloneDeep(this.state.facet);
        facet[fieldName1] = fieldValue1
        facet[fieldName2] = fieldValue2

        this.setState({
            facet
        });

        this.props.onFilter(JSON.stringify(facet));
    }

    onnameSubmit = (e, fieldValue, fieldName) => {
        const facet = cloneDeep(this.state.facet);
        if (fieldName && fieldValue && facet[fieldName].includes(fieldValue)) {
            const index = facet[fieldName].indexOf(fieldValue);
            if (index > -1) {
                facet[fieldName].splice(index, 1);
            }
        } else  {
            facet[fieldName].push(fieldValue);
        }
        this.setState({
            facet
        });
        console.log(facet)
        this.props.onFilter(JSON.stringify(facet));
    };

    onVerifiedChanged(e){
        this.setState({verified_check: !this.state.verified_check});
        console.log(!this.state.verified_check)
        var verified = !this.state.verified_check
        console.log(verified)
        this.onverified(verified, "verified")
    };

    onverified= (fieldValue, fieldName) => {
        const facet = cloneDeep(this.state.facet);
        facet[fieldName] = fieldValue

        this.setState({
            facet
        });
        console.log(JSON.stringify(facet))
        this.props.onFilter(JSON.stringify(facet));
    };

    onReset = () => {
        this.setState({
            facet:{
                poiName: [],
                lang: [],
                hashtags: [],
                mentions: [],
                loc: [],
                dateTo:"",
                dateFrom:"",
                verified:""
            }
        })
        this.props.onFilter(JSON.stringify(this.state.facet));
    }

    render() {
        const { name, facet } = this.state;
        return (
            <div>
                <div className="facetWrapper">
                    <button className="resetButtonClass" onClick={e => this.onReset(e)}>reset</button>
                </div>
                <div className = "facetCard">
                    <div className = "facetWrapper">
                        <Filter ondateSubmit={this.ondateSubmit} />
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Verified Users</h5>
                        <input type="checkbox" name="Verified" onChange={e => this.onVerifiedChanged(e)}/> Verified <br/>
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Trending Users</h5>
                        {name && name.userScreenName ? (
                            <React.Fragment>
                                {name.userScreenName.map(poi_name => {
                                    const checked = facet.poiName.includes(poi_name);
                                    return (
                                        <div className="facetName"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_name, "poiName")}
                                            />
                                            <span>{poi_name}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>

                    <div className="facetWrapper">
                        <h5 className="header">Languages</h5>
                        {name && name.lang ? (
                            <React.Fragment>
                                {name.lang.map(poi_lang => {
                                    const checked = facet.lang.includes(poi_lang);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_lang, "lang")}
                                            />
                                            <span>{poi_lang}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="facetWrapper">
                        <h5 className="header">Trending Hashtags</h5>
                        {name && name.hashtags ? (
                            <React.Fragment>
                                {name.hashtags.map(poi_hashtag => {
                                    const checked = facet.hashtags.includes(poi_hashtag);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_hashtag, "hashtags")}
                                            />
                                            <span>{poi_hashtag}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                    {/* <div className="facetWrapper">
                        <h5 className="header">Mentions</h5>
                        {name && name.mentions ? (
                            <React.Fragment>
                                {name.mentions.map(poi_mention => {
                                    const checked = facet.mentions.includes(poi_mention);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_mention, "mentions")}
                                            />
                                            <span>{poi_mention}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div> */}
                    <div className="facetWrapper">
                        <h5 className="header">Trending Locations</h5>
                        {name && name.userLocation ? (
                            <React.Fragment>
                                {name.userLocation.map(poi_location => {
                                    const checked = facet.loc.includes(poi_location);
                                    return (
                                        <div className="facetName">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={e => this.onnameSubmit(e, poi_location, "loc")}
                                            />
                                            <span>{poi_location}</span>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default Facets;
