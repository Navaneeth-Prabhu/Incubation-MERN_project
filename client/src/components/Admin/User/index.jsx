import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'


function ShowUser() {
    const [getuser, setgetuser] = useState([])



    const block = (element)=>{
    
      axios.patch("http://localhost:3001/admin/blockuser",{
        id : element._id
      }).then((response)=>{
        console.log("ffddddddd",response.data);
        setgetuser(response.data)
      })
    }
    const unblock = (element)=>{
    
      axios.patch("http://localhost:3001/admin/unblock",{
        id : element._id
      }).then((response)=>{
        console.log(response.data);
      })
    }



    useEffect(() => {
      axios.get("http://localhost:3001/admin/showUser").then((response)=>{
        setgetuser(response.data)
      })
    
    }, [])
    

  return (
        <div className="row" style={{ height: "100vh" }}>
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <h1>User Management</h1>
        <table class="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Eamil</th>
              <th scope="col">Eamil</th>
            </tr>
          </thead>
          <tbody>
            {getuser.map((data, i) => {
              return (
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    {data.block === false ? (
                      <button
                        type="button"
                        onClick={() => block(data)}
                        class="btn btn-primary"
                      >
                        BLOCK
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => unblock(data)}
                        class="btn btn-secondary"
                      >
                        UNBLOCK
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShowUser