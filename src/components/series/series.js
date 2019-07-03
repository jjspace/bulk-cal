import React from 'react';
import PropTypes from 'prop-types';
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

  editParam = (key, newValues) => {
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

  updateParams = (paramList) => {
    // take list of params in name/desc and update param list
    // remove ones that no longer exist, create ones that are new
    // don't touch ones that already exist

    // remove duplicates
    paramList = paramList.reduce((acc, param) => (acc.includes(param) ? [...acc] : [...acc, param]), [])

    this.setState((prevState) => {
      const { parameters: prevParams } = prevState;
      let newParams = [];
      paramList.forEach((paramName) => {
        const found = prevParams.find((p) => p.name === paramName)
        if (found) {
          // this param already exists
          newParams.push(found);
        }
        else {
          newParams.push({ name: paramName, type: 'text' });
        }
      });
      return {
        parameters: newParams,
      }
    })

  }

  handleNameChange = (event) => {
    event.preventDefault();
    const newName = event.target.value;
    // extract `{text}` and remove `{}` from ends
    let nameParams = newName.match(/\{(\w+)\}/g);
    if (nameParams) nameParams = nameParams.map((s) => s.replace(/^\{|\}$/g, ''))
    // if (nameParams) nameParams = nameParams.map((param) => ({ name: param, type: 'text'}));
    if (nameParams) this.updateParams(nameParams);

    this.setState((prevState) => {
      return {
        series: {
          ...prevState.series,
          name: newName,
        },
      }
    });
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
                  <Parameter key={param.key} param={param} removeParam={this.removeParam} updateParam={this.editParam} />
                )
              })}
            </div>
          </div>
        </div>
        <div className='events'>
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