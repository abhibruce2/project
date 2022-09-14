import React, { useEffect, useState } from "react";
import AddModal from "./Modal";
import Text from "./Text";
import Select from "./Select";
import Button from "./Button";
import axios from "axios";
import Url from "./Url";

function Table() {
  const [contacts, setContacts] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState();
  const [updateValues, setUpdateValues] = useState();
  const [ postId, setPostId] = useState();
  const [updatePost , setUpdatePost] = useState();

  const url = "http://localhost:5000/api/post";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/list")
      .then((response) => setContacts(response.data.rows));
  }, []);

 useEffect (() => {

 const handleUpdate = async () => {
    const requestOptions = {
      method :'PUT',
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ updateValues})
    };
    const response = await fetch(`https://localhost:5000/api/update/1`,requestOptions);
    const data = await response.json();

setPostId(data.id);
  }

  handleUpdate();
 }, [])







  const handleSubmit = async (e) => {
    try {
      const resp = await axios.post(url, {
        activeId: values.activeId,
        link: values.link,
        status: "Yes",
      });
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };


  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const _toggle = () => {
    setOpen(!open);
  };

  const initialValues = {
    activeId: "",
    link: "",
    status: "",
    comments: "",
  };


  const options = [
    {
      label: "NO",
      value: "NO",
    },
  ];

  const addForm = (
    <div className="mt-2 mb-3">
      <div>
        <Text
          name="activeId"
          label="Active Id"
          placeHolder="Enter Your ID"
          fontBolded
          error=""
          required={true}
        />
      </div>
      <div>
        <Url label="Link" name="link" placeholder=" Enter the link" />
      </div>
 
    </div>
  );

  const editForm = (
    <div className="mt-2 mb-3">
      <div>
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
      <div>
        <Text
          name="comments"
          label="Comments"
          placeHolder="Type A comment"
          fontBolded
          error=""
          required={true}
        />
      </div>
    </div>
  );

  const editFormFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button
          type="submit"
          label="Edit"
          className="ml-3 h6-5-important"
          onClick={_toggle}
        ></Button>
      </div>
    </div>
  );

  const formFooter = (
    <div className="container-fluid">
      <div className="col-sm-12 text-center">
        <Button
          type="submit"
          label="Add"
          className="ml-3 h6-5-important"
          onClick={toggle}
        ></Button>
      </div>
    </div>
  );
  return (
    <>
      <AddModal
        isOpen={isOpen}
        toggle={toggle}
        toggleModalClose={toggle}
        modalTitle="Add New"
        modalBody={addForm}
        modalFooter={formFooter}
        hideDefaultButtons
        onSubmit={(values) => {
          handleSubmit(values);
          setValues(values);
        }}
        initialValues={initialValues}
      />

      <AddModal
        isOpen={open}
        toggle={_toggle}
        toggleModalClose={_toggle}
        modalTitle="Edit"
        modalBody={editForm}
        modalFooter={editFormFooter}
        hideDefaultButtons
        onSubmit={(values) => {        
          setUpdateValues(values);
        }}
        initialValues={initialValues}
      />
      <Button className="m-2" onClick={toggle} label="Create" />

      <table className="table table-stripeds">
        <thead>
          <tr>
            <th scope="col">Active ID</th>
            <th scope="col">Try Here</th>
            <th scope="col">Current Status</th>
            <th scope="col">Comments</th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.length > 0 ?
          contacts.map(contact => (
            <tr>
            <td>{contact.id}</td>
            <td>
              <a href={contact.link}>Try Here</a>
            </td>
            <td>
              {contact.status}
              <Button className="btn-sm m-2"
               onClick={() => {    
               setOpen(!open);
               setUpdateValues(contact);}
               } label="Edit"
                />
            </td>
            <td>{contact.comment}</td>
            
          </tr>       

          )) : ""
         
            }
          </tbody>
      </table>
    </>
  );
}

export default Table;
