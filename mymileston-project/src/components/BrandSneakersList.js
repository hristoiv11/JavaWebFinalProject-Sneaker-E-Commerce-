import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Container , Row} from "react-bootstrap"
import SneakerCard from './SneakerCard'

export default function BrandSneakersList(){

    const { state } =useLocation()
    const [sneakers, setSneakers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>{
        (async() =>{
            const response= await fetch(`http://localhost:8080/api/v1/brands/${state.brandId}/sneakers`,{
                method: "GET"
            });
        
            const result= await response.json()
            const sneakers = result.sneakers
            setSneakers(sneakers)
            setIsLoading(false)

    })();
}, []);


    if(isLoading){

        return<div><p>Loading ...</p></div>
    }
    
    return(
        <Container fluid className='p-4'>
            <Row sm={2} lg={4} className='justify-content-evently'>
            {sneakers && sneakers.map((sneaker)=> 
                <SneakerCard key={sneaker.sneakerId} sneaker={sneaker}/>
            )}
            </Row>
        </Container>
    )
}