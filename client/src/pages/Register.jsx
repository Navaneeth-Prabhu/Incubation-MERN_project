import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios'

function Register() {
    const navigate = useNavigate()
    const [values, setvalues] = useState({
        name:"",
        email:"",
        passwrod:"",
    })

    const generateError = (err) =>toast.error(err,{position:"bottom-right"})

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const {data}= await axios.post("http://localhost:3001/register",{
                ...values,
            },{
                withCredentials:true,
            })
            if (data) {
                if (data.errors) {
                  const { email, password } = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
                } else {
                  navigate("/");
                }
              }
        }catch(err) {
            console.log(err.message);
        }
    }

  return (
    <div className='container-fluid'>
      {/* <div className="row d-flex justify-content-center">

   
       
        <h2>Register account</h2>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' placeholder='Name' onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='abc@gmail.com' onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Password' onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})} />
            </div>
            <button type='submit'>Submit</button>

            <span>already have and account ? <Link to="/login">Login</Link></span>
            <ToastContainer />
        </form>
        </div> */}

      
    <div className="container p-5">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-6">
          <h2>Register</h2>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example1">
                name
              </label>
              <input
                type="text"
                id=""
                name="name"
                class="form-control"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example1">
                Email address
              </label>
              <input
                type="email"
                id=""
                name="email"
                class="form-control"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                name="password"
                class="form-control"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>



            <button type="submit" class="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div class="text-center">
              <p>
                Not a member? <Link to="/login">Login</Link>
              </p>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>



    </div>
  )
}


export default Register