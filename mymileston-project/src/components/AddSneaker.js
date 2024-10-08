import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash'

export default function AddSneaker({addSneaker, brandOptions}) {
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const years = _.range(1888, new Date().getFullYear() + 1).reverse()

  const handleSubmit = (event) =>{
    console.log("hello from addSneaker")
    event.preventDefault() // prevents refresh
    console.log(event)
    console.log("Model is:" + event.target[0].value)
    console.log("Price is:" + event.target[1].value)
    console.log("ReleaseYear is:" + event.target[2].value)
    console.log("Available Store is:" + event.target[3].value)
    console.log("ImageUrl is:" + event.target[4].value)
    console.log("Brand is:" + event.target[5].value)

    const model = event.target[0].value;
    const price = event.target[1].value;
    const releaseYear = event.target[2].value;
    const availableStore = event.target[3].value;
  
    //if posterURL isnull, maybe add a default image
    var url="https://static.thenounproject.com/png/4974686-200.png"
  
    if(event.target[4].value && event.target[4].value !== ""){
      url = event.target[4].value;
    }
  
    //get brandId
    var brand = brandOptions.find(brand => brand.name 
      === event.target[5].value)
      
      //callback function in SneakersList
      addSneaker(model,price,releaseYear,availableStore,url,brand.brandId)
      
      handleClose()
  }

  return (
    <>
    <div className="mx-auto" style={{width:'25%',paddingBottom:'1rem',paddingTop:'1rem'}} >
      <Button variant="dark" style={{width:'100%'}} onClick={handleShow}>
        Add Sneaker
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Sneaker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="addmodal" onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formGridModel">
        <Form.Label>Model</Form.Label>
        <Form.Control placeholder="Model" required
            type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control placeholder="Price" required
            type="text"
        />
      </Form.Group>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridReleasedYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Select required defaultValue="Choose...">
            <option value="">Choose...</option>
            {years.map((year, i) => {
                return (
                    <option key={i} value={year}>
                        {year}
                    </option>
                )
            })}
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAvailableStore">
        <Form.Label>Available Store</Form.Label>
        <Form.Control placeholder="Available Store" type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImageURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control placeholder="http://example.com" type="url" />
      </Form.Group>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Select required defaultValue="Choose...">
            <option value="">Choose...</option>
            {brandOptions && brandOptions.map((brand, i) => {
                return (
                    <option key={i} value={brand.name}>
                        {brand.name}
                    </option>
                )
            })}
          </Form.Select>
          </Form.Group>
          </Row>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="addmodal" variant="primary" type="submit">Submit</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

