import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './series-event.scss';

class SeriesEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: {
        paramValues: {},
      },
    };
  }

  updateParamValue = (paramName, value) => {
    this.setState((prevState) => {
      let newState = { // eslint-disable-line prefer-const
        event: {
          ...prevState.event,
        }
      }
      newState.event.paramValues[paramName] = value;
      return newState;
    })
  }

  parseParams = (str, paramValues) => {
    const paramsInString = str.match(/\{[\w-]+\}/g);

    if (!paramsInString) return str;

    let out = str;
    paramsInString.forEach((paramName) => {
      const trimmedName = paramName.replace(/\{|\}/g, '');
      out = out.replace(new RegExp(paramName, 'g'), paramValues[trimmedName] || '');
    });
    return out;
  }

  render() {
    const { name, params } = this.props;
    const { event: { paramValues } } = this.state;

    return(
      <div className='series-event'>
        <div className='series-event-name'>{this.parseParams(name, paramValues)}</div>
        {params && params.map(({ key, name: paramName, type, options }) => {
          return (
            <div className='param-field' key={key}>
              <div className='param-name'>{paramName}</div>
              {type === 'text' && (
                <input
                  type='text'
                  value={paramValues[paramName]}
                  onChange={(e) => this.updateParamValue(paramName, e.target.value)}
                />
              )}
              {type === 'textarea' && (
                <textarea
                  cols='30'
                  rows='3'
                  value={paramValues[paramName]}
                  onChange={(e) => this.updateParamValue(paramName, e.target.value)}
                />
              )}
              {type === 'select' &&
                (
                  <select
                    value={paramValues[paramName]}
                    onChange={(e) => this.updateParamValue(paramName, e.target.value)}
                  >
                    <option value='' />
                    {options && options.split(',').map((option) => {
                      return <option value={option}>{option}</option>
                    })}
                  </select>
                )
              }
              {type === 'number' && (
                <input
                  type='number'

                />
              )}
            </div>
          );
        })}
      </div>
    )
  }
}

SeriesEvent.defaultProps = {
  name: '',
  params: [],
}

SeriesEvent.propTypes = {
  name: PropTypes.string,
  params: PropTypes.array,
}

export default SeriesEvent;