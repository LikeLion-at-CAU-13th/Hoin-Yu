import {formatDateTime, formatYearMonth} from "./timeFormat.js"

// 상세 페이지 보여주기
export function showDetail(item, container, detailSection) {
    // 목록 숨기기
    container.style.display = 'none';

    // 상세 페이지 보여주기
    detailSection.style.display = 'block';
    detailSection.innerHTML = '';

    // 상세 정보 표시
    const detailCard = document.createElement('div');
    detailCard.className = 'detail-card';

    // 이미지
    const fullImage = document.createElement('img');
    fullImage.src = item.galWebImageUrl;
    fullImage.className = 'detail-image';

    // 정보 컨테이너
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    // 제목
    const title = document.createElement('h2');
    title.innerText = item.galTitle;

    // 상세 정보
    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `
        <p><strong>장소:</strong> ${item.galPhotographyLocation}</p>
        <p><strong>촬영자:</strong> ${item.galPhotographer}</p>
        <p><strong>촬영 월:</strong> ${formatYearMonth(item.galPhotographyMonth)}</p>
        <p><strong>키워드:</strong> ${item.galSearchKeyword || '없음'}</p>
        <p><strong>콘텐츠 ID:</strong> ${item.galContentId}</p>
        <p><strong>생성 날짜:</strong> ${formatDateTime(item.galCreatedtime)}</p>
        <p><strong>수정 날짜:</strong> ${formatDateTime(item.galModifiedtime)}</p>
    `;

    // 뒤로가기 버튼
    const backButton = document.createElement('button');
    backButton.innerText = '목록으로 돌아가기';
    backButton.addEventListener('click', () => {
        detailSection.style.display = 'none';
        container.style.display = 'block';
    });

    // 모든 요소 추가
    infoContainer.appendChild(title);
    infoContainer.appendChild(details);
    infoContainer.appendChild(backButton);

    detailCard.appendChild(fullImage);
    detailCard.appendChild(infoContainer);

    detailSection.appendChild(detailCard);
}
