import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../../constants';

const openSidebar = () => ({ type: OPEN_SIDEBAR });

const closeSidebar = () => ({ type: CLOSE_SIDEBAR });

export {
  openSidebar,
  closeSidebar
};
