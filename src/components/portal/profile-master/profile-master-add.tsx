import { ButtonGroup, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IProfile, IProfileList } from '../types/data.type';
import axios from 'axios';
import FilesUpload from '../utils/files-upload';

type Props = {
    onCallBackSaveHnd: () => void;
    pkgEditData: IProfile
}


const ProfileMasterAdd = (props: Props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');

    const { onCallBackSaveHnd, pkgEditData } = props;
    const [pkgMasterData, setPkgData] = useState(pkgEditData);
    const [validated, setValidated] = useState(false);

    const uploadUrl ='/picture/profile?profileId='+pkgEditData.id;

    
    const savePkgMasterData = (event: any) => {
        const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
        
          const listSaveAPI = 'http://20.255.59.150:9096/jtprofile/create';
        axios.post(listSaveAPI, pkgMasterData, {headers: {Authorization: `Bearer ${token}`}}).then((response: any) => {
            console.log(response);
            onCallBackSaveHnd();
        }).catch((error) => {
            if(error.response.data.statusCode === 401) {
                alert('Session timeout! Please login again');
                localStorage.clear();
                navigate('/auth/login');
            }
        });
      
    }

  return (
    <>
  
    <Form noValidate validated={validated} >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Profile Name</Form.Label>
        <Form.Control type="text"
        placeholder="Profile Name"
        value={pkgMasterData.name} 
        onInput={(event: any)=> {
            setPkgData({...pkgMasterData, [event.target.id]:event.target.value});
        }} required />        
      </Form.Group>

      <Form.Group className="mb-3" controlId="desciption">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea"
        placeholder="Description"
        value={pkgMasterData.desciption} 
        onInput={(event: any)=> {
            setPkgData({...pkgMasterData, [event.target.id]:event.target.value});
        }} required />        
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="servicesEnabled" >
      <Form.Check // prettier-ignore
        type="switch"
        id="servicesEnabled"
        label="Services Enabled"
        checked={pkgMasterData.servicesEnabled}        
        onChange={(event: any) => {
          setPkgData({...pkgMasterData, [event.target.id]:event.target.checked});
      }}
      />
      </Form.Group>

      <Form.Group className="mb-3" controlId="reelsEnabled" >
      <Form.Check // prettier-ignore
        type="switch"
        id="reelsEnabled"
        checked={pkgMasterData.reelsEnabled}
        label="Reels Enabled"
        disabled={!pkgMasterData.servicesEnabled}
        onChange={(event: any) => {
          setPkgData({...pkgMasterData, [event.target.id]:event.target.checked});
        }}
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="eventsEnabled" >
      <Form.Check // prettier-ignore
        type="switch"
        id="eventsEnabled"
        label="Events Enabled"
        checked={pkgMasterData.eventsEnabled}
        disabled={!pkgMasterData.servicesEnabled}
        onChange={(event: any) => {
          setPkgData({...pkgMasterData, [event.target.id]:event.target.checked});
      }}
      />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="donationsEnabled" >
      <Form.Check // prettier-ignore
        type="switch"
        id="donationsEnabled"
        label="Donations Enabled"
        checked={pkgMasterData.donationsEnabled}
        disabled={!pkgMasterData.servicesEnabled}
        onChange={(event: any) => {
          setPkgData({...pkgMasterData, [event.target.id]:event.target.checked});
      }}
      />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ecommerceEnabled" >
      <Form.Check // prettier-ignore
        type="switch"
        id="ecommerceEnabled"
        label="E-Commerce Enabled"
        checked={pkgMasterData.ecommerceEnabled}
        disabled={!pkgMasterData.servicesEnabled}
        onChange={(event: any) => {
          setPkgData({...pkgMasterData, [event.target.id]:event.target.checked});
      }}
      />
      </Form.Group>
           
      <Button variant="primary" type="button" onClick={savePkgMasterData}>
        Save
      </Button>
    </Form>
    </>
  );
}

export default ProfileMasterAdd;