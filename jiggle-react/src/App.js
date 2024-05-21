import React, { useState, useEffect } from 'react';
import './App.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

// 앱 시작 및 지도 불러오기
const App = () => {
  // States
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665, // Default latitude
    lng: 126.9780 // Default longitude
  });
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [article, setArticle] = useState([]);


  // Data(Article) Import & Setting
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/articles');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
        }
        const result = await response.json();
        setArticle(result);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchData();
  }, []);

  // Construct Map Client
  const loadKakaoMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=e79556f2be7e77f4c94bdf02fb4ee96a&libraries=services`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('kakao maps script loading failed'));
        document.head.appendChild(script);
      }
    });
  };

  // 지도 state 관리
  useEffect(() => {
    const initKakaoMap = async () => {
      try {
        await loadKakaoMapScript();
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setCurrentAddress(result[0].address.address_name.split("동")[0]+"동"); // 상단 내비게이션 바에 현재 위치 표시
            }
          });
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    initKakaoMap();
  }, []);

  // CardView 클릭 시 작동하는 함수
  const handleCardClick = (item) => {
    if (expandedArticle && expandedArticle.id === item.id) {
      setExpandedArticle(null); // 이미 확장된 카드를 클릭하면 축소
    } else {
      setExpandedArticle(item); // 새로운 카드를 확장
    }
  };

  return (
    <div>
      <div className='navbar'>
        <div className='logo-container'>
          <img className='logo' src={`${process.env.PUBLIC_URL}/img/logo.JPG`} alt="Logo"/>
          <div className='text-light'>읽을 거리</div>
        </div>
        <div className='address'>{currentAddress}</div>
      </div>
      <div className='container'>
        <div className='list-view'>
        {/* Start of Cardviews */}
        {article.map((item, index) => (
            <div key={index} className={`card mb-3 ${expandedArticle && expandedArticle.id === item.id ? 'card-expanded' : ''}`} onClick={() => handleCardClick(item)}>
              <img src={item.image || "https://via.placeholder.com/150"} className="img-fluid rounded-start" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{item.placeName}</h5>
                <p className="card-text">{item.address}</p>
                <p className='card-text'>{item.comment}</p>
                <p className="card-text"><small className="text-body-secondary">Rating: {item.rate}</small></p>
              </div>
            </div>
          ))}
        </div>
        {/* End of Cardviews */}
        {expandedArticle && (
            <div className="expanded-view">
              <h5>Expanded Content</h5>
              <iframe src={expandedArticle.link} title='expandArticle' style={{ width: '100%', height: '100%', border: 'none '}}></iframe>
            </div>
        )}
        <div className='map-container'>
          {/* Start of Map */}
          <Map
            center={{ lat: currentPosition.lat, lng: currentPosition.lng }}
            style={{ width: '100%', height: '100%' }}
          >
            <MapMarker position={{ lat: currentPosition.lat, lng: currentPosition.lng }} />
          </Map>
          {/* End of Map */}
        </div>
      </div>
    </div>
  );
};

export default App;
