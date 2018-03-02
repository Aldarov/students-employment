import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../layout';

class OrganizationList extends Component {
  render() {
    const {
      headerProps
    } = this.props;

    return (
      <Layout
        headerProps={headerProps}
      >
        OrganizationList!!!
      </Layout>
    );
  }
}

OrganizationList.propTypes = {
  headerProps: PropTypes.object,
};

export default OrganizationList;
