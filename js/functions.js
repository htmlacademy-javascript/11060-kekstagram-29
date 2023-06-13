const compareStringLength = (string, length) => string.length <= length;

compareStringLength('Привет', 7);

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
};

isPalindrome('топот топот');

const extractNumber = (string) => parseInt(String(string.replace(/\D/g, '')), 10);

extractNumber('er 234');
