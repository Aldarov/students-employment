import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import List from './common/List';
import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = () => ({
  autocomplete: {
    width: '75%'
  }
});

class EmploymentList extends Component {
  state = { suggestionValue: '' };

  componentWillMount() {
    this.props.onChangeTitle();
    this.props.onLoadData();
  }

  handleChangeValue = (newValue) => {
    this.setState({ suggestionValue: newValue });
  }

  render() {
    const {
      searchPlaceholder, searchSuggestions, onSuggestionsFetchRequested,
      onSuggestionsClearRequested, onSuggestionSelected,
      onChangePage, onChangeSorting, onClearSuggestionSelected, onDoAction,
      data, columns, pageSize, currentPage, totalCount, loading, sorting, classes
    } = this.props;

    return (
      <div>
        <Autocomplete
          value={this.state.suggestionValue}
          onChangeValue={this.handleChangeValue}
          style={classes.autocomplete}
          placeholder={searchPlaceholder}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          onClearSuggestionSelected={onClearSuggestionSelected}
        />
        <List
          data={data}
          columns={columns}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={totalCount}
          changeCurrentPage={onChangePage}
          allowSorting
          sorting={sorting}
          changeSorting={onChangeSorting}
          allowAdding
          allowEditing
          allowDeleting
          doAction={onDoAction}
        />
        {loading && <Loading />}
      </div>
    );
  }
}

EmploymentList.propTypes = {
  classes: PropTypes.object,
  onChangeTitle: PropTypes.func,
  onLoadData: PropTypes.func,

  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  sorting: PropTypes.array,

  loading: PropTypes.bool,

  searchPlaceholder: PropTypes.string,
  searchSuggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onChangeSorting: PropTypes.func,
  onChangePage: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
  onDoAction: PropTypes.func,
};

export default withStyles(styles)(EmploymentList);
