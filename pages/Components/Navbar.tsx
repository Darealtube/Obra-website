import Link from 'next/link'
import {Navbar, Nav, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav_bar = () => {

return (
<div>
<Navbar className="Navbar" style={{backgroundColor: "#56cfe1"}} expand="lg">
  <Navbar.Brand><span className="titles">Canvas</span></Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link className="home" style={{"color": "#7400b8"}}>Home</Nav.Link>
    </Nav>
    <Form>
      <Button style={{"color": "#7400b8", marginLeft:"1em"}} variant="dark"><Link href="/">Logout</Link></Button>
    </Form>
  </Navbar>

  <style jsx>{`
  *{
    color: #7400b8;
    position: relative;
    width: 80vw;
  }
  
  .home{
    padding-right: 1em;
    padding-left: 1em;
  }

  @media all and (min-width: 17.5em){
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100vw;
    max-width:100%;
  }

  @media all and (min-width: 64em){


    .titles{
      display: none;
    }
  }
    `}</style>
</div>
);
}


export default Nav_bar;