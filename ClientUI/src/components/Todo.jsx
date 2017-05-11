import React from 'react';

import Checkbox from './Checkbox';
import Button from './Button';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing) {
      this.refs.title.focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = this.refs.title.value;

    this.props.onEdit({...this.props.todo, title});
    this.setState({ editing: false });
  }

  handleDelete() {
    this.props.onDelete(this.props.todo.id);
  }

  handleToggle() {
    const completed = !this.props.todo.completed;
    this.props.onToggle({...this.props.todo, completed});
  }

  handleEdit() {
    this.setState({ editing: true });
  }

  renderDisplay() {
    const className = `todo${this.props.todo.completed ? ' completed' : ''}`;

    return (
      <div className={className}>
        <Checkbox checked={this.props.todo.completed} onChange={this.handleToggle} />

        <span className="todo-title">{this.props.todo.title}</span>

        <Button className="edit icon" icon="edit" onClick={this.handleEdit} />
        <Button className="delete icon" icon="delete" onClick={this.handleDelete} />
      </div>
    );
  }

  renderForm() {
    return (
      <form className="todo-edit-form" onSubmit={this.handleSubmit}>
        <input type="text" ref="title" defaultValue={this.props.todo.title} />
        <Button className="save icon" icon="save" type="submit" />
      </form>
    );
  }

  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

Todo.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};

export default Todo;
