import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';
import { TextField } from '@gfpacheco/redux-form-material-ui';
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
              component={TextField}
              placeholder="Введите логин"
              label="Логин"
              margin="normal"
            />
            <Field
              name="password"
              component={TextField}
              type="password"
              placeholder="Введите пароль"
              label="Пароль"
              margin="normal"
            /><br/>

            <Button
              type="submit"
              raised
              color="primary"
              disabled={pristine || submitting}
            >
              Войти
            </Button>
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

export default {
  ReduxForm: reduxForm({ form: 'Login' })(Login)
};
