import React from 'react';
import PropTypes from 'prop-types';
import {
  Table
} from '@devexpress/dx-react-grid-material-ui';

const getContractTableCellData = (directionTypes, distributionTypes, column, row) => {
  const directionType = directionTypes.filter((item) => (item.id == row.directionTypeId))[0];
  const distributionType = distributionTypes.filter((item) => (item.id == row.distributionTypeId))[0];
  switch (column.name) {
    case 'fullName': return (row.student && row.student.fullName);
    case 'regAddress': return (row.student && row.student.regAddress);
    case 'finance': return (row.student && row.student.finance);
    case 'state': return (row.student && row.student.state);
    case 'entrType': return (row.student && row.student.entrType);
    case 'phone': return (row.student && row.student.phone);
    case 'direction':
      return (
        directionType && directionType.name +
        (row.directionOrganizationName ? ', ' + row.directionOrganizationName : '') +
        (row.directionSchoolName ? ', ' + row.directionSchoolName : '')
      ) || '';
    case 'distribution':
      return (
        distributionType && distributionType.name +
        (row.distributionOrganizationName ? ', ' + row.distributionOrganizationName : '') +
        (row.distributionSchoolName ? ', ' + row.distributionSchoolName : '')
      ) || '';
    default:
      break;
  }
};

const tableCellStyle = (style) => ({
  ...style,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
});

const ContractTableCellTemplate = (directionTypes, distributionTypes) => (props) => {
  const { row, column, style, ...other } = props;
  const cellValue = getContractTableCellData(directionTypes, distributionTypes, column, row);

  const cellStyle = tableCellStyle(style);

  return <Table.Cell
    {...other}
    value={cellValue}
    row={row}
    column={column}
    style={cellStyle}
  />;
};

ContractTableCellTemplate.propTypes = {
  column: PropTypes.object,
  value: PropTypes.any,
  row: PropTypes.any,
  dictionaries: PropTypes.object,
  style: PropTypes.object
};

export default ContractTableCellTemplate;
