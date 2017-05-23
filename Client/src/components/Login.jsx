import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { RenderTextField } from './redux_form_fields/TextField';

import './Login.scss';

class Login extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="Login">
        <div className="Login__banner">
          <form
            className="Login__form"
            onSubmit={handleSubmit}
          >
            <h3>
              Вход в систему
            </h3>

            <Field
              name="login"
              component={RenderTextField}
              hintText="Введите логин"
              floatingLabelText="Логин"
            />
            <Field
              name="password"
              component={RenderTextField}
              type="password"
              hintText="Введите пароль"
              floatingLabelText="Пароль"
            /><br/>

            <RaisedButton label="Войти"
              primary
              type="submit"
              disabled={pristine || submitting}
            />
          </form>
          <img
            className="Login__image"
            src={require('../assets/images/desk.png')}
            alt="login image"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func
};

function validate(values) {
  const errors = {};
  const requiredFields = [ 'login', 'password' ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Данное поле обязательное';
    }
  });

  return errors;
}

export default {
  ReduxForm: reduxForm({
    form: 'Login',
    validate
  })(Login)
};
