import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrganizationList extends Component {

  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    return (
      <div>
          OrganizationList
      </div>
    );
  }
}

OrganizationList.propTypes = {
  onChangeTitle: PropTypes.func,
  onLoadData: PropTypes.func
};
