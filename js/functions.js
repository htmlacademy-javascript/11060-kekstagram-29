const compareStringLength = (string, length) => string.length <= length;

compareStringLength('Привет', 7);

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
};

isPalindrome('топот топот');

const extractNumber = (string) => parseInt(String(string.replace(/\D/g, '')), 10);

extractNumber('er 234');

const isMeetingWorktime = (startWork, endWork, startMeeting, durationMeeting) => {
  const startMeetingInMinutes = Number(startMeeting.split(':')[0]) * 60 + Number(startMeeting.split(':')[1]);
  const startWorktimeInMinutes = Number(startWork.split(':')[0]) * 60 + Number(startWork.split(':')[1]);
  const endWorktimeInMinutes = Number(endWork.split(':')[0]) * 60 + Number(endWork.split(':')[1]);
  const worktimeTotal = startWorktimeInMinutes + endWorktimeInMinutes;

  if (worktimeTotal < durationMeeting || startWorktimeInMinutes > startMeetingInMinutes) {
    return false;
  }

  return endWorktimeInMinutes - startMeetingInMinutes >= durationMeeting;
};

isMeetingWorktime('08:00', '17:30', '14:00', 90); // true
isMeetingWorktime('8:0', '10:0', '8:0', 120); // true
isMeetingWorktime('08:00', '14:30', '14:00', 90); // false
isMeetingWorktime('14:00', '17:30', '08:0', 90); // false
isMeetingWorktime('8:00', '17:30', '08:00', 900); // false
