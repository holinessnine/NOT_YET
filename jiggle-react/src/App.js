import React, { useState, useEffect } from 'react';
import './App.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const App = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665, // Default latitude
    lng: 126.9780 // Default longitude
  });

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
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* --- End of Card 1 */}
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* --- End of Card 2 */}
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* --- End of Card 3 */}
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* --- End of Card 4 */}
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* --- End of Card 5 */}
          <div className="card mb-3">
            <img src="https://via.placeholder.com/150" className="img-fluid rounded-start" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Card title5</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>

        {/* End of Cardviews */}
        </div>
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
