import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () => {
    try {
      const res = await fetch('/getusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log(data);

      setUserdata(data);
      console.log('get data');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`/deleteuser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res2.ok) {
        throw new Error('Failed to delete user');
      }

      const deletedata = await res2.json();
      console.log(deletedata);

      setDLTdata(deletedata);
      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {udata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong> added successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {updata && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{updata.name}</strong> updated successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {dltdata && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{dltdata.name}</strong> deleted successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add lead details
            </NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Clients Name</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col">Region</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">Priority</th>
                <th scope="col">Sourced Through</th>
                <th scope="col">Lead Created By</th>
                <th scope="col">Lead Owner</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.work}</td>
                  <td>{element.mobile}</td>
                  <td>{element.region}</td>
                  <td>{element.state}</td>
                  <td>{element.city}</td>
                  <td>{element.priority}</td>
                  <td>{element.sourcedThrough}</td>
                  <td>{element.leadCreatedBy}</td>
                  <td>{element.leadOwner}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`view/${element.id}`}>
                      <button className="btn btn-success">
                        <RemoveRedEyeIcon />
                      </button>
                    </NavLink>
                    <NavLink to={`edit/${element.id}`}>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                    </NavLink>
                    <button className="btn btn-danger" onClick={() => deleteuser(element.id)}>
                      <DeleteOutlineIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
