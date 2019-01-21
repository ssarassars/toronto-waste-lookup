import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./searchbar.css";

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      filtered: [],
      keyword: "",
      saved: [],
      favorited: []
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`
      )
      .then(res => {
        const allData = res.data;
        this.setState({ allData });
        let filteredData = this.filter(allData);
        console.log(filteredData);
      });
  }

  filter(allData) {
    var dataGlobal = {};
    for (var elem of allData) {
      let keywords = elem.keywords.split(",");
      for (var key of keywords) {
        if (dataGlobal[key]) {
          dataGlobal[key].push({ title: elem.title, body: elem.body });
        } else {
          dataGlobal[key] = [{ title: elem.title, body: elem.body }];
        }
      }
    }
    return dataGlobal;
  }

  //this.setState({filtered: this.state.allData.filter(item => item.keywords.includes(this.state.keyword.toLowerCase()))})

  searchHandler(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  buttonSearch() {
    if (keyword.trim() == "") {
    } else {
      this.setState({
        keyword: event.target.value
      });
      searchingFor(keyword);
    }
  }

  handleFavorite(ad) {
    // for(let i = 0; i < this.state.favorited.length; i++){
    //   if(this.state.favorited[i].title === ad.title){
    //     return (<span className="fa fa-star checked"></span>)
    //   }else{
    return <span className="fa fa-star" />;
    //   }
    // }
  }
  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  searchingFor(keyword) {}

  render() {
    return (
      <div className="result">
        <div className="flex-container">
          <form>
            <input
              type="text"
              className="searchterm"
              placeholder="Search..."
              onChange={this.searchHandler}
            />
          </form>
          <button
            type="submit"
            onClick={this.buttonSearch}
            className="searchButton"
          >
            <i className="fa fa-search fa-rotate-90" />
          </button>
        </div>
        <ul>
          {this.state.allData.map(ad => (
            <li key={ad.title}>
              <div className="displayresult">
                <div className="column left">
                  <button>{this.handleFavorite(ad)}</button>
                </div>
                <div className="column middle">{ad.title}</div>
                <div
                  className="column right"
                  dangerouslySetInnerHTML={{ __html: this.htmlDecode(ad.body) }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}