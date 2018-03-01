import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { withStyles } from 'material-ui/styles';

import { layoutStyles } from './styles';
import { Header } from '../header';

@withStyles(layoutStyles)
class Layout extends Component {
  render() {
    const {
      classes,
      headerProps,
      openedSidebar, onCloseSidebar,
      onRedirect, dialogOpen
    } = this.props;

    return (
      <div className={classes.container}>
        <Header
          openedSidebar={openedSidebar}
          headerProps={headerProps}
        />
        <div className={classes.content}>
          Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Несколько города предупредила составитель даже буквоград предупреждал, реторический предложения диких, обеспечивает языком однажды живет необходимыми но рыбного мир власти! Реторический.
        </div>
        <Alert stack={{limit: 5}} timeout={'none'}/>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object,
  headerProps: PropTypes.object.isRequired,

  onRedirect: PropTypes.func,
  onLoadData: PropTypes.func,
  onCloseSidebar: PropTypes.func,
  openedSidebar: PropTypes.bool,

  dialogOpen: PropTypes.bool,
};

export default Layout;
