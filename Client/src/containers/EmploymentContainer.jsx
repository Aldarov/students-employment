import { connectAdvanced } from 'react-redux';
import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById, setEmploymentById
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;

  const props = {
    loading: state.fetching,
    data: state.employment.edit.data,
    specilities: state.specialities
  };

  const methods = {
    onLoadData: () => dispatch(getEmploymentById(id)),
    onSetData: data => dispatch(setEmploymentById(data)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`)),
  };

  return { ...props, ...methods, ...ownProps };
})(Employment);
