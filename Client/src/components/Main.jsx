import React from 'react';
import PropTypes from 'prop-types';

class Main extends React.Component {
  componentWillMount() {
    this.props.checkAuth();
    if (this.props.isAuth) {
      // here need to load a main data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      // here need to load a main data
    }
    else {
      this.props.redirectTo('/login', this.props.location.pathname);
    }
  }

  render() {
    return (
      <main>
        <h3>Основная страница!!!</h3>
        <div>
          Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты.
          Агенство даль домах наш курсивных деревни эта напоивший рыбными парадигматическая использовало,
          встретил дал там свой которое лучше грамматики вдали вопрос.
        </div>
        <div>
          Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты.
          Бросил продолжил даже буквоград знаках курсивных злых гор, толку своего вершину сбить рот мир пустился запятых своих жизни!
          Языком, ручеек.
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  location: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

export default Main;
