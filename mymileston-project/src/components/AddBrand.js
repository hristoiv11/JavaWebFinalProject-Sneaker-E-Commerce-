import { useState,useMemo, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash'
import countryList from 'react-select-country-list';

export default function AddBrand({addingBrand}) {
  
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const countries = useMemo(() => countryList().getData(), [])

    const handleSubmit = (event) =>{
      console.log("hello from AddBrand")
      event.preventDefault() // prevents refresh
      console.log(event)
      console.log("Name is:" + event.target[0].value)
      console.log("Associated Celebrity is:" + event.target[1].value)
      console.log("Founder Name is:" + event.target[2].value)
      console.log("Dob is:" + event.target[3].value)
      console.log("Country is:" + event.target[4].value)
      console.log("Location of main headquarters is:" + event.target[5].value)
      console.log("ImageUrl is:" + event.target[6].value)
      
      const name = event.target[0].value;
      const associatedCelebrity = event.target[1].value;
      const founderName = event.target[2].value;
      const dob = event.target[3].value;
      const country = event.target[4].value;
      const locationOfMainHeadquarters = event.target[5].value;

      //if posterURL isnull, maybe add a default image
      var imageURL="https://static.thenounproject.com/png/4974686-200.png"

      if(event.target[6].value && event.target[6].value !== ""){
        imageURL = event.target[6].value;
      }

      //get directorId
    //   var director = directorOptions.find(director => director.name 
    //     === event.target[3].value)
        
        //callback function in MoviesList
        //addMovie(event.target[0].value, url, event.target[2].value, director.directorId)
        addingBrand(name,associatedCelebrity,founderName,dob,country,locationOfMainHeadquarters,imageURL)
        
        handleClose()
    }

  return (
    <>
    <div className="mx-auto" style={{width:'25%',paddingBottom:'1rem',paddingTop:'1rem'}} >
      <Button variant="dark" style={{width:'100%'}} onClick={handleShow}>
        Add Brand 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="addmodal" onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Brand Name" required
            type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAssociatedCelebrity">
        <Form.Label>Associated Celebrity</Form.Label>
        <Form.Control placeholder="Associated Celebrity" required
            type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridFounderName">
        <Form.Label>Founder Name</Form.Label>
        <Form.Control placeholder="Founder Name" required
            type="text"
        />
      </Form.Group>

      <Row className="mb-3">

      <Form.Group as={Col} controlId="formGridDoB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date"
          required 
          
          max={new Intl.DateTimeFormat('en-Ca').format(new Date())}/>
          </Form.Group> 

        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Select required defaultValue="Choose...">
            <option value="">Choose...</option>
            {countries.map((country, i) => {
                return (
                    <option key={i} value={country.label}>
                        {country.label}
                    </option>
                )
            })}
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridLocationOfMainHeadquarters">
        <Form.Label>Main Headquarters</Form.Label>
        <Form.Control placeholder="Main Headquarters" required
            type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridBrandURL">
        <Form.Label>Brand URL</Form.Label>
        <Form.Control placeholder="http://example.com" type="url" />
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form ="addmodal" variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

