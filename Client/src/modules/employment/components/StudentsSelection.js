import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import { Dialog } from '../../dialogs';
import List from '../../_global/components/List';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing(),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
});

class StudentsSelection extends Component {
  state = {
    selection: []
  }

  handleSelectionChange = selection => {
    console.log('handleSelectionChange', selection);
    const sel = this.props.data.filter((item, index) => selection.includes(index));
    console.log('handleSelectionChange', sel);
    this.setState({selection: sel});
  }

  handleSelected = () => {
    this.props.onSelected(this.state.selection);
  }

  render () {
    const {
      title, data, onClose, opened, classes,
      columns, defaultColumnWidths
    } = this.props;

    return (
      opened ?
        <Dialog
          title={title}
          opened={opened}
          onClose={onClose}
        >
          <Tooltip title="Добавить выбранных студентов">
            <Button variant="contained" className={classes.button} onClick={this.handleSelected}>
              Выбрать
            </Button>
          </Tooltip>
          <List
            data={data}
            gridSetting={{
              enableSelectionState: true,
              columns: columns,
              defaultColumnWidths: defaultColumnWidths,
              allowAdding: false,
              allowEditing: false,
              allowDeleting: false,
            }}
            onSelectionChange={this.handleSelectionChange}
          />
        </Dialog>
        : null
    );
  }
}

StudentsSelection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onClose: PropTypes.func,
  opened: PropTypes.bool,
  classes: PropTypes.object.isRequired,

  columns: PropTypes.array,
  defaultColumnWidths: PropTypes.array,
  onSelected: PropTypes.func
};

export default withStyles(styles)(StudentsSelection);
