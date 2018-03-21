import React from 'react';

import * as reports from './reports';

// var doc = new jsPDF('landscape', 'mm', 'a4');

// function render(reactComponent) {
//   return ReactDOMServer.renderToString(reactComponent);
// }

// export function showReport(reportName) {
//   const Report = reports[reportName];
//   doc.fromHTML(render(<Report />));
//   // console.log(render(<Report />));
//   doc.save(`${reportName}.pdf`);
// }

export function showReport(reportName) {
  // const docDefinition = {
  //   pageSize: 'A4',
  //   pageOrientation: 'landscape',
  //   pageMargins: [ 40, 60, 40, 60 ],
  //   table: {
  //     // headers are automatically repeated if the table spans over multiple pages
  //     // you can declare how many rows should be treated as headers
  //     headerRows: 1,
  //     widths: [ '*', 'auto', 100, '*' ],

  //     body: [
  //       [ 'First', 'Second', 'Third', 'The last one' ],
  //       [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
  //       [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
  //     ]
  //   }
  // };

  // pdfMake.createPdf(docDefinition).open({}, window.open('', '_blank'));
}
