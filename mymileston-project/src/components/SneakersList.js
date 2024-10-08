import SneakerCard from "./SneakerCard"
import AddSneaker from "./AddSneaker"
import { Container , Row} from "react-bootstrap"
import { useState,useEffect, useRef} from "react"
import { errorToast, successToast } from "../utils/toasts";

export default function SneakersList(){

    const[sneakers,setSneakers] = useState(null);
    const[isLoading, setIsLoading] = useState(true);
    const[brandOptions, SetBrandOptions] = useState(null)

    const initialized = useRef(false)

    useEffect(()=> {

        if(!initialized.current)
        initialized.current = true 

        getAllSneakers()
        getBrandOptions()
    }, []);

    function getAllSneakers(){

        (async() => {
            
        const response = await fetch("http://localhost:8080/api/v1/sneakers",{
        method: "GET"
        });
            
            console.log(response)
            const sneakers = await response.json()
            console.log(sneakers)
            setSneakers(sneakers)
            setIsLoading(false)
                    })();
    }

    function getBrandOptions(){
        (async() => {

            const response = await fetch("http://localhost:8080/api/v1/brands",{
                method: "GET"
            });
    
            console.log(response)
            const brands = await response.json()
            console.log(brands)
            SetBrandOptions(brands)
        })();
    }

    if(isLoading){
        return <div><h1>Loading..</h1></div>
    }

    function updateSneaker(updatedSneaker){
        console.log("updateSneaker in SneakerList")
        console.log(updatedSneaker)
        console.log("Brand is: " + updatedSneaker.brand.brandId)

        var sneakerRequestDTO = { 
            model: updatedSneaker.model,
            price: updatedSneaker.price,
            releaseYear: updatedSneaker.releaseYear,
            availableStore: updatedSneaker.availableStore,
            imageURL : updatedSneaker.imageURL,
            brandId: updatedSneaker.brand.brandId,

        }

        console.log("SneakerRequestDTO brandId: " + sneakerRequestDTO.brandId)

        fetch(`http://localhost:8080/api/v1/sneakers/${updatedSneaker.sneakerId}`,
        {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sneakerRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers
            .get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log("data is: " + data.imageURL)

            //check for error
            if(!response.ok){
                const error = (data && data.message) ||
                response.status;
                console.log("post error occured")
                return Promise.reject(error);
            }

            getAllSneakers();
            successToast("Update successful!")

        })
    }

    async function deleteSneakerHandler(sneakerId){

        const response= await fetch(`http://localhost:8080/api/v1/sneakers/${sneakerId}`,{
            method: 'DELETE',
            headers: {
                
                'Content-Type': 'application/json'
            },
            
        })
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');

            if(response.status === 204){
                getAllSneakers()
                successToast("Delete successful!")
                
            }else if(response.status===422){

                errorToast("The Delete wasn't successful")
            }


        })
        .catch(function(error){
            console.log("an unknown error occured")
            return Promise.reject(error)
        })
    }

    function addSneaker(model,price,releaseYear,availableStore,imageURL,brandId){
        console.log("SneakersList addSneaker")

        var sneakerRequestDTO={
            model: model,
            price: price,
            releaseYear: releaseYear,
            availableStore: availableStore,
            imageURL : imageURL,
            brandId: brandId,

        }

        fetch("http://localhost:8080/api/v1/sneakers",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sneakerRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers
            .get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log("data is: " + data.imageURL)

            //check for error
            if(!response.ok){
                const error = (data && data.message) ||
                response.status;
                console.log("post error occured")
                return Promise.reject(error);
            }

            getAllSneakers();
            successToast("Add successful!")

        })
    }
    
    return(
        <Container fluid className="backgroundSneaker">
            <AddSneaker className="buta" addSneaker={addSneaker} brandOptions={brandOptions}/>
            <Row sm={2} lg={4} className='justify-content-evently'>
            {sneakers && sneakers.map((sneaker)=> 
            
                <SneakerCard key={sneaker.sneakerId} 
                           sneaker={sneaker}
                           updateSneaker={updateSneaker}
                           brandOptions={brandOptions}
                           onDeleteSneakerHandler={deleteSneakerHandler}/>

            )}
            </Row>
        </Container>
    )
}