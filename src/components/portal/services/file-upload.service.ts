import http from '../../http-commom';

const token = localStorage.getItem('user-token');


const upload = (file: File,uploadUrl: string, onUploadProgress: (progressEvent: any) => void): Promise<any> => {
  let formData = new FormData();

  formData.append("profilePicture", file, file.name);

  return http.post(uploadUrl,  formData, {
    headers: {
      "Content-Type": "application/form-data",
      "Authorization": `Bearer ${token}`,
      "redirect": 'follow'
    },
    onUploadProgress,
  }).catch((error) => { 
    console.log(error);
  });
};

const getFiles = (getUrl: string) : Promise<any> => {
  return http.get(getUrl, {headers: {Authorization: `Bearer ${token}`}}).catch((error) => { 
    console.log(error);
  });
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;