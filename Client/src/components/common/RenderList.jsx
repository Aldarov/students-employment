import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

export default function renderList ({
  fields,
  meta,
  ...custom
}) {
  const data = fields.getAll() || [];
  console.log('renderList', fields, meta);
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
