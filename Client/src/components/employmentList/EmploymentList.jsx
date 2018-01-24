import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import List from '../common/List';
import Autocomplete from '../common/Autocomplete';
import Loading from '../common/Loading';
import {AddButton, EditButton, DeleteButton} from './Buttons';

const styles = theme => ({
  autocomplete: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
    marginBottom: theme.spacing.unit,
  },
  marginLeft: {
    marginLeft: theme.spacing.unit,
  },
});

class EmploymentList extends Component {
  componentWillMount() {
    this.props.onLoadData();
  }

  render() {
    const {
      classes,
      searchSuggestions, onSuggestionsFetchRequested,
      onSuggestionsClearRequested, onSuggestionSelected, onClearSuggestionSelected,
      data, loading,
      gridSetting,
    } = this.props;

    return (
      <Fragment>
        <Autocomplete
          inputProps={{
            autoFocus: false,
            className: classes.autocomplete,
            label: 'Поиск',
            placeholder: 'Введите значения через пробел',
          }}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSelectedSuggestion={onClearSuggestionSelected}
        />
        <List
          data={data}
          gridSetting={gridSetting}
          AddButton={AddButton}
          EditButton={EditButton}
          DeleteButton={DeleteButton}
        />
        {loading && <Loading />}
      </Fragment>
    );
  }
}

EmploymentList.propTypes = {
  classes: PropTypes.object,
  onLoadData: PropTypes.func,

  data: PropTypes.array,
  gridSetting: PropTypes.object,

  loading: PropTypes.bool,

  //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  searchSuggestions: PropTypes.array,
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
};

export default withStyles(styles)(EmploymentList);
