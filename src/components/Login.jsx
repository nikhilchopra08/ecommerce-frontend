import React , {useState} from 'react'

const Login = () => {
    const[credentials , setCredentials] = useState({
        email: "",
        password: "",
    });
    const[accessToken , setaccessToken] = useState();
    const[loginID , setloginId] = useState();

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        console.log(credentials);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            const response = await fetch("http://localhost:5000/api/auth/login" , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                }),
            });

            console.log(JSON.stringify({
                username: credentials.username,
                password: credentials.password,
            }));

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
        
              const contentType = response.headers.get('content-type');
              if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format');
              } 
        
              const json = await response.json();
              console.log(json);
        
    
        if (json) {
          localStorage.setItem('token', json.accesstoken);
          localStorage.setItem('ID', json._id);
          setloginId(json._id);
          setaccessToken(json.accesstoken);
          // Redirect or perform another action upon successful registration.
          console.log("");
          alert("YESSSSSSSSSS!");
          window.location.href = '/Products'
        } else {
          const errorMessage = json.message || "Unknown error";
          console.error("Registration failed:", errorMessage);
          alert("Registration failed: " + errorMessage);
        }
        
        
            } catch (error) {
              console.error("Network or server error:", error);
              alert("Network or server error. Please try again later.");
            }

            console.log(accessToken);
    };
  return (
    <>
    <div>Login</div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" name="username" onChange={onChange} value={credentials.username} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Login