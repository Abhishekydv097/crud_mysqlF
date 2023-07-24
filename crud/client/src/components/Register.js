import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from './context/ContextProvider';


const Register = () => {
  const { udata, setUdata } = useContext(adddata);
  const history = useHistory();

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

  const addinpdata = async (e) => {
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

    if (name === '') {
      alert('Name is required');
    } else if (email === '') {
      alert('Email is required');
    } else if (!email.includes('@')) {
      alert('Enter a valid email');
    } else if (work === '') {
      alert('Work is required');
    } else if (add === '') {
      alert('Address is required');
    } else if (mobile === '') {
      alert('Mobile is required');
    } else if (age === '') {
      alert('Age is required');
    } else if (region === '') {
      alert('Region is required');
    } else if (state === '') {
      alert('State is required');
    } else if (city === '') {
      alert('City is required');
    } else if (priority === '') {
      alert('Priority is required');
    } else if (sourcedThrough === '') {
      alert('Sourced through is required');
    } else if (leadCreatedBy === '') {
      alert('Lead created by is required');
    } else if (leadOwner === '') {
      alert('Lead owner is required');
    } else {
      const res = await fetch('/create', {
        method: 'POST',
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

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log('Error');
        alert('Error');
      } else {
        history.push('/');
        setUdata(data);
        console.log('Data added');
      }
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name of Potential client
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
          
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="regionSelect" className="form-label">
              Region
            </label>
            <select
              name="region"
              value={inpval.region}
              onChange={setdata}
              className="form-select"
              id="regionSelect"
            >
              <option value="">Select Region</option>
              <option value="North">North</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="South">South</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="stateSelect" className="form-label">
              State
            </label>
            <select
              name="state"
              value={inpval.state}
              onChange={setdata}
              className="form-select"
              id="stateSelect"
            >
              <option value="">Select State</option>
              {inpval.region === 'North' && (
                <>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Delhi">Delhi (Union Territory)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                </>
              )}
              {inpval.region === 'East' && (
                <>
                  <option value="Bihar">Bihar</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Assam">Assam</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Tripura">Tripura</option>
                </>
              )}
              {inpval.region === 'West' && (
                <>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Goa">Goa</option>
                </>
              )}
              {inpval.region === 'South' && (
                <>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Puducherry">Puducherry (Union Territory)</option>
                </>
              )}
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="citySelect" className="form-label">
              City
            </label>
            <select
              name="city"
              value={inpval.city}
              onChange={setdata}
              className="form-select"
              id="citySelect"
            >
              <option value="">Select City</option>
              <option value="Ghaziabad">City1</option>
              <option value="Noida">City2</option>
              <option value="Greater Noida">City3</option>
              <option value="Chochin">City4</option>
              <option value="Tamil Nadu">City5</option>
              {/* Add options according to the selected state */}
              {/* For example, if state is "Jammu and Kashmir", display options for cities in Jammu and Kashmir */}
              {/* Similarly, add options for other states */}
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="prioritySelect" className="form-label">
              Priority
            </label>
            <select
              name="priority"
              value={inpval.priority}
              onChange={setdata}
              className="form-select"
              id="prioritySelect"
            >
              <option value="">Select Priority</option>
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Cold">Cold</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="sourcedThroughSelect" className="form-label">
              Sourced Through
            </label>
            <select
              name="sourcedThrough"
              value={inpval.sourcedThrough}
              onChange={setdata}
              className="form-select"
              id="sourcedThroughSelect"
            >
              <option value="">Select Sourced Through</option>
              <option value="Email">Email</option>
              <option value="Calling">Calling</option>
              <option value="Linkedin">Linkedin</option>
              <option value="Reference">Reference</option>
              <option value="Direct">Direct</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="leadCreatedBySelect" className="form-label">
              Lead Created By
            </label>
            <select
              name="leadCreatedBy"
              value={inpval.leadCreatedBy}
              onChange={setdata}
              className="form-select"
              id="leadCreatedBySelect"
            >
              <option value="">Select Lead Created By</option>
              <option value="Vinay">Vinay</option>
              <option value="Sushant">Sushant</option>
              <option value="Doshant">Doshant</option>
              <option value="Suresh">Suresh</option>
              <option value="Mukesh">Mukesh</option>
              <option value="Diya">Diya</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="leadOwnerSelect" className="form-label">
              Lead Owner
            </label>
            <select
              name="leadOwner"
              value={inpval.leadOwner}
              onChange={setdata}
              className="form-select"
              id="leadOwnerSelect"
            >
              <option value="">Select Lead Owner</option>
              <option value="Arjun">Arjun</option>
              <option value="Rohan">Rohan</option>
              <option value="Aryan">Aryan</option>
              <option value="Siddharth">Siddharth</option>
              <option value="Ravi">Ravi</option>
              <option value="Aditya">Aditya</option>
              <option value="Vikram">Vikram</option>
              <option value="Anish">Anish</option>
              <option value="Rajiv">Rajiv</option>
              <option value="Pranav">Pranav</option>
            </select>
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
          <div className="col-12">
            <button type="submit" onClick={addinpdata} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
