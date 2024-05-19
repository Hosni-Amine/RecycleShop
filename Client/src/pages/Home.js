import React, { useContext, useState, useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import { AppContext } from '../index.js';
import Geo from "../components/Geo.js";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        0.5 - Math.cos(dLat)/2 + 
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        (1 - Math.cos(dLon))/2;
  
    return R * 2 * Math.asin(Math.sqrt(a));
}

export default function Home(){    
    const { productList } = useContext(AppContext);
    const [coordinates, setCoordinates] = useState(null);
    const [name, setName] = useState('');
    const [filteredProductList, setFilteredProductList] = useState(productList);
    const [filtred, setFiltred] = useState(productList);

    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword === "" && !coordinates) {
            setFiltred(productList);
        }
        else if (keyword === "" && coordinates){
            setFiltred(filteredProductList);
        } else {
            const results = filteredProductList.filter((product) => {
                return product.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFiltred(results);
        }

        setName(keyword);
    };
      
    const handleCoordinatesUpdate = (coords) => {
        setCoordinates(coords)
    };
    useEffect(() => {
        if (coordinates==null && name==="") {
            setFiltred(productList)
            setFilteredProductList(productList)
            console.log(filtred)
            return;
        }else if (!(coordinates==null) && name===""){
            const updatedProductList = productList.map(product => ({
                ...product,
                distance: calculateDistance(coordinates.latitude, coordinates.longitude, product.seller.location.latitude, product.seller.location.longitude)
            }));
            const sortedProducts = [...updatedProductList].sort((a, b) => a.distance - b.distance);
            setFiltred(sortedProducts);  
            setFilteredProductList(sortedProducts)
        }
    }, [coordinates]);

    useEffect(() => {
        setFiltred(productList);
    }, [productList]);

    return(
        
        <div >
          <div className="container">
          <div className="row justify-content-center align-items-center " style={{ margin: '0px -3px 17px -3px', borderRadius: '10px' }}>
            <div className="col-12 d-flex justify-content-center" >   
                
                <div className="card1" style={{margin:"27px 0px"}}>
                    <span>Products</span>
                    <h3>By miled</h3>
                </div>
                </div>        
                </div>        
            <div className="row justify-content-center align-items-center rounded border shadow p-4 text-center h-100" style={{  margin: '0px -3px 17px -3px', borderRadius: '10px' }}>

                <div className="col-md-12 col-xl-8 col-lg-8 col-sm-12 " style={{marginTop:7}} >   
                <div class="coolinput">
                    <label for="input" class="text">Search</label>
                        <input value={name} onChange={filter} type="text" placeholder="Write here..." name="input" class="input"/>
                    </div>
                 </div>
                <div className="col-md-6 col-xl-4 col-lg-4 col-sm-6 d-flex justify-content-center">
                    <Geo onCoordinatesUpdate={handleCoordinatesUpdate} />
                </div>
            </div>
            <div className="row g-2 d-flex justify-content-center  gray mb-5 rounded border shadow p-4 text-center h-100" style={{ minHeight:'50px', padding: '10px', borderRadius: '10px' }}>
                {filtred.map((product, index) => (
                    <div key={index} className="parent-container col-md-12 col-xl-4 col-lg-4 col-sm-12">
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
          </div>
        </div>
    )
}
