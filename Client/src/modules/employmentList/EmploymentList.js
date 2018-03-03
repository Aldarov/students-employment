import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout } from '../layout';
import { QuestionDialog } from '../dialogs';

class EmploymentList extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      headerProps,
      deleteEmploymentDialogProps,
      formName,
      onClickDemo
    } = this.props;

    return (
      <Layout
        formName={formName}
        headerProps={headerProps}
      >
        <input type="submit" onClick={onClickDemo}/>
        EmploymentList!!!!
        <QuestionDialog dialogProps={deleteEmploymentDialogProps} />
      </Layout>
    );
  }
}

EmploymentList.propTypes = {
  headerProps: PropTypes.object,
  deleteEmploymentDialogProps: PropTypes.object,
  onLoadData: PropTypes.func,
  formName: PropTypes.string,
  onClickDemo: PropTypes.func,
};

export default EmploymentList;
