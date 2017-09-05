import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import './EmploymentList.scss';

class EmploymentList extends Component {
  render() {
    return (
      <div>
        <Grid
          rows={[
            { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
            { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
          ]}
          columns={[
            { name: 'id', title: 'ID' },
            { name: 'product', title: 'Product' },
            { name: 'owner', title: 'Owner' },
          ]}>
          <TableView />
          <TableHeaderRow />
        </Grid>
      </div>
    );
  }
}

EmploymentList.propTypes = {

};

export default EmploymentList;
