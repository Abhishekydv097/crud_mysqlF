import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const history = useHistory('');
  const [inpval, setINP] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
    region: '',
    state: '',
    city: '',
    priority: '',
    sourcedThrough: '',
    leadCreatedBy: '',
    leadOwner: '',
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams('');
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/induser/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data || data.length === 0) {
      console.log('error');
    } else {
        if (data[0]) {
          setINP(data[0]);
          console.log("get data");
        } else {
          console.log("data[0] is undefined");
        }
      }
    };
  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      work,
      add,
      mobile,
      desc,
      age,
      region,
      state,
      city,
      priority,
      sourcedThrough,
      leadCreatedBy,
      leadOwner,
    } = inpval;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        work,
        add,
        mobile,
        desc,
        age,
        region,
        state,
        city,
        priority,
        sourcedThrough,
        leadCreatedBy,
        leadOwner,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert('fill the data');
    } else {
      history.push('/');
      setUPdata(data2);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="text"
              value={inpval.age}
              onChange={setdata}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpval.add}
              onChange={setdata}
              name="add"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Region
            </label>
            <input
              type="text"
              value={inpval.region}
              onChange={setdata}
              name="region"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              State
            </label>
            <input
              type="text"
              value={inpval.state}
              onChange={setdata}
              name="state"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              City
            </label>
            <input
              type="text"
              value={inpval.city}
              onChange={setdata}
              name="city"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Priority
            </label>
            <input
              type="text"
              value={inpval.priority}
              onChange={setdata}
              name="priority"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Sourced Through
            </label>
            <input
              type="text"
              value={inpval.sourcedThrough}
              onChange={setdata}
              name="sourcedThrough"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Lead Created By
            </label>
            <input
              type="text"
              value={inpval.leadCreatedBy}
              onChange={setdata}
              name="leadCreatedBy"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Lead Owner
            </label>
            <input
              type="text"
              value={inpval.leadOwner}
              onChange={setdata}
              name="leadOwner"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>

        <button type="submit" onClick={updateuser} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
