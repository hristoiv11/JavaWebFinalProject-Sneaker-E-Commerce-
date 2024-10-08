import { useState,useMemo ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import countryList from 'react-select-country-list';

export default function EditBrand(props) {

  const {brand, updateBrand} = props;
  const [show, setShow] = useState(false);
  
  const countries = useMemo(() => countryList().getData(), [])

  const [name,setName] = useState(brand.name)
  const [associatedCelebrity,setAssociatedCelebrity] = useState(brand.associatedCelebrity)
  const [founderName,setFounderName] = useState(brand.founderName)
  const [dob, setDob] = useState(brand.dob)
  const [country, setCountry] = useState(brand.country)
  const [locationOfMainHeadquarters, setLocationOfMainHeadquarters] = useState(brand.locationOfMainHeadquarters)
  const [imageURL, setImageURL] = useState(brand.imageURL)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const years = _.range(1888, new Date().getFullYear() + 1).reverse();

    const handleSubmit = (event) =>{
      console.log("hello from edit ")
      event.preventDefault() // prevents refresh
      console.log(event)
      console.log("Name is:" + name)
      console.log("Associated Celebrity is:" + associatedCelebrity)
      console.log("Founder Name is:" + founderName)
      console.log("Date of birth is:" + dob)
      console.log("Country is:" + country)
      console.log("Main location is:" + locationOfMainHeadquarters)
      console.log("ImageUrl is:" + imageURL) 
    
      
      updateBrand({brandId: brand.brandId, name:name,associatedCelebrity:associatedCelebrity,founderName:founderName,dob:dob,country:country,locationOfMainHeadquarters:locationOfMainHeadquarters,imageURL: imageURL
        ,brand:brand})
      
      handleClose();
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Brand 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="editmodal" onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={name} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setName(e.target.value)
                    }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAssociatedCelebrity">
        <Form.Label>Associated Celebrity</Form.Label>
        <Form.Control value={associatedCelebrity} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setAssociatedCelebrity(e.target.value)
                    }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridFounderName">
        <Form.Label>Founder Name</Form.Label>
        <Form.Control value={founderName} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setFounderName(e.target.value)
                    }}
        />
      </Form.Group>

      <Row className="mb-3">

      <Form.Group as={Col} controlId="formGridDoB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date"
          required value={dob}
          onChange={(e) =>{
            setDob(e.target.value)
          }}
          
          max={new Intl.DateTimeFormat('en-Ca').format(new Date())}/>
          </Form.Group> 

        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Select required value={country}
                        onChange={(e) =>{
                          setCountry(e.target.value)
                        }}
          >
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
        <Form.Label>Location of Main Headquarters</Form.Label>
        <Form.Control value={locationOfMainHeadquarters} 
                    required
                    type="text" 
                    onChange={(e) => {

                        setLocationOfMainHeadquarters(e.target.value)
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
