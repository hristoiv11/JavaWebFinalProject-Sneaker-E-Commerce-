import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

export default function EditSneaker(props) {
  
  const {sneaker, updateSneaker,brandOptions} = props;
  const [show, setShow] = useState(false);

  const [model,setModel] = useState(sneaker.model)
  const [price,setPrice] = useState(sneaker.price)
  const [releaseYear , setReleaseYear] = useState(sneaker.releaseYear)
  const [availableStore,setAvailableStore] = useState(sneaker.availableStore)
  const [imageURL, setImageURL] = useState(sneaker.imageURL)
  const [brandName, setBrandName] = useState(sneaker.brand.name)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const years = _.range(1888, new Date().getFullYear() + 1).reverse();

  const handleSubmit = (event) =>{
    console.log("hello from edit ")
    event.preventDefault() // prevents refresh
    console.log(event)
    console.log("Model is:" + model)
    console.log("Price is:" + price)
    console.log("ReleaseYear is:" + releaseYear)
    console.log("Available Store is:" + availableStore)
    console.log("ImageUrl is:" + imageURL)
    console.log("Brand is:" + brandName)

    var brand = brandOptions.find(brand => brand.name === brandName)
    console.log("In editSneaker. BrandId is: " + brand.brandId)  
    
    updateSneaker({sneakerId: sneaker.sneakerId, model:model,price:price,releaseYear: releaseYear,availableStore:availableStore,imageURL: imageURL,
    brand: brand})
    
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Sneaker 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Sneaker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="editmodal" onSubmit={handleSubmit}>

      
      <Form.Group className="mb-3" controlId="formGridModel">
        <Form.Label>Model</Form.Label>
        <Form.Control value={model} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setModel(e.target.value)
                    }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control value={price} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setPrice(e.target.value)
                    }}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridReleasedYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Select required value={releaseYear} 
                        onChange={(e) => {
                            setReleaseYear(e.target.value)
                        }}
          >
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
        <Form.Control value={availableStore} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setAvailableStore(e.target.value)
                    }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImageURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control value={imageURL} 
                      type="url" 
                      onChange={(e) => {
                        setImageURL(e.target.value)
                      }}

        />
      </Form.Group>

      <Row className="mb-3">
    
        <Form.Group as={Col} controlId="formGridBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Select required value={brandName}
                        onChange={(e) => {
                            setBrandName(e.target.value)
                        }}
          >
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
          <Button form ="editmodal" variant="primary" type="submit">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
