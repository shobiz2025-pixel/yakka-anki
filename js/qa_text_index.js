// Merge all QA text data into a single lookup object
const QA_TEXT_ALL = Object.assign({},
  typeof QA_TEXT_01 !== 'undefined' ? QA_TEXT_01 : {},
  typeof QA_TEXT_02 !== 'undefined' ? QA_TEXT_02 : {},
  typeof QA_TEXT_03 !== 'undefined' ? QA_TEXT_03 : {},
  typeof QA_TEXT_04 !== 'undefined' ? QA_TEXT_04 : {},
  typeof QA_TEXT_05 !== 'undefined' ? QA_TEXT_05 : {},
  typeof QA_TEXT_06 !== 'undefined' ? QA_TEXT_06 : {},
  typeof QA_TEXT_07 !== 'undefined' ? QA_TEXT_07 : {}
);
