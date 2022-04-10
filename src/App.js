import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handSubmitted = event => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) =>{
      const user = result.user;
      console.log(user);
    })
    .catch(error =>{
      console.log(error);
    })
    event.preventDefault();
    // console.log('form submitted' , email , password);

  }
  return (
    <div>

      <div className="registration w-50 mx-auto mt-2">
        <h2 className="text-primary">Please Register!!</h2>
      <Form onSubmit={handSubmitted}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
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
