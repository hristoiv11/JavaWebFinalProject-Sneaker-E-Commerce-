import {Card,Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EditBrand from './EditBrand';

export default function BrandCard(props){

    const {brand, updateBrand,onDeleteBrandHandler} = props

    const onDelete = () =>{
        onDeleteBrandHandler(brand.brandId)
    }

    return(
        
        <div className="backgroundBrand" type="button">
        <Card>
        <LinkContainer to={"/brandsneakers"} state={brand}>
            <Card.Img src={brand.imageURL}/>
            </LinkContainer>
            <Card.Body className="brandcard">
                <Card.Title>{brand.name}</Card.Title>
                <Card.Text>
                    <strong>Name:</strong> {brand.name}
                    <br></br>
                    <strong>Accosiated Celebrity:</strong> {brand.associatedCelebrity}
                    <br></br>
                    <strong>Founder Name:</strong> {brand.founderName}
                    <br></br>
                    <strong>Date of Birth:</strong> {brand.dob}
                    <br></br>
                    <strong>Country:</strong> {brand.country}
                    <br></br>
                    <strong>Location of main headquarters:</strong> {brand.locationOfMainHeadquarters}
                </Card.Text>

                {window.location.pathname==="/brands" &&
                <>
                
                <EditBrand brand = {brand} updateBrand={updateBrand}/>
                <Button variant="danger" onClick={onDelete}>Delete</Button>

                </>
                }
            </Card.Body>
        </Card>
        </div>
    )
}