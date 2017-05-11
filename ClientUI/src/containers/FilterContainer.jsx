import React from 'react';
import { connect } from 'react-redux';

import Filter from '../components/Filter';
import { setFilter } from '../actions';

function mapStateToProps(state) {
  return {
    activeFilter: state.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetFilter: filter => dispatch(setFilter(filter))
  };
}

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
