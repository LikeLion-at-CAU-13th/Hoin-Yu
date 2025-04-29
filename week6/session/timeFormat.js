// 날짜 및 시간 포맷팅 함수
export function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '정보 없음';
    
    const year = dateTimeString.substring(0, 4);
    const month = dateTimeString.substring(4, 6);
    const day = dateTimeString.substring(6, 8);
    const hour = dateTimeString.substring(8, 10);
    const minute = dateTimeString.substring(10, 12);
    const second = dateTimeString.substring(12, 14);
    
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
  }
  
  // 년월 포맷팅 함수
export function formatYearMonth(yearMonthString) {
    if (!yearMonthString) return '정보 없음';
    
    const year = yearMonthString.substring(0, 4);
    const month = yearMonthString.substring(4, 6);
    
    return `${year}년 ${month}월`;
}
  