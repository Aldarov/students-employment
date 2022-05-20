import { useNavigate } from "react-router-dom";

import { formName } from '../employmentList.container';
import { openSidebar } from '../../sidebar';
import { fetching } from '../../busyIndicator';
import { apiGetEmploymentList, apiDeleteEmployment } from '../employmentList.api';
import {
  SET_EMPLOYMENT_LIST,
  SET_EMPLOYMENT_LIST_SORTING,
  DELETE_EMPLOYMENT,
  SET_EMPLOYMENT_SUGGESTIONS,
  CLEAR_EMPLOYMENT_SUGGESTIONS
} from '../../../constants';
import throwError from '../../_global/helpers/throwError';
import { openQuestionDialog, closeQuestionDialog } from '../../dialogs';

const DELETE_EMPLOYMENT_DIALOG = 'DELETE_EMPLOYMENT_DIALOG';

const getEmploymentList = (params) => async (dispatch) => {
  const res = await fetching(dispatch, formName, apiGetEmploymentList(params));
  throwError(res);
  dispatch({ type: SET_EMPLOYMENT_LIST, data: res });
  if (params.sorting) dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });

  return res;
};

const onLoadData = () => async (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.employment.list.info;

  return dispatch(getEmploymentList({ limit, page, sorting }));
};

const onHeaderLeftButtonClick = () => openSidebar();

const onDelEmploymentYes = ({ row: { id } }) => async (dispatch) => {
  dispatch(closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG));

  const res = await fetching(dispatch, formName, apiDeleteEmployment(id));
  throwError(res);
  dispatch({ type: DELETE_EMPLOYMENT, data: id });
};

const onDelEmploymentNo = () => closeQuestionDialog(DELETE_EMPLOYMENT_DIALOG);

const onSortingChange = (newSorting) => (dispatch, getState) => {
  const state = getState();
  const { limit, page } = state.employment.list.info;

  dispatch(getEmploymentList({ limit, page, sorting: newSorting }));
};

const onChangeCurrentPage = (newPage) => (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.employment.list.info;

  if (newPage != page ) {
    dispatch(getEmploymentList({ limit, page: newPage, sorting }));
  }
};

const onDoAction = (history) => (args) => dispatch => {
  const navigate = useNavigate();

  console.log('onDoAction', navigate);
  switch (args.type) {
    case 'adding': {
      history.push('/employment/add');
      break;
    }
    case 'editing': {
      history.push(`/employment/${args.row.id}`);
      break;
    }
    case 'deleting': {
      dispatch(openQuestionDialog(DELETE_EMPLOYMENT_DIALOG, args));
      break;
    }
    default: break;
  }
};

export function getEmploymentSuggestions(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetEmploymentList(params).then(res => {
      dispatch({ type: SET_EMPLOYMENT_SUGGESTIONS, data: res.data });
    })
  );
}

const onSuggestionsFetchRequested = (value) => async (dispatch) => {
  const res = await fetching(dispatch, formName, apiGetEmploymentList({ search: value }));
  throwError(res);
  dispatch({ type: SET_EMPLOYMENT_SUGGESTIONS, data: res.data });
};

const onSuggestionsClearRequested = () => ({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });

const onSuggestionSelected = (value) => (dispatch, getState) => {
  const state = getState();
  const { limit } = state.employment.list.info;
  const id = value ? value.id : null;
  dispatch(getEmploymentList({ limit, id }));
};

const onClearSuggestionSelected = () => (dispatch, getState) => {
  const state = getState();
  const { limit, page, sorting } = state.employment.list.info;
  dispatch(getEmploymentList({ limit, page, sorting }));
};

export default {
  onLoadData,
  onHeaderLeftButtonClick,
  onDelEmploymentYes,
  onDelEmploymentNo,
  onSortingChange,
  onChangeCurrentPage,
  onDoAction,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onClearSuggestionSelected
};

export {
  DELETE_EMPLOYMENT_DIALOG
};
