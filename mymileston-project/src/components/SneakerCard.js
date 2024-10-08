import {Card, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EditSneaker from './EditSneaker';

export default function SneakerCard(props){

    const {sneaker, updateSneaker, brandOptions,onDeleteSneakerHandler} = props

    const onDelete = () =>{
        onDeleteSneakerHandler(sneaker.sneakerId)
    }
    return(
        
        <div type="button" className="backgroundSneaker" >
        <Card>
        <LinkContainer to="/sneakerbrand" state={sneaker}>
            <Card.Img src={sneaker.imageURL} />
            </LinkContainer>
            <Card.Body className="sneakercard">
                <Card.Title>{sneaker.model}</Card.Title>
                <Card.Text>
                    <strong>Model:</strong> {sneaker.model}
                    <br></br>
                    <strong>Price:</strong> {sneaker.price}
                    <br></br>
                    <strong>Release Year:</strong> {sneaker.releaseYear}
                    <br></br>
                    <strong>Available Store:</strong> {sneaker.availableStore}
                </Card.Text>

                
                {window.location.pathname==="/sneakers" &&
                <>

                <EditSneaker sneaker = {sneaker} updateSneaker={updateSneaker} brandOptions={brandOptions}/>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
                </>
                }
            </Card.Body>
        </Card>
        </div>
        
    )
}
