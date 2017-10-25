import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { TableCell } from 'material-ui';
import PropTypes from 'prop-types';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing.unit,
    '& ~ $cell': {
      paddingLeft: theme.spacing.unit,
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  cellRightAlign: {
    textAlign: 'right',
  },
});

class TableCellTemplete extends Component {
  render() {
    const { style, column, value, children, classes } = this.props;
    return (
      <TableCell
        style={{...style}}
        className={classNames({
          [classes.cell]: true,
          [classes.cellRightAlign]: column.align === 'right',
        })}
      >
        {children || value}
      </TableCell>
    );
  }
}

TableCellTemplete.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default withStyles(styles)(TableCellTemplete);
