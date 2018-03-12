import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { employmentStyles } from './styles';
import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';

@withStyles(employmentStyles)
class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      formName, headerProps,
      confirmSaveEmploymentDailogProps, deleteEmploymentContractDailogProps
    } = this.props;

    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
      >
        Employment
        <QuestionDialog dialogProps={confirmSaveEmploymentDailogProps} />
        <QuestionDialog dialogProps={deleteEmploymentContractDailogProps} />
      </Layout>
    );
  }
}

Employment.propTypes = {
  classes: PropTypes.object,
  formName: PropTypes.string,
  headerProps: PropTypes.object,

  onLoadData: PropTypes.func,
  confirmSaveEmploymentDailogProps: PropTypes.object,
  deleteEmploymentContractDailogProps: PropTypes.object,
};

export default Employment;
