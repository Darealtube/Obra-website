import {Container, Image, Jumbotron, Carousel, Card, Badge, Figure} from 'react-bootstrap'
import Nav_bar from './Components/Navbar'
import Side_bar from './Components/Sidebar'

const Home = () => {

return (
<div>
<div>
<Nav_bar/>
<div className="home">
 <div>
     <Side_bar/>
     <div className="content">
     <Container fluid>
     <Jumbotron fluid>
    <Container>
    <h1>Welcome to Canvas!</h1>
    <p>
      Here is where you find art, buy art, and mainly showcasing you artistic
      prowess to the whole world! Let's get started!
    </p>
    </Container>
    </Jumbotron>

 <h2>Featured</h2>
    <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://i.pinimg.com/originals/e9/bd/81/e9bd81d98dc19a00c725931a97a8de8e.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://th.bing.com/th/id/OIP.xOUiZxPOSwJMoKX1EynLagAAAA?pid=Api&w=172&h=229&c=7"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<br/>

<h2>New Art</h2>
  <div className="display-img">

  <Card>
  <Card.Img variant="top" src="https://i.pinimg.com/originals/e9/bd/81/e9bd81d98dc19a00c725931a97a8de8e.jpg" />
  <Card.Body>
    <Card.Title>Card Title <Badge variant="secondary">New</Badge></Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

<Card>
  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.xOUiZxPOSwJMoKX1EynLagAAAA?pid=Api&w=172&h=229&c=7" />
  <Card.Body>
    <Card.Title>Card Title <Badge variant="secondary">New</Badge></Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

<Card>
  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.xOUiZxPOSwJMoKX1EynLagAAAA?pid=Api&w=172&h=229&c=7" />
  <Card.Body>
    <Card.Title>Card Title <Badge variant="secondary">New</Badge></Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

<Card>
  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.xOUiZxPOSwJMoKX1EynLagAAAA?pid=Api&w=172&h=229&c=7" />
  <Card.Body>
    <Card.Title>Card Title <Badge variant="secondary">New</Badge></Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

<Card>
  <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.xOUiZxPOSwJMoKX1EynLagAAAA?pid=Api&w=172&h=229&c=7" />
  <Card.Body>
    <Card.Title>Card Title <Badge variant="secondary">New</Badge></Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

  </div>
  <br/>
  <h2>Rising Stars</h2><br/>
  <div className="display-img">
    <Figure>
    <Image src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" roundedCircle />
    <Figure.Caption style={{textAlign: "center"}}>
    Some F. Guy
    </Figure.Caption>
    </Figure>

    <Figure>
    <Image src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" roundedCircle />
    <Figure.Caption style={{textAlign: "center"}}>
    Some F. Guy
    </Figure.Caption>
    </Figure>

    <Figure>
    <Image src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" roundedCircle />
    <Figure.Caption style={{textAlign: "center"}}>
    Some F. Guy
    </Figure.Caption>
    </Figure>

    <Figure>
    <Image src="http://img.timeinc.net/time/daily/2012/1211/poy_benbernanke.jpg" roundedCircle />
    <Figure.Caption style={{textAlign: "center"}}>
    Some F. Guy
    </Figure.Caption>
    </Figure>
  </div>
    </Container>
     </div>
 
 </div>
 </div>
 <style tsx>{`
 .home{
     display: flex;
     flex-direction: column;
 }

 .content{
     margin-top: 1em;
     z-index: 0;
     margin-bottom: 6rem;
 }

  img{
    width: 50vw;
    height: 100vh;
  }

  .carousel-caption{
    z-index: 0;
  }

  .carousel-indicators{
    z-index:0;
  }

  .carousel-control-prev{
    z-index:0;
  }

  .carousel-control-next{
    z-index:0;
  }

  .card{
    margin-right: 1em;
    max-width: 100%;
    flex-basis: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .figure{
    margin-right: 1em;
    flex-basis: 50%;
  }

.display-img{
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

.display-img img{
  height: 30vh;
}

@media all and (min-width: 17.5em){
  .rounded-circle{
    height: 25vh;
    width: 65vw;
  }
}

@media all and (min-width: 20em){
  .rounded-circle{
    width: 50vw;
  }
}

@media all and (min-width: 48em){
  .rounded-circle{
    width: 40vw;
  }
  .card{
    flex-basis: 50%;
  }
}


@media all and (min-width: 64em){
  .content{
    margin-left: 20vw;
  }
  .card{
    flex-basis: 50%;
  }
 
}

@media all and (min-width: 85.375em){
  .rounded-circle{
    width: 20vw;
  }
}


 `}
 </style>
</div>
</div>
);
}

export default Home;