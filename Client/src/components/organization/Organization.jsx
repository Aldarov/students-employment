import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Organization extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render () {
    //const {  } = this.props;

    return (
      <div>
        Organization!!!
      </div>
    );
  }
}

Organization.propTypes = {
  onLoadData: PropTypes.func
};

export default Organization;
