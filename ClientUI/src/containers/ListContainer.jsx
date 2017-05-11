import React from 'react';
import { connect } from 'react-redux';

import List from '../components/List';
import { deleteTodo, editTodo, toggleTodo } from '../actions';
import { getFilteredTodos } from '../reducers';

function mapStateToProps(state) {
  return {
    todos: getFilteredTodos(state),
    fetching: getFilteredTodos(state.fetching)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDelete: id => dispatch(deleteTodo(id)),
    onToggle: (...todo) => dispatch(toggleTodo(...todo)),
    onEdit: (...todo) => dispatch(editTodo(...todo))
  };
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListContainer;
