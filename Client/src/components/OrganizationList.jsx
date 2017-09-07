import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrganizationList extends Component {

  componentWillMount() {
    this.props.onChangeTitle('Список организаций');
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
