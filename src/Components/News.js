import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.state = {
      articles: [],
      totalResult: 0,
      loading: true,
      page: 1,
      category: "",
      search: "",
    };
  }

  isUpdated = false;

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2e4d2725e8a045828ae009920621b633&page=${this.state.page}&pageSize=6`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResult: parseData.totalResults - parseData.articles.length,
      page: 1,
      loading: false,
    });
  }
  componentDidUpdate(prevProp, prevState) {
    if (this.props.category !== this.state.category) {
      this.setState({ category: this.props.category });
      let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=2e4d2725e8a045828ae009920621b633&pageSize=6`;
      this.category(url);
    }
    if (this.state.search != this.props.search) {
      this.setState({ search: this.props.search });
      console.log(this.props.search);
      let url = `https://newsapi.org/v2/top-headlines?q=${this.props.search}&apiKey=2e4d2725e8a045828ae009920621b633&page=${this.state.page}&pageSize=6`;
      console.log(url);
      this.searched(url);
    }
  }

  searched = async (url) => {
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResult: parseData.totalResults - this.state.articles.length,
      loading: false,
    });
    console.log(this.state.totalResult);
  };

  category = async (url) => {
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResult: parseData.totalResults - this.state.articles.length,
      loading: false,
    });
    console.log(this.state.totalResult);
  };

  onclicked = async (where) => {
    let url;
    if (where === "next") {
      url = `https://newsapi.org/v2/top-headlines?${
        this.props.category === "" ? "" : `category=${this.props.category}&`
      }country=in&apiKey=2e4d2725e8a045828ae009920621b633&page=${
        this.state.page + 1
      }&pageSize=6`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?${
        this.props.category === "" ? "" : `category=${this.props.category}&`
      }country=in&apiKey=2e4d2725e8a045828ae009920621b633&page=${
        this.state.page - 1
      }&pageSize=6`;
    }
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    if (where === "next") {
      this.setState({
        articles: parseData.articles,
        loading: false,
        page: this.state.page + 1,
        totalResult: this.state.totalResult - parseData.articles.length,
      });
    } else {
      this.setState({
        articles: parseData.articles,
        loading: false,
        page: this.state.page - 1,
        totalResult: this.state.totalResult + this.state.articles.length,
      });
    }
    console.log(this.state.totalResult);
  };

  render() {
    return (
      <div className="container text-center my-3">
        <h2>
          NewsMonkey -{" "}
          {this.props.category === "" ? "Top Headlines" : this.props.category}
        </h2>
        {this.state.loading ? (
          <div
            className="spinner-border my-3"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    imageUrl={element.urlToImage}
                    desc={element.description}
                    title={element.title}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page === 1 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={() => this.onclicked("prev")}
          >
            &laquo; prev
          </button>
          <button
            disabled={this.state.totalResult === 0 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={() => this.onclicked("next")}
          >
            next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
