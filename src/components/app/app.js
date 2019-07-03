import { hot } from 'react-hot-loader';
import React from 'react';
import Header from '../header/header';
import SeriesList from '../series-list/series-list';
import './app.scss';

const demoSeriesList = [
  { name: 'series 1' },
  { name: 'series 2' },
]

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      seriesList: demoSeriesList,
    }
  }

  addSeries = () => {
    this.setState((prevState) => ({seriesList: [...prevState.seriesList, {name: 'randome str'}]}))
  }

  render() {
    const {seriesList} = this.state;
    return (
      <div className='App'>
        <Header />
        <div className='wrapper'>
          <div className='info-block'>
            Bulk Cal is a tool to quickly create series of related events to be added to your calendar. Start by clicking Add Series below.
          </div>
          <SeriesList seriesList={seriesList} addSeries={this.addSeries} />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
