import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../layout';

class EmploymentList extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      headerProps,
      formName,
    } = this.props;

    return (
      <Layout
        headerProps={headerProps}
        formName={formName}
      >
        EmploymentList!!!!
      </Layout>
    );
  }
}

EmploymentList.propTypes = {
  headerProps: PropTypes.object,
  onLoadData: PropTypes.func,
  formName: PropTypes.string,
};

export default EmploymentList;
