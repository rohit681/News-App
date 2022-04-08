import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class Bussniss extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResult: 0,
      loading: true,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=124b495f958542c19cf4d0a0e61b0765&page=${this.state.page}&pageSize=5`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      page: this.state.page,
      totalResult: parseData.totalResults - parseData.articles.length,
      loading: false,
    });
    console.log(this.state.totalResult);
  }

  onPrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=124b495f958542c19cf4d0a0e61b0765&page=${
      this.state.page - 1
    }&pageSize=5`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      totalResult: this.state.totalResult + this.state.articles.length,
      loading: false,
    });
    console.log(this.state.totalResult);
  };

  onNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=124b495f958542c19cf4d0a0e61b0765&page=${
      this.state.page + 1
    }&pageSize=5`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      totalResult: this.state.totalResult - parseData.articles.length,
      loading: false,
    });
    console.log(this.state.totalResult);
  };
  render() {
    return (
      <div className="container text-center my-3">
        <h2>NewsMonkey - Bussniss</h2>
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
            onClick={this.onPrev}
          >
            &laquo; prev
          </button>
          <button
            disabled={this.state.totalResult === 0 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={this.onNext}
          >
            next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default Bussniss;
