import Link from 'next/link'
import Head from 'next/head'
import { Form, Container, Row, Col, Button} from 'react-bootstrap'



const Register = () => {

return(
<div className="register-div">
 <Head>
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 </Head>
 <div className="register-form">
    <Container fluid className="form">
        <div className="title">
        Canvas
        </div>
        <br/>
        <Form>
            <Form.Group controlId="register1">
            <Form.Row>
            <Col xs={6}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username"></Form.Control>
            </Col>

            <Col xs={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email"></Form.Control>
            </Col>
            </Form.Row>
            </Form.Group>

            <Form.Group controlId="register2">
            <Form.Row>
                <Col xs={4}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Col>
                <Col xs={2}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" min="13" max="100"></Form.Control>
                </Col>
                <Col xs={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control placeholder="Optional" />
                </Col>
            </Form.Row>
            </Form.Group>

            <Form.Group controlId="register3">
            <Form.Row>
                <Col xs={6}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Col>
                <Col xs={6}>
                    <Form.Label>City/State</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Col>
            </Form.Row>
            </Form.Group>
              <br/>
            <Form.Group controlId="register4">
            <Form.Row>
                <Col xs={6}>
                <Form.Control as="select">
                    <option>What kind of art peaks your interest?</option>
                </Form.Control>
                </Col>
                <Col xs={6}>
                <Form.Control as="select">
                    <option>What kind of art do you do?</option>
                    <option>I do not make art.</option>
                </Form.Control>
                </Col>
            </Form.Row>
            </Form.Group>
                <br/>
            <Form.Group controlId="register5">
            <Form.Row>
                <Col xs={6}>
                <Form.File id="exampleFormControlFile1" label="Choose your Profile Picture" />
                </Col>
                <Col xs={6}>
                    <div id="image-display"></div>
                </Col>
            </Form.Row>
            </Form.Group>
                <br/>
            <Form.Group className="special" controlId="register6">
            <Form.Row>
                <Col>
                <Form.Label>Set your Profile Description</Form.Label>
                <Form.Control as="textarea" rows={3} style={{resize: "none"}}></Form.Control>
                </Col>
            </Form.Row>
            </Form.Group>
                <br/>
            <Form.Row style={{textAlign: "center"}}>
                <Col xs={6}>
                <Button  variant="dark" className="submit"><Link href="/home">Register</Link></Button>
                </Col>
                <Col xs={6}>
                <Button  variant="dark" className="submit"><Link href="/">Login</Link></Button>
                </Col>
            </Form.Row>
        </Form>
    </Container>
 </div>
<style tsx>{`
    .register-form{
        background: white;
        width: 40vw;
        height: 100vh;
        font-size: 1rem;
        overflow: auto;
    }

    .form{
        margin: 1em 0 2em;
    }

    .register-div{
        background-image: url('https://i.pinimg.com/originals/2d/80/eb/2d80eba2c91f86f6ca21834684cc2d25.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
        position: fixed;
    }

    .submit{
        width: 40vw;
    }

    @media all and (min-width: 17.5em){
        .register-div{
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .register-form{
            width: 95vw;
        }

        #register2.form-control{
            padding: 3px 6px;
        }
    }

    @media all and (min-width: 48em){
        .register-div{
            display: block;
        }

        .register-form{
            width: 60vw;
            font-size: 1.4em;
        }

        .submit{
            width: 20vw;
            height: 15vh;
            font-size: 1.2em;
        }
    }

    @media all and (min-width: 64em){
        .register-form{
            font-size: 1.5em;
            line-height: 2em;
        }
        #register6.form-control{
            height: 15vh;
            font-size: 1.5em;
        }
        .title{
            font-size: 2em;
            line-height: 2em;
        }

        .submit{
            height: 8vh;
        }
    }

    @media all and (min-width: 85.375em){
        .register-form{
            font-size: 1em;
            width: 50vw;
        }
    }
`}
</style>
</div>
)
}

export default Register