import {useLocation} from 'react-router-dom';
import BrandCard from './BrandCard';
import { Container, Row } from 'react-bootstrap'

export default function SneakerBrandList(){

    const{ state } = useLocation();

    return(

            <Container fluid className='p-4'>
                <Row sm={2} lg={4} className='justify-content-evently'>
                    <BrandCard brand={state.brand}/>
                </Row>
            </Container>
        
    );
}