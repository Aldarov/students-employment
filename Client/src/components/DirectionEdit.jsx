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
  state = {
    showSchool: false,
    showOrganization: false
  };

  componentWillMount() {
    this.handleChangeType(9);
  }

  handleChangeType = value => {
    const { onClearSchoolSelected, onClearOrganizationSelected, tableRow, directionType } = this.props;
    // const value = event.target.value;
    let schoolTypeId;
    let organizationTypeId;
    if (directionType === 'direction') {
      schoolTypeId = 8;
      organizationTypeId = 9;
    } else {
      schoolTypeId = 17;
      organizationTypeId = 18;
    }

    if (value === schoolTypeId) {
      this.setState({
        showSchool: true,
        showOrganization: false
      });
      onClearOrganizationSelected(tableRow, directionType)();
    } else if (value === organizationTypeId) {
      this.setState({
        showSchool: false,
        showOrganization: true
      });
      onClearSchoolSelected(tableRow, directionType)();
    } else {
      this.setState({
        showSchool: false,
        showOrganization: false
      });
      onClearSchoolSelected(tableRow, directionType)();
      onClearOrganizationSelected(tableRow, directionType)();
    }
  };

  render() {
    const { classes, tableRow, directionType,
      types,
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
          onChange={event => this.handleChangeType(event.target.value)}
        >
          {types && types.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Field>

        {
          this.state.showSchool &&
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
          this.state.showOrganization &&
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

export default withStyles(styles)(DirectionEdit);
