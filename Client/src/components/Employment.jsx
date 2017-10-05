import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import RenderSelect from './common/RenderSelect';
import Autocomplete from './common/Autocomplete';
import Loading from './common/Loading';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  block: {
    display: 'block'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    display: 'block'
  },
});

class Employment extends Component {
  componentWillMount() {
    this.props.onLoadData();
    this.props.onChangeTitle();
  }

  handleChangeSpeciality = event => {
    const { data, onSetData } = this.props;
    data.specialityId = event.target.value;
    onSetData(data);
  };

  render() {
    const { classes, loading, onSubmit, pristine, submitting, data, specilities } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit} >
          {/* <Autocomplete
            placeholder="Специальность"
            suggestions={specilities}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            onClearSelectSuggestion={onClearSelectSuggestion}
          /> */}

          <Field
            name="speciality"
            component={RenderSelect}
            caption="Специальность"
            classes={classes}
            currentValue={data.specialityId || 0}
            onChange={this.handleChangeSpeciality}
          >
            {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Field>

          <Field
            name="speciality"
            component={RenderSelect}
            caption="Специальность"
            classes={classes}
            currentValue={data.specialityId || 0}
            onChange={this.handleChangeSpeciality}
          >
            {specilities && specilities.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
          </Field>
          <Button
            className={classes.block}
            type="submit"
            raised
            color="primary"
            disabled={pristine || submitting}
          >
            Сохранить
          </Button>
        </form>
        {loading && <Loading />}
      </div>
    );
  }
}

Employment.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSetData: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  data: PropTypes.object,
  specilities: PropTypes.array,
};

export default reduxForm({ form: 'Employment' })(withStyles(styles)(Employment));
