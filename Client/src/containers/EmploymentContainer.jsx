import { connectAdvanced } from 'react-redux';
import Employment from '../components/Employment';
import {
  changeTitle, getEmploymentById,
} from '../actions';

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;
  const props = {
    loading: state.fetching,
    specilities: state.specilities
  };

  const methods = {
    onLoadData: () => dispatch(getEmploymentById(id)),
    onChangeTitle: () => dispatch(changeTitle(`Трудоустройство № ${id}`)),
  };

  return { ...props, ...methods, ...ownProps };
})(Employment);
