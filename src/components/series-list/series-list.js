import React from 'react';
import PropTypes from 'prop-types';
import Series from '../series/series';
import './series-list.scss';

function SeriesList({ seriesList, addSeries }) {
  return (
    <div className='series-list'>
      {seriesList.map((series, i) => {
        return <Series key={series.name + i} series={series} />
      })}
      <button onClick={addSeries} type='button'>+</button>
    </div>
  )
}

SeriesList.defaultProps = {
  seriesList: [],
  addSeries: () => {},
}

SeriesList.propTypes = {
  seriesList: PropTypes.array,
  addSeries: PropTypes.func,
}

export default SeriesList;