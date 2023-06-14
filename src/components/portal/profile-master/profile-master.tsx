import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PageType } from '../types/enum.types';
import { BsFillArrowLeftCircleFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AlertModal from '../modals/alert-modal';
import { AlertType } from '../types/alert.type';
import ProfileMasterAdd from './profile-master-add';
import ProfileMasterList from './profile-master-list';
import { IProfile, IProfileList } from '../types/data.type';
import PaginationComponent from '../../../util/pagination';
import httpCommom from '../../http-commom';
import FilesUpload from '../utils/files-upload';



const ProfileMaster = () => {
    const [profileList, setProfileList] = useState({} as IProfileList);
    const [pageName, setIsAdd] = useState(PageType.List);
    const [editData, setEditData] = useState({} as IProfile);
    const [uploadUrl, setUploadUrl] = useState('' as string);
    const [alertData, setShowAlertData] = useState({message: 'Session Timeout.', showModal: false} as AlertType);
    const [currentPage, setCurrentPage] = useState(0);
    const [listPerPage, setListPerPage] = useState(5);

    const showAdd = () => { setIsAdd(PageType.Add) };
    const showList = () => { setIsAdd(PageType.List) };
    const showUpload = () => { setIsAdd(PageType.Upload) };

    let cuPage = 1;

    
    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');

    const loadData = () => {
        const listAPI = '/jtprofile/list?page='+(cuPage-1)+'&pageSize='+listPerPage;
        httpCommom.get(listAPI, {headers: {Authorization: `Bearer ${token}`}}).then((response: any) => {
            const data = response.data as IProfileList;
            setProfileList(data);
        }).catch((error) => {
            if(error.response.data.statusCode === 401) {
                setShowAlertData({...alertData, showModal: true});
                localStorage.clear();                
            }
        });
    }
    useEffect(() => {
        loadData();
    }, []);

    const onSaveMaster = () => {
        setEditData({} as IProfile);
        loadData();
        showList();
    }

    const onSetPage = (value: number) => {
        setCurrentPage(value);
        cuPage= value;
        loadData();
    }

    const onEditChange = (data: IProfile) => {
        setEditData(data);
        showAdd();
    }

    const onUploadChange = (data: IProfile) => {
        setUploadUrl('/picture/profile?profileId='+data.id);
        showUpload();
    }
    
    const onBackHand = () => {
        setEditData({} as IProfile);
        showList();
    }

	return (
        
		<React.Fragment>
             { alertData.showModal && (<AlertModal message={alertData.message} onHandleValue={function (value: boolean): void {
              navigate('/auth/login');
          } }  /> )
        }
			<Container className='navbar-nav-scroll'>
            {pageName === PageType.List && (
            <Row >
            <h3>Profile Master</h3>
            <Col sm={12}>
            <Button variant="outline-primary" style={{width:'10%'}} onClick={showAdd}>
                <BsFillPlusCircleFill style={{height:'28px'}}/> Add</Button>
            </Col>           
            
            <Col>
                <ProfileMasterList pkgList={profileList} 
                onDeleteChangeHnd={onSaveMaster} onEditChangeHnd={onEditChange}
                onUploadHnd={onUploadChange}/>

<PaginationComponent
          itemsCount={profileList.totalItems||0}
          itemsPerPage={listPerPage}
          currentPage={currentPage}
          setCurrentPage={onSetPage}
          alwaysShown={true}
        />
            </Col>
        </Row>
            )}
            {pageName === PageType.Add && (
                <Row className='justify-content-center'>
                <h3>Add Profile Master</h3>
                <div>
                <Button variant="outline-primary" onClick={onBackHand}><BsFillArrowLeftCircleFill style={{height:'28px'}}/></Button>{' '}             
                </div>
                <Col sm={8}>
                    <ProfileMasterAdd onCallBackSaveHnd={onSaveMaster} pkgEditData={editData}/>
                </Col>
                </Row>
            )}

            {pageName === PageType.Upload && (
                <Row className='justify-content-center'>
                <h3>Add Profile Master</h3>
                <div>
                <Button variant="outline-primary" onClick={onBackHand}><BsFillArrowLeftCircleFill style={{height:'28px'}}/></Button>{' '}             
                </div>
                <Col sm={8}>
                <FilesUpload uploadUrl={uploadUrl} getUrl={uploadUrl} />
                </Col>
                </Row>
            )}
                
			</Container>
		</React.Fragment>
	)
}

export default ProfileMaster;