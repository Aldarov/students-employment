import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './common/Loading';

export default class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
    this.props.onChangeTitle();
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
        Имени приставка, повстречался, текст свой вдали грустный это,
        буквенных рукопись осталось родного своего переписали она запятых продолжил образ рыбными букв?
        {loading && <Loading />}
      </div>
    );
  }
}

Employment.propTypes = {
  loading: PropTypes.bool,
  onLoadData: PropTypes.func,
  onChangeTitle: PropTypes.func,
};
