import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserData } from "../../Store/DbContext";
// import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Hr from "./Hr";

function Pending(props) {
  const [allApp, setAllApp] = useState([]);
  // const { application } = useContext(UserData);
  const [selectApp, setSelectApp] = useState({});
  const [state, setState] = useState(false);

  const approveApplication = (element) => {
    axios
      .get(`http://localhost:3001/admin/updateApprove/${element._id}`)
      .then((response) => {
        props.application();
        setState(true);
      });
  };

  useEffect(() => {
    hi();
    setState(false);
  }, [state]);
  var hi = function () {
    axios.get("http://localhost:3001/admin/dashboard").then((response) => {
      console.log("hiiiii",response.data);
      setAllApp(response.data);
    });
  };
  const openModel = async (element) => {
    console.log(element);
    await setSelectApp(element);
    console.log(selectApp);
  };

  // useEffect(()=>{
  //   console.log(selectApp);
  // },[selectApp])
  return (
    <div className="pending-application">
      <h1 className="mx-2">PENDING APPLICATION</h1>

      <table className="table align-middle mb-0 bg-white table-bordered">
        <thead className="bg-light text-center">
          <tr>
            <th>No</th>
            <th>Company name</th>
            <th>Company details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allApp.map((datas, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td key={i}>{datas.company_name}</td>
                <td key={i}>{datas.company_and_products}</td>
                <td>

                {datas.isApproved === false ? (
                  <>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Pending
                      </button>
                      <div class="dropdown-menu"  >
                            
                        <a class="dropdown-item"   onClick={() => approveApplication(datas)}>
                          Approved
                        </a>
                       
                      </div>
                    </div>
                  </>
                      ) : (
                        <p>Approved</p>
                      )}
                </td>


              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Pending;
