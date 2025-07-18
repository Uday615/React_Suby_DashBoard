import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath'
const Login = ({showWelcomeHandler}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginHandler = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful:", data);
        alert("Login Successful");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        const vendorId = data.vendorId;
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();
        if (vendorResponse.ok) {
          const vendorfirmId = vendorData.vendorFirmId;
          const vendorfirmName = vendorData.firm[0].firmName;
          localStorage.setItem("firmId", vendorfirmId);
          localStorage.setItem("firmName", vendorfirmName);
          console.log("firmId stored in localStorage:", vendorfirmName);
          window.location.reload();

        }
      } else {
        throw new Error(data.message || "Login failed");
      }

      }
      
    catch(err){
      console.error("Error during login:", err);
      alert("Login Failed. Please try again.");
  }
};
  return (
    <div className='loginSection'>
        <form className='authForm' onSubmit={loginHandler}> 
            <h3>vendor Login</h3><br/>
            <label>Email</label>
            <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required autoComplete="email" /><br/>
            <label>Password</label>
            <input type="password" name='password' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'   required autoComplete="current-password" /><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>

        </form>
    </div>
  )
}


export default Login