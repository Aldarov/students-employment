import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';

import RenderAutocomplete from '../../_global/components/RenderAutocomplete';
import RenderCheckbox from '../../_global/components/RenderCheckbox';
import RenderSelect from '../../_global/components/RenderSelect';

const styles = theme => ({
  field: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100vw - 5px',
    },
  },
  horizontal: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const menuItems = (types) => types.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>);

class DirectionEdit extends PureComponent {
  onChangeType = event => this.props.onChangeDirectionType(event.target.value, this.props.tableRow, this.props.directionType);

  render() {
    const { classes, tableRow, directionType,
      types,
      schoolsSuggestions, onGetSchoolsSuggestions, onClearSchoolsSuggestions, onSchoolSelected, onClearSchoolSelected,
      organizationsSuggestions, onGetOrganizationsSuggestions, onClearOrganizationsSuggestions, onOrganizationSelected, onClearOrganizationSelected,
      showSchool, showOrganization
    } = this.props;

    return (
      <div className={classes.horizontal}>
        <Field
          name={'pgContractStuffs['+tableRow+'].'+directionType+'TypeId'}
          component={RenderSelect}
          label={directionType==='direction' ? 'Тип распределения': 'Тип трудоустройства'}
          className={classes.field}
          onChange={this.onChangeType}
        >
          {types && menuItems(types)}
        </Field>

        {
          showSchool &&
          <Field
            name={'pgContractStuffs['+tableRow+'].'+directionType+'SchoolName'}
            component={RenderAutocomplete}
            autoFocus={false}
            label={directionType==='direction' ? 'Распределен в образ-ное учреждение': 'В образ-ном учреждении'}
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
        {
          directionType==='distribution' &&
          <Field
            name={'pgContractStuffs['+tableRow+'].jobOnSpeciality'}
            component={RenderCheckbox}
            label='Трудоустроен по специальности'
            className={classes.checkbox}
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

  showSchool: PropTypes.bool,
  showOrganization: PropTypes.bool,

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

  onChangeDirectionType: PropTypes.func
};

export default withStyles(styles)(DirectionEdit);
