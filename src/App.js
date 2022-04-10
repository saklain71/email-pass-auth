import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [registered,  setRegistered ] = useState(false);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  handleRegister = e =>{
    setRegistered(e.target.checked);
  }
  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleSubmitted = event => {

    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('password should contain special one char.')
      return;
    }

    setValidated(true);
    setError('');

    if (registered){
      signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
      })
      .catch(error =>{
        console.lgo(error.message);
        setError(error.message);
      })
    }

    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setPassword("");
      })
      .catch(error => {
        console.error(error.message);
        setError(error.message);
      })
    }
  
    event.preventDefault();
    // console.log('form submitted' , email , password);

  }
  return (
    <div>

      <div className="registration w-50 mx-auto mt-2">
        <h2 className="text-primary"> {registered ? "Please Log In!!": "Please Register!!"}</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmitted}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Not sharing ur email with anyone
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Already Registered" />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            {registered ? "Log In" : "Register"}
          </Button>
        </Form>
      </div>
      {/* <form onSubmit={handSubmitted}>

        <input onChange={handleFormSubmit} type="email" name="" id="" /> <br />
        <input onBlur={handleBlur} type="password" name="" id="" /> <br />
        <input  type="submit" value="Log in" />

      </form> */}
    </div>
  );
}

export default App;
