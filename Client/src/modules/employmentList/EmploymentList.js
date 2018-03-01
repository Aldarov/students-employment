import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../layout';

class EmploymentList extends Component {
  render() {
    const {
      headerProps,
      dialogProps
    } = this.props;

    return (
      <Layout
        headerProps={headerProps}
        dialogProps={dialogProps}
      >
        EmploymentList!!!!
      </Layout>
    );
  }
}

EmploymentList.propTypes = {
  headerProps: PropTypes.object,
  dialogProps: PropTypes.object,
};

export default EmploymentList;
