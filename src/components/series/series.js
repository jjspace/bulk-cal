import React from 'react';
import PropTypes from 'prop-types';
import SeriesEvent from '../series-event/series-event';
import './series.scss';

import Parameter from './parameter';

class Series extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      series: props.series,
      paramKey: 0,
      parameters: [],
    }
  }

  addParam = () => {
    this.setState((prevState) => ({
      parameters: [...prevState.parameters, { name: 'new-param', type: 'text', key: prevState.paramKey }],
      paramKey: prevState.paramKey + 1,
    }))
  }

  updateParam = (key, newValues) => {
    this.setState((prevState) => {
      const oldParam = prevState.parameters.find((param) => param.key === key);
      const newParam = {
        ...oldParam,
        ...newValues
      }
      return {
        parameters: prevState.parameters.map((param) => (param.key === key ? newParam : param))
      }

    })
  }

  removeParam = (key) => {
    this.setState((prevState) => ({
      parameters: prevState.parameters.filter((param) => param.key !== key) || [],
    }));
  }

  handleNameChange = (event) => {
    event.preventDefault();
    const newName = event.target.value;
    // extract `{text}` and remove `{}` from ends
    let nameParams = newName.match(/\{(\w+)\}/g);
    if (nameParams) nameParams = nameParams.map((s) => s.replace(/^\{|\}$/g, ''))
    // if (nameParams) nameParams = nameParams.map((param) => ({ name: param, type: 'text'}));

    this.setState((prevState) => {
      return {
        series: {
          ...prevState.series,
          name: newName,
        },
      }
    });
  }

  paramString = (str) => {
    const plaintext = str.split(/{[\w-]+}/);
    const params = str.match(/{[\w-]+}/g);

    return (
      <div className='parameterized-string'>
        {plaintext.map((part, i, arr) => {
          // don't do anything with the last plaintext part
          if (i === arr.length - 1) { return null; }
          return (
            // reason: parts are primitives with no specified key but could duplicate so need index
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={part + i}>
              {part}
              <span className='param-tag'>{params[i].replace(/\{|\}/g, '')}</span>
            </React.Fragment>
          );
        })}
        {plaintext[plaintext.length - 1]}
      </div>
    )
  }

  render () {
    const { series, parameters } = this.state;

    return (
      <div className='series'>
        <div className='series-main'>
          <form action='' className='series-form'>
            <div className='field'>
              <div className='name'>Name:</div>
              <input type='text' value={series.name} onChange={this.handleNameChange} />
            </div>
            <div className='field'>
              <div className='name'>Name:</div>
              {this.paramString(series.name)}
            </div>
            <div className='field'>
              <div className='name'>Description:</div>
              <textarea name='desc' id='desc' cols='30' rows='3' />
            </div>
            <div className='field'>
              <div className='name'>Start Date:</div>
              <input type='date' name='startDate' id='startDate' />
            </div>

          </form>
          <div className='series-parameters'>
            <div className='parameters-header'>
              <h3>Parameters</h3>
              <button type='button' onClick={this.addParam}>+</button>
            </div>
            <div className='parameters-list'>
              {parameters && parameters.map((param) => {
                return (
                  <Parameter key={param.key} param={param} removeParam={this.removeParam} updateParam={this.updateParam} />
                )
              })}
            </div>
          </div>
        </div>
        <div className='events'>
          <SeriesEvent name={series.name} params={parameters} />
          <div className='event'>
            <div className='event-name'>Event 1</div>
          </div>
          <div className='event'>
            <div className='event-name'>Event 2</div>
          </div>
        </div>
      </div>
    )
  }
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