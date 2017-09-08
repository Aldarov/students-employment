import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';


class EmploymentList extends Component {
  componentWillMount() {
    this.props.onChangeTitle('Трудоустройство');
    this.props.onGetEmploymentList({ limit: 30 })
      .then((res) => {console.log(res);});
  }

  render() {
    const { employmentList } = this.props;
    console.log(employmentList);
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
  onChangeTitle: PropTypes.func,
  onGetEmploymentList: PropTypes.func,
  employmentList: PropTypes.array,
};

export default EmploymentList;
