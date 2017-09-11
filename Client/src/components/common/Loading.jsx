import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

import './loading.scss';

class Loading extends Component {
  render() {
    return (
      <div className="loading-shading-mui">
        <CircularProgress className="loading-icon-mui" />
      </div>
    );
  }
}

export default Loading;
