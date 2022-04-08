import React, { Component } from "react";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <div style={{ position: "sticky", top: "0", zIndex: 1 }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              NewsMonkey
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "" ? "active" : ""
                    }`}
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "business" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("business")}
                  >
                    Bussniss
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "entertainment" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("entertainment")}
                  >
                    Entertainment
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "health" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("health")}
                  >
                    Health
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "science" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("science")}
                  >
                    Science
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "sports" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("sports")}
                  >
                    Sports
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      this.props.category === "technology" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => this.props.func("technology")}
                  >
                    Technology
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    this.setState({ text: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={(e) => {
                    this.props.search(this.state.text);
                    e.preventDefault();
                  }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
