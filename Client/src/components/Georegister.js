import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { Link } from 'react-router-dom';

export default function Georegister() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);
    const [showLink, setShowLink] = useState(false);
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
                                    <div style={{margin:15}} className="col-12 text-success">The account should be associated to your location for recommandation future</div>
                                            <div className="col-12">
                                        <button type='button' onClick={handleDisplaylocation} className='btn btn-success'>
                                                View location
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
