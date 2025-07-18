import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath'
const Register = ({showLoginHandler}) => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username,email,password})
      });
      const data = await response.json();
      if(response.ok){
        console.log("Registration Successful:", data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Registration Successful");
        showLoginHandler(); // Redirect to login after successful registration
      }
    }
    catch(err){
      console.error("Error during registration:", err);
      alert("Registration Failed. Please try again.");
    }
    
  }
  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}> 
            <h3>vendor Regsiter</h3><br/>
            <label>UserName</label>
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your Name' required autoComplete="username" /><br/>
            <label>Email</label>
            <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required autoComplete="email" /><br/>
            <label>Password</label>
            <input type="password" name='password'  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' required autoComplete="new-password" /><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>

        </form>
    </div>
  )
}

export default Register