import {
  getFormValues,
  touch,
  stopAsyncValidation,
  arrayRemove,
  submit,
  isPristine
} from 'redux-form';

import {
  SET_EMPLOYMENT_CONTRACT,
} from '../../../constants';
import {
  formName,
  withSelectDirectionSchoolPgTypeIds,
  withSelectDirectionOrganPgTypeIds,
  withSelectDistributionSchoolPgTypeIds,
  withSelectDistributionOrganPgTypeIds
}  from '../employment.container';
import { onClearOrganizationSelected } from './organization.actions';
import { onClearSchoolSelected } from './school.actions';
import { closeQuestionDialog } from '../../dialogs';

const DELETE_EMPLOYMENT_CONTRACT_DIALOG = 'DELETE_EMPLOYMENT_CONTRACT_DIALOG';

const closeEmploymentContract = () => ({
  type: SET_EMPLOYMENT_CONTRACT,
  data: {
    title: '', tableRow: null, opened: false,
    showDirectionSchools: false, showDirectionOrganizations: false, showDistributionSchools: false, showDistributionOrganizations: false
  }
});

const openEmploymentContract = (title, tableRow) => (dispatch, getState) => {
  const state = getState();
  const formValues = getFormValues(formName)(state);
  const { directionTypeId, distributionTypeId } = formValues.pgContractStuffs[tableRow];

  const showDirectionSchools = (withSelectDirectionSchoolPgTypeIds.indexOf(directionTypeId) > -1);
  const showDirectionOrganizations = (withSelectDirectionOrganPgTypeIds.indexOf(directionTypeId) > -1);
  const showDistributionSchools = (withSelectDistributionSchoolPgTypeIds.indexOf(distributionTypeId) > -1);
  const showDistributionOrganizations = (withSelectDistributionOrganPgTypeIds.indexOf(distributionTypeId) > -1);

  return dispatch({
    type: SET_EMPLOYMENT_CONTRACT,
    data: { title, tableRow, opened: true,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    }
  });
};

const validateData = (row, dispatch, state) => {
  const formValues = getFormValues(formName)(state);
  const pgContractStuffs = formValues ? formValues.pgContractStuffs : [];

  let error = null;
  if ((withSelectDirectionSchoolPgTypeIds.indexOf(pgContractStuffs[row].directionTypeId) > -1)
      && !pgContractStuffs[row].directionSchoolId) {
    const oldError = error && {...error.pgContractStuffs[row]};
    error = {
      'pgContractStuffs': {
        [row]: {
          ...oldError,
          directionSchoolName: 'Выберите образовательное учреждение'
        }
      }
    };
    dispatch(touch(formName, 'pgContractStuffs['+row+'].directionSchoolName'));
  }

  if ((withSelectDirectionOrganPgTypeIds.indexOf(pgContractStuffs[row].directionTypeId) > -1)
      && !pgContractStuffs[row].directionOrganizationId) {
    const oldError = error && {...error.pgContractStuffs[row]};
    error = {
      'pgContractStuffs': {
        [row]: {
          ...oldError,
          directionOrganizationName: 'Выберите организацию'
        }
      }
    };
    dispatch(touch(formName, 'pgContractStuffs['+row+'].directionOrganizationName'));
  }

  if ((withSelectDistributionSchoolPgTypeIds.indexOf(pgContractStuffs[row].distributionTypeId) > -1)
      && !pgContractStuffs[row].distributionSchoolId) {
    const oldError = error && {...error.pgContractStuffs[row]};
    error = {
      'pgContractStuffs': {
        [row]: {
          ...oldError,
          distributionSchoolName: 'Выберите образовательное учреждение'
        }
      }
    };
    dispatch(touch(formName, 'pgContractStuffs['+row+'].distributionSchoolName'));
  }

  if ((withSelectDistributionOrganPgTypeIds.indexOf(pgContractStuffs[row].distributionTypeId) > -1)
      && !pgContractStuffs[row].distributionOrganizationId) {
    const oldError = error && {...error.pgContractStuffs[row]};
    error = {
      'pgContractStuffs': {
        [row]: {
          ...oldError,
          distributionOrganizationName: 'Выберите организацию'
        }
      }
    };
    dispatch(touch(formName, 'pgContractStuffs['+row+'].distributionOrganizationName'));
  }
  return error;
};

const onCloseContract = row => (dispatch, getState) => () => {
  const state = getState();
  const errors = validateData(row, dispatch, state);

  if (errors) {
    dispatch(stopAsyncValidation(formName, errors));
  } else {
    dispatch(closeEmploymentContract());
    if (!isPristine(formName)(state))
    {
      dispatch(submit(formName));
    }
  }
};

const showDirectionOrganizations = (type) => {
  let data;
  if (type === 'school') {
    data = { showDirectionSchools: true, showDirectionOrganizations: false };
  } else {
    data = { showDirectionSchools: false, showDirectionOrganizations: true };
  }

  return { type: SET_EMPLOYMENT_CONTRACT, data };
};

const showDistributionOrganizations = (type) => {
  let data;
  if (type === 'school') {
    data = { showDistributionSchools: true, showDistributionOrganizations: false };
  } else {
    data = { showDistributionSchools: false, showDistributionOrganizations: true };
  }

  return { type: SET_EMPLOYMENT_CONTRACT, data };
};

const hideDirectionOrganizations = () => ({
  type: SET_EMPLOYMENT_CONTRACT,
  data: { showDirectionSchools: false, showDirectionOrganizations: false }
});


const hideDistributionOrganizations = () => ({
  type: SET_EMPLOYMENT_CONTRACT,
  data: { showDistributionSchools: false, showDistributionOrganizations: false }
});

const onChangeContractDirectionType = (value, tableRow, directionType) => dispatch => {
  if ((directionType === 'direction') && (withSelectDirectionSchoolPgTypeIds.indexOf(value) > -1)) {
    dispatch(showDirectionOrganizations('school'));
    dispatch(onClearOrganizationSelected(tableRow, directionType))();
  } else if ((directionType === 'direction') && (withSelectDirectionOrganPgTypeIds.indexOf(value) > -1)) {
    dispatch(showDirectionOrganizations('organization'));
    dispatch(onClearSchoolSelected(tableRow, directionType))();
  } else if ((directionType === 'distribution') && (withSelectDistributionSchoolPgTypeIds.indexOf(value) > -1)) {
    dispatch(showDistributionOrganizations('school'));
    dispatch(onClearOrganizationSelected(tableRow, directionType))();
  } else if ((directionType === 'distribution') && (withSelectDistributionOrganPgTypeIds.indexOf(value) > -1)) {
    dispatch(showDistributionOrganizations('organization'));
    dispatch(onClearSchoolSelected(tableRow, directionType))();
  } else {
    directionType === 'direction' ? dispatch(hideDirectionOrganizations()) : dispatch(hideDistributionOrganizations());
    dispatch(onClearSchoolSelected(tableRow, directionType))();
    dispatch(onClearOrganizationSelected(tableRow, directionType))();
  }
};

const onDelContractYes = ({ tableRow }) => dispatch => {
  dispatch(arrayRemove(formName, 'pgContractStuffs', tableRow));
  dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG));
};

const onDelContractNo = () => closeQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG);

export {
  onCloseContract,
  closeEmploymentContract,
  openEmploymentContract,
  onChangeContractDirectionType,
  DELETE_EMPLOYMENT_CONTRACT_DIALOG,
  onDelContractYes,
  onDelContractNo
};
