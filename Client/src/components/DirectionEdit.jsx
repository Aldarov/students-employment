import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import RenderTextField from './common/RenderTextField';
import RenderAutocomplete from './common/RenderAutocomplete';

const styles = theme => ({
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

class DirectionEdit extends Component {
  render() {
    const { classes, tableRow, directionType, showSchool, showOrganization,
      types, onChangeType,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
    } = this.props;

    return (
      <div className={classes.horizontal}>
        <Field
          name={'pgContractStuffs['+tableRow+'].'+directionType+'TypeId'}
          select
          component={RenderTextField}
          label={directionType==='direction' ? 'Тип распределения': 'Тип трудоустройства'}
          className={classes.field}
          onChange={event => onChangeType(event.target.value)}
        >
          {types && types.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Field>

        {
          showSchool &&
          <Field
            name={'pgContractStuffs['+tableRow+'].'+directionType+'SchoolName'}
            component={RenderAutocomplete}

            autoFocus={false}
            label={directionType==='direction' ? 'Распределен в образ-ное учреждение': 'Работает в образ-ном учреждении'}
            className={classes.field}

            suggestions={schoolsSuggestions}
            onSuggestionsFetchRequested={onGetSchoolsSuggestions}
            onSuggestionsClearRequested={onClearSchoolsSuggestions}
            onSuggestionSelected={onSchoolSelected(tableRow, directionType)}
            onClearSelectedSuggestion={onClearSchoolSelected(tableRow, directionType)}
          />
        }
        {
          showOrganization &&
          <Field
            name={'pgContractStuffs['+tableRow+'].'+directionType+'OrganizationName'}
            component={RenderAutocomplete}

            autoFocus={false}
            label={directionType==='direction' ? 'Распределен в организацию': 'Работает в организации'}
            className={classes.field}

            suggestions={organizationsSuggestions}
            onSuggestionsFetchRequested={onGetOrganizationsSuggestions}
            onSuggestionsClearRequested={onClearOrganizationsSuggestions}
            onSuggestionSelected={onOrganizationSelected(tableRow, directionType)}
            onClearSelectedSuggestion={onClearOrganizationSelected(tableRow, directionType)}
          />
        }
      </div>
    );
  }
}

DirectionEdit.propTypes = {
  classes: PropTypes.object,
  tableRow: PropTypes.number,
  directionType: PropTypes.string,

  types: PropTypes.array,
  onChangeType: PropTypes.func,

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

  showSchool: PropTypes.bool,
  showOrganization: PropTypes.bool,
};

export default withStyles(styles)(DirectionEdit);
