import '@tomtom-international/web-sdk-maps/dist/maps.css'
import {  useState, useEffect, useRef } from 'react';
import * as  tt from '@tomtom-international/web-sdk-maps'
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(-0.0166666);
  const [longitude, setLongitude] = useState(34.5999976);

const mapElement = useRef()
const [map, setMap] = useState({});
  useEffect(() => {  

      let map= tt.map({
        key: process.env.REACT_APP_TOM_TOM_API_KEY,
        container:mapElement.current,
        stylesVisibility:{
          trafficFlow:true,
          trafficIncidents:true
        },
        center: [longitude, latitude],
        zoom: 14
      })
      setMap(map)
      const addMarker=()=>{
        const element =document.createElement('div')
        element.className='marker'
         const marker = new tt.Marker({
          draggable: true,
          element: element
         })
         .setLngLat([longitude,latitude])
         .addTo(map)

         marker.on('dragend', ()=>{
            const lonlat = marker.getLngLat()
            setLatitude(lonlat.lat)
            setLongitude(lonlat.lng)
         })

      }

      addMarker()
      return()=> map.remove()

   },[longitude,latitude])
  return (
   <> {map && <div className="App">
       <div ref={mapElement} className="map"></div>
       <div className='search-bar'></div>
    </div>}
    </>
  );
}

export default App;
