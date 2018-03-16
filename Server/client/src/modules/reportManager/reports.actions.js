import jsPDF from 'jspdf';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import * as reports from './reports';

var doc = new jsPDF('landscape', 'mm', 'a4');

function render(reactComponent) {
  return ReactDOMServer.renderToString(reactComponent);
}

export function showReport(reportName) {
  const Report = reports[reportName];
  doc.fromHTML(render(<Report />));
  // console.log(render(<Report />));
  doc.save(`${reportName}.pdf`);
}

