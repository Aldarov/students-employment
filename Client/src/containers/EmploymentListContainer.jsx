import React, { Component } from 'react';
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

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

export default EmploymentList;
