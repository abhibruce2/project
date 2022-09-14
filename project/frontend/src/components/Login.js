import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import AddModal from "./Modal";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

// import Label, { FormGroup } from "reactStrap";
function Login() {
  const [isOpen, setIsOpen] = useState(false);
const [values, setValues] = useState();

let navigate = useNavigate ()


  const _toggle = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    {
      label: "Client 1",
      value: "Client-1",
    },
    {
      label: "Client 2",
      value: "Client-2",
    },
    {
      label: "Manager",
      value: "Manager",
    },
  ];



  const handleSubmit =() => {
    if(values.status.value ="client-1"){
return navigate('/table', {replace: true});
    }
    if(values.status.value == "client-2"){
        return navigate('/table', {replace: true});
    }
    if(values.status.value == "manager"){
        return navigate('/table', {replace: true});
  }

  }
  const initialValues = {

    status: "",
  };


  const editForm = (
    <div className="mt-2 mb-3">
      <div className="select">
        <Select
          name="status"
          label="Status"
          placeholder="Select Status..."
          options={options}
          error=""
          fontBolded
          required={true}
        />
      </div>
    </div>
  );

  const formFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button
          type="submit"
          label="Login"
          className="ml-3 h6-5-important"
          
          onClick={() => {    
            setIsOpen(!isOpen);
        navigate('/table') 
        }
          } 
        ></Button>
      </div>
    </div>
  );

  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={_toggle}
        toggleModalClose={_toggle}
        modalTitle="Select"
        modalBody={editForm}
        modalFooter={formFooter}
        hideDefaultButtons
        onSubmit={(values) => {
        //   handleSubmit(values);
          setValues(values);
        }}
        initialValues={initialValues}
      />
<div className="d-flex justify-content-center" >
    <div >

    <h1 style = {{fontFamily: 'Ms Madi' ,fontSize : "100px"}} >Designed By Abhi</h1>
    </div>
   
</div>
<div className="d-flex justify-content-center">
    <Button onClick = {() => {
      setIsOpen(!isOpen);
      handleSubmit()
}} label = "Login"/>

    </div>

    </>
  );
}

export default Login;



