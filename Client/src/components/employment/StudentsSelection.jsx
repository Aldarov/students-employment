import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip/Tooltip';

import Dialog from '../common/dialogs/Dialog';
import List from '../common/List';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class StudentsSelection extends Component {
  state = {
    selection: []
  }

  handleSelectionChange = selection => {
    const sel = this.props.data.filter((item, index) => selection.includes(index));
    this.setState({selection: sel});
  }

  handleSelected = () => {
    this.props.onSelected(this.state.selection);
  }

  render () {
    const { title, data, onClose, opened, classes, ...other } = this.props;

    return (
      opened ?
        <Dialog
          title={title}
          opened={opened}
          onClose={onClose}
        >
          <Tooltip title="Добавить выбранных студентов">
            <Button className={classes.button} raised color="primary" onClick={this.handleSelected}>
              Выбрать
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </Tooltip>
          <List
            enableSelectionState
            data={data}
            onSelectionChange={this.handleSelectionChange}
            {...other}
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
  onSelected: PropTypes.func
};

export default withStyles(styles)(StudentsSelection);
