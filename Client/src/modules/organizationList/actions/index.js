import { openSidebar } from '../../sidebar';
import { openQuestionDialog, closeQuestionDialog } from '../../dialogs';
import { formName } from '../organizationList.container';
import {
  DELETE_ORGANIZATION,
  SET_ORGANIZATION_LIST,
  SET_ORGANIZATION_LIST_SORTING,
  SET_ORGANIZATION_SUGGESTIONS,
  CLEAR_ORGANIZATION_SUGGESTIONS
} from '../../../constants';
import { fetching } from '../../busyIndicator';
import { apiDeleteOrganization, apiGetOrganizations } from '../organizationList.api';
import throwError from '../../_global/helpers/throwError';

const DELETE_ORGANIZATION_DIALOG = 'DELETE_ORGANIZATION_DIALOG';

const onHeaderLeftButtonClick = () => openSidebar();

const onDelOrganizationYes = ({ row: { id } }) => async dispatch => {
  dispatch(closeQuestionDialog(DELETE_ORGANIZATION_DIALOG));
  const res = await fetching(dispatch, formName, apiDeleteOrganization(id));
  throwError(res);
  dispatch({ type: DELETE_ORGANIZATION, data: id });
};

const onDelOrganizationNo = () => closeQuestionDialog(DELETE_ORGANIZATION_DIALOG);

const getOrganizationList = (params) => async dispatch => {
  const res = await fetching(dispatch, formName, apiGetOrganizations(params));
  throwError(res);
  dispatch({ type: SET_ORGANIZATION_LIST, data: res });
  if (params.sorting) dispatch({ type: SET_ORGANIZATION_LIST_SORTING, data: params.sorting });
  return res;
};

const onSortingChange = newSorting => (dispatch, getState) => {
  const state = getState();
  const { limit, page } = state.organization.list.info;
  dispatch(getOrganizationList({ limit, page, sorting: newSorting }));
};

const onChangeCurrentPage = (newPage) => (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.organization.list.info;
  if (newPage != page ) {
    dispatch(getOrganizationList({ limit, page: newPage, sorting }));
  }
};

const onDoAction = history => (args) => dispatch => {
  switch (args.type) {
    case 'adding': {
      history.push('/organization/add');
      break;
    }
    case 'editing': {
      history.push(`/organization/${args.row.id}`);
      break;
    }
    case 'deleting': {
      dispatch(openQuestionDialog(DELETE_ORGANIZATION_DIALOG, args));
      break;
    }
    default: break;
  }
};

const onLoadData = () => (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.organization.list.info;
  const sort = sorting.length > 0 ? sorting : [{columnName: 'name', direction: 'asc'}];
  dispatch(getOrganizationList({ limit, page, sorting: sort }));
};

const onSuggestionsFetchRequested = (value) => async (dispatch) => {
  const res = await fetching(dispatch, formName, apiGetOrganizations({ limit: 20, search: value }));
  throwError(res);
  dispatch({ type: SET_ORGANIZATION_SUGGESTIONS, data: res.data });
  return res;
};

const onSuggestionsClearRequested = () => ({ type: CLEAR_ORGANIZATION_SUGGESTIONS });

const onSuggestionSelected = (value) => (dispatch, getState) => {
  const state = getState();
  const { limit } = state.organization.list.info;

  dispatch(getOrganizationList({ limit, id: value? value.id : null }));
};

const onClearSuggestionSelected = () => (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.organization.list.info;

  dispatch(getOrganizationList({ limit, page, sorting }));
};

export default {
  onHeaderLeftButtonClick,
  onDelOrganizationYes,
  onDelOrganizationNo,
  onSortingChange,
  onChangeCurrentPage,
  onDoAction,
  onLoadData,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onClearSuggestionSelected
};

export {
  DELETE_ORGANIZATION_DIALOG,
};
