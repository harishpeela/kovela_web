import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Dropdown } from 'react-bootstrap';
import { BsFillEyeFill, BsFillGearFill, BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import ConfirmModal from '../modals/confirm-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertModal from '../modals/alert-modal';
import { AlertType } from '../types/alert.type';
import { IProfile, IProfileList } from '../types/data.type';

type Props = {
    pkgList: IProfileList,
    onEditChangeHnd: (pkgData: IProfile) => void,
    onDeleteChangeHnd: () => void,
    onUploadHnd: (pkgData: IProfile) => void
}

const ProfileMasterList = (props: Props) => {
    
    const {pkgList, onEditChangeHnd, onDeleteChangeHnd, onUploadHnd} = props;

    const [showModal, setShowModal] = useState(false);
    const [alertData, setShowAlertData] = useState({message: 'Session Timeout.', showModal: false} as AlertType);
    const [selectedId, setSelectedId] = useState(0);

    const listDeleteAPI = 'http://localhost:5050/profile-master';
    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');


    const editData = (data: IProfile) => {
        onEditChangeHnd(data);
    }

    const upload = (data: IProfile) => {
      onUploadHnd(data);
    }

    const onDeleteChange = (value: boolean) => {
        if(value) {
            axios.delete(`${listDeleteAPI}/${selectedId}`, {headers: {Authorization: `Bearer ${token}`}}).then((response: any) => {                
                onDeleteChangeHnd();
                setSelectedId(0);
                setShowModal(false);
            }).catch((error) => {
                if(error.response.data.statusCode === 401) {
                    setShowAlertData({...alertData, showModal: true});
                    localStorage.clear();
                }
            });
        } else {
            setSelectedId(0);
            setShowModal(false);
        }
        
    }

    const confirmDelete = (data: IProfile) => {
        setSelectedId(data.id);
        setShowModal(true);
    }
      
  return (
    <React.Fragment>
        { alertData.showModal && (<AlertModal message={alertData.message} onHandleValue={function (value: boolean): void {
              navigate('/auth/login');
          } }  /> )
        }
    <Table striped>
      <thead>
        <tr>
          <th>Profile Id</th>
          <th>Profile Name</th>
          <th>Profile Code</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pkgList.data && (pkgList.data.map((pkg)=> {
            return (
        <tr key={pkg.id}>
          <td>{`${pkg.id}`}</td>
          <td>{`${pkg.name}`}</td>
          <td>{`${pkg.code}`}</td>
          <td>{`${pkg.desciption}`}</td>
          <td><Button variant="outline-primary" onClick={()=>{editData(pkg)}}><BsPencilFill /></Button>{' '}</td>
          <td><Button variant="outline-primary" onClick={()=>{upload(pkg)}}><BsFillEyeFill /></Button>{' '}</td>
          <td>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                <BsFillGearFill /> 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item  onClick={()=>{editData(pkg)}}>Manage Admin</Dropdown.Item>
                <Dropdown.Item  onClick={()=>{editData(pkg)}}>Manage Services</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
          <td><Button variant="outline-danger" onClick={()=>{confirmDelete(pkg)}}><BsFillTrash3Fill /></Button>{' '}</td>
        </tr>
            );
        }))
        }
                
      </tbody>
    </Table>
    {showModal && (<ConfirmModal message='Are you sure want to delete the package Master?' onHandleValue={onDeleteChange}/>)
}
    </React.Fragment>
  );
}

export default ProfileMasterList;

