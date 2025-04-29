import showDetail from "./showDetail.js"

const baseURL ="http://apis.data.go.kr/B551011/PhotoGalleryService1"

const option = {
    serviceKey:
      "Jba4dQ%2Fm9Ivn2ZQZPoSd9EeHw23n2cSvdPMDvuIQRfA8f861k5oPSR4SWNML8HaTpfQ0zrcF7Metxwc5DrmPXw%3D%3D",
    numofRows: 6,
    MobileApp: "test",
    MobileOS: "ETC",
    arrange: "A",
    _type: "json",
  };

const container = document.getElementById('container');
const detailSection = document.createElement('div');
detailSection.id = 'detail-section';
detailSection.style.display = 'none';
document.body.appendChild(detailSection);

//무작위 페이지 넘버 생성
function getRandomNumber() {
  return Math.floor(Math.random() * 970);
}

let count = getRandomNumber();

async function getData() {
 const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${count}&serviceKey=${option.serviceKey}`

 const fetchData = await fetch(url);
//  console.log(fetchData)

 const toJson = await fetchData.json();
//  console.log(toJson);

 const data = await toJson.response.body.items.item;
 console.log(data);

 data.map((data,i)=>{
    const list = document.createElement('div');
    list.id = 'list';

    const image = document.createElement('img');
    image.src = data.galWebImageUrl;

    const info = document.createElement('span');
    info.innerText=`
    ${i+1}번째 사진
    제목 : ${data.galTitle}
    장소 : ${data.galPhotographyLocation}
    `;

    list.appendChild(image);
    list.appendChild(info);

    container.appendChild(list);

    const button = document.createElement('button')
    button.innerText = "더보기"

    button.addEventListener('click', () => {
      showDetail(data);
  });

    list.appendChild(button);
 })
}




// 페이지 로드 시 데이터 가져오기
getData();