import React, { useContext,useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { UserContext } from '../index';
import axios from 'axios';

export default function UpdateGeo() {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);
    const [showLink, setShowLink] = useState(false);
    const { currentUser,setcurrentUser } = useContext(UserContext);
    const [showGreenText, setShowGreenText] = useState(false);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            watchPosition: geolocationEnabled, // Watch for position updates when geolocationEnabled is true
        });


    const handleDisplaylocation = () => {
        const { latitude, longitude } = coords;
            window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
        };

        const handleUpdatelocation = async () => {
                if (!coords) {
                    return;
                }
                const { latitude, longitude } = coords;
                const locationData = {
                    latitude,
                    longitude,
                    userid: currentUser.id
                };
                try {
                    const response = await axios.post(`${BASE_URL}/updatelocation`, locationData);
                    console.log(response.data); 
                    window.alert(response.data.message)
                } catch (error) {
                    console.error('Error updating location:', error);
                }
            };


    useEffect(() => {
        setShowGreenText(true);
        const timeoutId = setTimeout(() => {
            setShowGreenText(false);
            setShowLink(true); 
        }, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div>
            {!isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : (
                <div>
                    {showLink && (
                        <div>
                            {!coords ? (
                                <div>
                                    <button type='button' className='btn btn-danger'>
                                            open the location autorisation
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div style={{margin:15}} className="col-12 text-success">The account definitely associated to your last updated location </div>
                                            <div className="col-12">
                                                <button style={{margin:15}} type='button' onClick={handleDisplaylocation} className='btn btn-success'>
                                                        View new location
                                                </button>
                                                <button style={{margin:15}} type='button' onClick={handleUpdatelocation} className='btn btn-primary'>
                                                Update new location
                                            </button>
                                            </div>
                                    </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );  
}
