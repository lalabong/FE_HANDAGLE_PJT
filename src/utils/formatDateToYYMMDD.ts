/**
 * @param isoDateString ISO 형식의 날짜 문자열 (예: '2025-04-24T07:47:36.713Z')
 * @returns 'YY.MM.DD' 형식의 문자열 (예: '25.04.24')
 */

export const formatDateToYYMMDD = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
