import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import { MenuItem } from 'material-ui/Menu';
import { Field } from 'redux-form';

import RenderTextField from './common/RenderTextField';
import RenderAutocomplete from './common/RenderAutocomplete';
import DirectionEdit from './DirectionEdit';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    marginLeft: '-20px'
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  field: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  horizontal: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class Contract extends Component {
  render () {
    const {
      classes, open, title, onClose,
      tableRow, directionTypes,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
    } = this.props;

    return (
      <Dialog
        fullScreen
        open={open}
        onRequestClose={onClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="contrast" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <DirectionEdit
            tableRow={tableRow}
            directionType='direction'
            showSchool
            // showOrganization
            types={directionTypes}
            schoolsSuggestions={schoolsSuggestions}
            onGetSchoolsSuggestions={onGetSchoolsSuggestions}
            onClearSchoolsSuggestions={onClearSchoolsSuggestions}
            onSchoolSelected={onSchoolSelected}
            onClearSchoolSelected={onClearSchoolSelected}
            organizationsSuggestions={organizationsSuggestions}
            onGetOrganizationsSuggestions={onGetOrganizationsSuggestions}
            onClearOrganizationsSuggestions={onClearOrganizationsSuggestions}
            onOrganizationSelected={onOrganizationSelected}
            onClearOrganizationSelected={onClearOrganizationSelected}
          />
          {
          // <div className={classes.horizontal}>
          //   <Field
          //     name={'pgContractStuffs['+tableRow+'].directionTypeId'}
          //     select
          //     component={RenderTextField}
          //     label='Выберите тип распределения'
          //     className={classes.field}
          //     onChange={event => onChangeDirectionType(event.target.value)}
          //   >
          //     {directionTypes && directionTypes.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          //   </Field>

          //   <Field
          //     name={'pgContractStuffs['+tableRow+'].directionSchoolName'}
          //     component={RenderAutocomplete}

          //     autoFocus={false}
          //     label='Выберите образ-ное учреждение'
          //     className={classes.field}

          //     suggestions={schoolsSuggestions}
          //     onSuggestionsFetchRequested={onGetSchoolsSuggestions}
          //     onSuggestionsClearRequested={onClearSchoolsSuggestions}
          //     onSuggestionSelected={onSchoolSelected(tableRow, 'direction')}
          //     onClearSelectedSuggestion={onClearSchoolSelected(tableRow, 'direction')}
          //   />

          //   <Field
          //     name={'pgContractStuffs['+tableRow+'].directionOrganizationName'}
          //     component={RenderAutocomplete}

          //     autoFocus={false}
          //     label='Выберите подразделение'
          //     className={classes.field}

          //     suggestions={organizationsSuggestions}
          //     onSuggestionsFetchRequested={onGetOrganizationsSuggestions}
          //     onSuggestionsClearRequested={onClearOrganizationsSuggestions}
          //     onSuggestionSelected={onOrganizationSelected(tableRow, 'direction')}
          //     onClearSelectedSuggestion={onClearOrganizationSelected(tableRow, 'direction')}
          //   />
          // </div>
          }
        </div>
      </Dialog>
    );
  }
}

Contract.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  tableRow: PropTypes.number,

  directionTypes: PropTypes.array,

  schoolsSuggestions: PropTypes.array,
  onGetSchoolsSuggestions: PropTypes.func,
  onClearSchoolsSuggestions: PropTypes.func,
  onSchoolSelected: PropTypes.func,
  onClearSchoolSelected: PropTypes.func,

  organizationsSuggestions: PropTypes.array,
  onGetOrganizationsSuggestions: PropTypes.func,
  onClearOrganizationsSuggestions: PropTypes.func,
  onOrganizationSelected: PropTypes.func,
  onClearOrganizationSelected: PropTypes.func,
};

export default withStyles(styles)(Contract);
