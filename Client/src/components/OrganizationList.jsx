import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrganizationList extends Component {

  componentWillMount() {
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
};
