import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import Dashboard from "../src/views/Dashboard/Dashboard";
// import Navbar from "../src/components/Navbar";
// import Search from "../src/components/Search";
// import Dashboard from "../src/components/Dashboard";
// import CurrencyList from "../src/components/CurrencyList";
// import MarketList from "../src/components/MarketList";
// import Market from "../src/components/Market";
// import Currency from "../src/components/Currency";
// import MyPortfolioList from "../src/components/MyPortfolioList";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        email: "",
        name: "",
        portfolios: [],
        profile_picture: ""
      },
      currencies: [],
      markets: [],
      selectedMarket: {
        name: "",
        currency_markets: []
      },
      selectedCurrency: {
        ticker: "",
        target: "",
        price: "",
        volume: "",
        change: "",
        currency_markets: []
      },
      portfolios: []
    };
  }

  componentDidMount() {
    this.getUserData();

    this.getCurrencies();
    setInterval(() => this.getCurrencies(), 10000);

    this.getMarkets();
  }

  getUserData = () => {
    const userURL = "http://localhost:3000/users/11";
    return fetch(userURL)
      .then(resp => resp.json())
      .then(data => this.setState({ userData: data }))
      .then(console.log);
  };

  getCurrencies = () => {
    const currenciesURL = "http://localhost:3000/currencies";
    return fetch(currenciesURL)
      .then(resp => resp.json())
      .then(data => this.setState({ currencies: data }));
  };

  getMarkets = () => {
    const marketsURL = "http://localhost:3000/markets";
    return fetch(marketsURL)
      .then(resp => resp.json())
      .then(data => this.setState({ markets: data }));
  };

  getPortfolios = () => {
    const portfoliosURL = "http://localhost:3000/portfolios";
    return fetch(portfoliosURL)
      .then(resp => resp.json())
      .then(data => this.setState({ portfolios: data }));
  };

  changeSelectedMarket = market => {
    const marketURL = `http://localhost:3000/markets/${market.id}`;
    return fetch(marketURL)
      .then(resp => resp.json())
      .then(data => this.setState({ selectedMarket: data }));
  };

  changeSelectedCurrency = currency => {
    const currencyURL = `http://localhost:3000/currencies/${currency.id}`;
    return fetch(currencyURL)
      .then(resp => resp.json())
      .then(data => this.setState({ selectedCurrency: data }));
  };

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={props => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={props => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              name="Dashboard"
              component={props => {
                return <Dashboard data={this.state} />;
              }}
            />
            {/* <Route
              exact
              path="/"
              component={props => {
                return (
                  <Dashboard portfolios={this.state.userData.portfolios} />
                );
              }}
            />
            <Route
              exact
              path="/dashboard"
              component={props => {
                return (
                  <Dashboard portfolios={this.state.userData.portfolios} />
                );
              }}
            />
            <Route
              exact
              path="/currencies"
              component={props => {
                return (
                  <CurrencyList
                    currencies={this.state.currencies}
                    changeSelectedCurrency={this.changeSelectedCurrency}
                    currencies={this.state.currencies}
                  />
                );
              }}
            />
            <Route
              exact
              path="/markets"
              component={props => {
                return (
                  <MarketList
                    selectedMarket={this.state.selectedMarket}
                    changeSelectedMarket={this.changeSelectedMarket}
                    markets={this.state.markets}
                  />
                );
              }}
            />
            <Route
              exact
              path={`/markets/${this.state.selectedMarket.id}`}
              component={props => {
                return <Market selectedMarket={this.state.selectedMarket} />;
              }}
            />

            <Route
              exact
              path={`/currencies/${this.state.selectedCurrency.id}`}
              component={props => {
                return (
                  <Currency selectedCurrency={this.state.selectedCurrency} />
                );
              }}
            />

            <Route
              exact
              path={`/my-portfolios`}
              component={props => {
                return (
                  <MyPortfolioList
                    portfolios={this.state.userData.portfolios}
                  />
                );
              }} */}{" "}
            {/* */}
            {/* /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
