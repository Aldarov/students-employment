import { change } from 'redux-form';

import { formName }  from '../employment.container';
import {
  SET_ORGANIZATIONS_SUGGESTIONS,
  CLEAR_ORGANIZATIONS_SUGGESTIONS
} from '../../../constants';
import { fetching } from '../../busyIndicator';
import { apiGetOrganizations } from '../../organizationList';

const onGetOrganizationsSuggestions = value => dispatch => {
  return fetching(dispatch, formName,
    apiGetOrganizations({ limit: 20, search: value, sorting: [{columnName: 'name'}] })
      .then(res =>
        dispatch({ type: SET_ORGANIZATIONS_SUGGESTIONS, data: res.data })
      )
  );
};

const onClearOrganizationsSuggestions = () => ({ type: CLEAR_ORGANIZATIONS_SUGGESTIONS });

const onOrganizationSelected = (row, type) => dispatch => data => {
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', data.name));
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', data.id));
};

const onClearOrganizationSelected = (row, type) => dispatch => () => {
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', ''));
  dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', null));
};

export {
  onGetOrganizationsSuggestions,
  onClearOrganizationsSuggestions,
  onOrganizationSelected,
  onClearOrganizationSelected
};
