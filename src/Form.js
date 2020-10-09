import React from "react";
import "./App.css";

export default class Form extends React.Component {
  state = {
    search: "",
  };

  change = (e) => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {search} = this.state;
    this.props.onSearch(search);
      // this.setState({
      //     search: ""
      // });
  };

  render() {
    const { search } = this.state;
    return (
      <form className="formWrapper">
        <div className="container">
        <input className="inputClass"
          name="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => this.change(e)}
        />
        <button className="buttonClass" onClick={e => this.onSubmit(e)}>Submit</button>
        </div>
      </form>
    );
  }
}