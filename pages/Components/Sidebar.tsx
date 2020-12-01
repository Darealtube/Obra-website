import {Navbar, Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faPalette, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

const Side_bar = () => {

return (
<div>
<div className="sidebar">
    
<Nav fill>
    <div className="titles">
    <Nav.Item >
        <Navbar>
            <Navbar.Brand style={{color: "blue", fontSize: "3em"}}>Canvas</Navbar.Brand>
        </Navbar>
    </Nav.Item>
    </div>
    <br/>
    <Nav.Item>
        <Nav.Link><FontAwesomeIcon icon={faFire} style={{fontSize: "2.5em"}}/><span className="Label">Trending</span></Nav.Link>
    </Nav.Item>

    <Nav.Item>
        <Nav.Link><FontAwesomeIcon icon={faPalette} style={{fontSize: "2.5em"}}/><span className="Label">Gallery</span></Nav.Link>
    </Nav.Item>

    <Nav.Item>
        <Nav.Link><FontAwesomeIcon icon={faEnvelope} style={{fontSize: "2.5em"}}/><span className="Label">Messages</span></Nav.Link>
    </Nav.Item>

    <Nav.Item>
        <Nav.Link><FontAwesomeIcon icon={faCog} style={{fontSize: "2.5em"}}/><span className="Label">Settings</span></Nav.Link>
    </Nav.Item>
</Nav>
</div>


  <style jsx>{`
  
 .sidebar{
    background: #020402;
    width: 100vw;
    height: 10vh;
    position: fixed;
    bottom: 0;
    text-align: center;
    z-index: 2;
 }

 .Label{
     margin-left: 1em;
     font-size: 1.5em;
 }

 @media all and (min-width: 17.5em){
     .Label{
         display: none;
     }
     .titles{
         display: none;
     }
 }

 @media all and (min-width: 25.6875em){
    .sidebar{
        height: 8vh;
    }
 }

 @media all and (min-height: 50.75em){
     .sidebar{
         height: 8vh;
     }
 }

 @media all and (min-width: 48em){
     .sidebar{
         height: 6vh;
     }

     .Label{
         display: inline;
     }
 }

 @media all and (min-width: 64em){
     .sidebar{
        width: 20vw;
        position: fixed;
        left: 0;
        height: 100vh;
     }

     .titles{
         display: block;
     }
 }
    `}</style>
</div>
    );
}

export default Side_bar;