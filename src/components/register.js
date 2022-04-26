import {useState} from 'react';


const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')

  const registerUser = () =>{
    if (password !== passwordCheck) {
      setError("Passwords don't match");
      setTimeout(() =>{
        setError('');
      }, 3000)
    }
    else{
      const userObj = {
        name: name,
        email: email,
        password: password
      }
      fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
      }).then((res) =>{
        return res.json()
      }).then((data)=>{
        if (!data.message){
          setSuccess('Account created, you can now login with your credentials.');
          setTimeout(()=>{
            setSuccess('');
          }, 3000);
          setEmail('');
          setPassword('');
          setPasswordCheck('');
          setName('');
        }
        else{
          setError(data.message);
        }
      }) 
    }
  }

    return (
      <div className="wrap" style={{paddingTop: "10px"}}>
        <div className="register">
        <h5>Register</h5>
        <form>
        <div className="row s6">
        <div className="input-field col s12">
          <input id="name" type="text" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)} value = {email}/>
        </div>
      </div>
        <div className="row s6">
        <div className="input-field col s12">
          <input id="email" type="email" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value = {name}/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value = {password}/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="confirmpassword" type="password" placeholder="confirm password" onChange={(e) => setPasswordCheck(e.target.value)} value= {passwordCheck}/>
        </div>
      </div>
        </form>
        <a class="waves-effect waves-light btn" onClick={registerUser}>Register</a>
        <p style={{color: "red"}}>{error}</p>
        <p style={{color: "green"}}>{success}</p>
    </div>
    </div>
    )
}

export default Register;