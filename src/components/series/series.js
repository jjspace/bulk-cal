import React from 'react';
import PropTypes from 'prop-types';
import './series.scss';

function Series({ series }) {
  return (
    <div className='series'>
      <div className='series-main'>
        {series.name}
      </div>
      <div className='events'>
        <p>events here</p>
      </div>
    </div>
  )
}

Series.defaultProps = {
  series: { name: 'default series' }
}

Series.propTypes = {
  series: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export default Series;