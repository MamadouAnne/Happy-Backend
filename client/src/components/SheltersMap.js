import React, { useEffect, useState } from 'react'
import mapMarkerImg from '../images/logo.svg';
import { Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/shelters-map.css';
import  { MapContainer, Marker, Popup }  from 'react-leaflet';
import {TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import logoImg from '../images/logo1.svg';


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

export default function SheltersMap() {

    const [ shelters, setShelters] = useState([])

    useEffect(() => {
        fetch('/api/v1/shelters')
            .then(res => res.json())
            .then(data => {
                setShelters(data)
            })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <Link to="/" >
                    <img src={logoImg} alt="happy" width="65%"/>
                    </Link>

                    <h2>Choose a shelter on the map</h2>
                    <p>Your new buddy is waiting for you :)</p>
                </header>

                <footer>
                    <strong>Atlanta area</strong>
                    <span>Georgia</span>
                </footer>
            </aside>

            <MapContainer 
                center={[33.8623597,-84.4697653]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
            >
            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

           {shelters.map(shelter => {
               return (
                <Marker 
                icon={mapIcon}
                position={[shelter.latitude, shelter.longitude]}
                key={shelter.id}
            >

                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                    {shelter.name}
                    <Link to={`/shelters/${shelter.id}`}>
                        <FiArrowRight size={20} color="#FFF"/>
                    </Link>
                </Popup>

            </Marker>
               )
           })}

            </MapContainer>

            <Link to="/shelters/create" className="create-shelter">
                <FiPlus size={32} color="FFF"/>
            </Link>
        </div>
    )
}
