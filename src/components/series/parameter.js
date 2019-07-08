import React from 'react';
import PropTypes from 'prop-types';
import './parameter.scss';

class Parameter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      dirtyName: props.param.name,
      dirtyType: props.param.type,
      dirtyOptions: props.param.options,
    }
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  }

  stopEditing = () => {
    this.setState({ isEditing: false });
  }

  save = () => {
    const { param: {key}, updateParam } = this.props;
    this.setState((prevState) => {
      updateParam(key, {
        name: prevState.dirtyName,
        type: prevState.dirtyType,
        options: prevState.dirtyType === 'select' ? prevState.dirtyOptions : null });
      return {
        isEditing: false,
      }
    })
  }

  discard = () => {
    const { param } = this.props;
    this.setState({
      isEditing: false,
      dirtyName: param.name,
      dirtyType: param.type,
      dirtyOptions: param.options,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      dirtyName: event.target.value,
    })
  }

  handleTypeChange = (event) => {
    this.setState({
      dirtyType: event.target.value,
    })
  }

  handleOptionChange = (event) => {
    this.setState({
      dirtyOptions: event.target.value,
    })
  }

  render() {
    const { param, removeParam } = this.props;
    const { name, type, key, options } = param;
    const { isEditing, dirtyName, dirtyType, dirtyOptions } = this.state;

    let optionsElem = null;
    if (isEditing && dirtyType === 'select') {
      optionsElem = <input type='text' value={dirtyOptions} onChange={this.handleOptionChange} />
    }
    else if (!isEditing && type === 'select') {
      optionsElem = <div>{options}</div>
    }

    return (
      <div className='parameter'>
        <div className='label'>
          <div className='name'>
            {isEditing
              ? <input type='text' value={dirtyName} onChange={this.handleNameChange} />
              : <div>{name}</div>}
          </div>
          {isEditing
            ? (
              <select name='type' id='param-type' className='type' value={dirtyType} onChange={this.handleTypeChange}>
                <option value='text'>text</option>
                <option value='textarea'>multi-line text</option>
                <option value='select'>one of</option>
                <option value='number'>number</option>
              </select>
            )
            : <div>{type}</div>}
          {optionsElem}
        </div>
        <div className='parameter-controls'>
          {isEditing
            ? <button type='button' onClick={this.save} alt='Save'>S</button>
            : <button type='button' onClick={this.startEditing} alt='Edit'>E</button>
          }
          {isEditing
            ? <button type='button' onClick={this.discard} alt='Discard Changes'>D</button>
            : <button type='button' onClick={() => removeParam(key)}>X</button>
          }
        </div>
      </div>
    )
  }
}

Parameter.defaultProps = {
  param: { name: '', type: 'text', key: -1 },
  updateParam: () => {},
  removeParam: () => {},
}

Parameter.propTypes = {
  param: PropTypes.shape({
    key: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.string,
  }),
  updateParam: PropTypes.func,
  removeParam: PropTypes.func
}

export default Parameter;