import Link from 'next/link'
import {Nav, Form, Button, Alert, Image} from 'react-bootstrap'



const Login = () => {
  return (
    <div style={{backgroundImage: "url('https://i.ytimg.com/vi/9LqaZ6C2bvI/maxresdefault.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
<div className="login-form">
<Nav className="flex-column">
    <Form style={{"margin": "1em"}}>
        <Form.Group controlId="formEmail">
            <Form.Label><h5>Email</h5></Form.Label>
            <Form.Control type="email" placeholder="Enter email" ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label><h5>Password</h5></Form.Label>
            <Form.Control type="password" placeholder="Enter password" ></Form.Control>
        </Form.Group>
        <br/>
        <Button type="submit" variant="dark" size="lg"> <Link href="/home">Log In</Link></Button>
    </Form>
    <br/>
    <Alert variant="info">Don't have an account? <Alert.Link variant="dark"><Link href="/register">Register now!</Link></Alert.Link></Alert>
</Nav>
</div>

<style jsx>{`

 .login-form{
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(65deg, #5e60ce, #5390d9);
    width: 30vw;
    height: 100vh;
    text-align: center;
    outline:none;
 }

 *{
     display:flex;
     flex-direction: row;
 }

`}
</style>
</div>
  );
}

export default Login;
