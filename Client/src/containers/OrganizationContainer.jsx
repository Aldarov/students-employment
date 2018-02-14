import { connectAdvanced } from 'react-redux';
import {
  SubmissionError, reduxForm, getFormValues,
  submit, isPristine, isSubmitting, change, arrayRemove, arrayPush,
  stopAsyncValidation, touch,
} from 'redux-form';

import { Organization } from '../components/organization';
import {
  openQuestionDialog, closeQuestionDialog,
  saveOrganization
} from '../actions';

const formName = 'organization';
let onRedirectToList;

const initHeader = (dispatch, ownProps, pristine, submitting, title) => {
  ownProps.onInitHeader({
    onLeftButtonClick: () => {
      if (!pristine) {
        ownProps.onInitDialog({
          contentText: 'Сохранить измененные данные?',
          onYes: () => {
            onRedirectToList = () => {
              ownProps.history.push('/organization');
              onRedirectToList = null;
            };
            dispatch(closeQuestionDialog());
            dispatch(submit(formName));
          },
          onNo: () => {
            dispatch(closeQuestionDialog());
            ownProps.history.push('/organization');
          }
        });
        dispatch(openQuestionDialog());
      } else {
        ownProps.history.push('/organization');
      }
    },
    leftButtonIconName: 'ArrowBack',
    onRightButtonClick: () => dispatch(submit(formName)),
    rightButtonDisabled: pristine || submitting,
    title: title
  });
};

export default connectAdvanced( dispatch => (state, ownProps) => {
  const id  = ownProps.match.params.id === 'add' ? null : ownProps.match.params.id;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);
  const title = id ? 'Организация' : 'Организация (добавление)';


  const props = {
    loading: state.fetching,
  };

  const methods = {
    onLoadData: () => {
      initHeader(dispatch, ownProps, pristine, submitting, title);
    },
    onChange: () => {
      initHeader(dispatch, ownProps, pristine, submitting, title);
    },
    onSubmit: values => {
      dispatch(saveOrganization(values, res => {
        if (onRedirectToList) {
          onRedirectToList();
        }
        else {
          initHeader(dispatch, ownProps, pristine, submitting, title);
        }
      }));
      // throw new SubmissionError({
      //   entraceYear: 'Ошибка заполнения',
      //   _error: 'Общая ошибка формы!!'
      // });
    },
    validate: values => {},
  };

  return { ...props, ...methods, ...ownProps };
})(Organization);
