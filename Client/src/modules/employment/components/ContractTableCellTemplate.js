import React from 'react';
import PropTypes from 'prop-types';
import {
  Table
} from '@devexpress/dx-react-grid-material-ui';

export default function ContractTableCellTemplate(props) {
  const { row, column, getCellData, style, ...other } = props;

  return <Table.Cell
    {...other}
    value={getCellData(column, row)}
    row={row}
    column={column}
    style={{
      ...style,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    }}
  />;
}

ContractTableCellTemplate.propTypes = {
  column: PropTypes.object,
  value: PropTypes.any,
  row: PropTypes.any,
  getCellData: PropTypes.func,
  style: PropTypes.object
};
