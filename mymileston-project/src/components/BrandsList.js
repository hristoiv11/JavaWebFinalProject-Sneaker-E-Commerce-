import BrandCard from "./BrandCard"
import AddBrand from "./AddBrand"
import { Container , Row} from "react-bootstrap"
import { useState,useEffect,useRef } from "react"
import { errorToast,successToast } from "../utils/toasts";

export default function BrandsList(){

    const[brands,setBrands] = useState(null);
    const[isLoading, setIsLoading] = useState(true);
    const[brandOptions, SetBrandOptions] = useState(null)

    const initialized = useRef(false)

    useEffect(()=> {

        if(!initialized.current)
        initialized.current = true 

        getAllBrands()
        getBrandOptions()
    }, []);

    function getAllBrands(){
        (async() => {

            const response = await fetch("http://localhost:8080/api/v1/brands",{
                method: "GET"
            });

            console.log(response)
            const brands = await response.json()
            console.log(brands)
            setBrands(brands)
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

    function addBrand(name,associatedCelebrity,founderName,dob, country,locationOfMainHeadquarters,imageURL){
        console.log("Brand List addBrand")

        var brandRequestDTO = {
            //left => backened
            //right => prop mentionned above
            name: name,
            associatedCelebrity:associatedCelebrity,
            founderName:founderName, //this will match out props name defined above while the left one should match the backend name
            dob: dob,
            country: country,
            locationOfMainHeadquarters:locationOfMainHeadquarters,
            imageURL: imageURL,
        }

        fetch("http://localhost:8080/api/v1/brands", {
            method: 'POST',
            //header will define what is the format of the data we'll send and recieve
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(brandRequestDTO)
        })
        //if async isnt use, the app could freeze while waiting for response. async will say when u recieve a response, send it to us and while we wait we can still work. Async allows us to not wait and continue working.
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json'); //the ? is like an option operation meaning that its possible tha we dont recieve a content-type.
            const data = isJson && await response.json();
            console.log("data is: "+ data.name)

            //check for error
            if(!response.ok){
                const error = (data && data.message) || response.status;
                console.log("post error occured")
                return Promise.reject(error);
            }

            getAllBrands()
            successToast("Add successful!")

        })
    }

    function updateBrand(updatedBrand){
        console.log("updateBrand in BrandsList")
        console.log(updatedBrand)
        console.log("Brand is: " + updatedBrand.brand.brandId)

        var brandRequestDTO = { 
            name: updatedBrand.name,
            associatedCelebrity: updatedBrand.associatedCelebrity,
            founderName: updatedBrand.founderName,
            dob: updatedBrand.dob,
            country: updatedBrand.country,
            locationOfMainHeadquarters: updatedBrand.locationOfMainHeadquarters,
            imageURL : updatedBrand.imageURL,
            brandId: updatedBrand.brand.brandId
           

        }

        console.log("BrandRequestDTO brandId: " + brandRequestDTO.brandId)

        fetch(`http://localhost:8080/api/v1/brands/${updatedBrand.brandId}`,
        {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(brandRequestDTO)
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

            getAllBrands();
            successToast("Update successful!")

        })
    }

    async function deleteBrandHandler(brandId){

        const response= await fetch(`http://localhost:8080/api/v1/brands/${brandId}`,{
            method: 'DELETE',
            headers: {
                
                'Content-Type': 'application/json'
            },
            
        })
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');

            if(response.status === 204){
                getAllBrands()
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

    return(
        <Container fluid className="backgroundBrand">
            <AddBrand addingBrand={addBrand} brandOptions={brandOptions}/>
            <Row sm={2} lg={4} className='justify-content-evently'>
            {brands && brands.map((brand)=> 
            
                <BrandCard key={brand.brandId} 
                           brand={brand}
                           updateBrand={updateBrand}
                           brandOptions={brandOptions}
                           onDeleteBrandHandler={deleteBrandHandler}
                
                />

            )}
            </Row>
        </Container>
    )
}