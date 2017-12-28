import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

export default function renderList ({
  fields,
  ...custom
}) {
  const data = fields.getAll() || [];
  return (
    <List
      data={data}
      {...custom}
    />
  );
}

renderList.propTypes = {
  fields: PropTypes.object,
  meta: PropTypes.object,
};
