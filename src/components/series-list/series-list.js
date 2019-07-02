import React from 'react';
import PropTypes from 'prop-types';
import Series from '../series/series';
import './series-list.scss';

function SeriesList({ seriesList }) {
  return (
    <div className='series-list'>
      {seriesList.map((series, i) => {
        return <Series key={series.name + i} series={series} />
      })}
      <button>+</button>
    </div>
  )
}

SeriesList.defaultProps = {
  seriesList: [],
}

SeriesList.propTypes = {
  seriesList: PropTypes.array,
}

export default SeriesList;