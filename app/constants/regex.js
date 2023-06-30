/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

// Regex

const regex = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  freeEmail: /^([\w-\.]+@(?!gmail)(?!yahoo)(?!hotmail)(?!aol)(?!abc)(?!xyz)(?!pqr)(?!rediffmail)(?!live)(?!outlook)(?!me)(?!msn)(?!ymail)([\w-]+\.)+[\w-]{2,4})?$/,
  number: /[0-9]/,
  alphabet: /[a-zA-Z]/,
  alphabetWithoutSpecialCharacter: /^([a-z']+(-| )?)+$/i,
  phoneNumber: /^((?:\0)|0)[8]{1}[0-9]+$/,
  checkVersion: /^[0-9,.]*$/,
  checkIsoString: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
  url: /(https?:\/\/[^\s]+)/g
};

export default regex;
