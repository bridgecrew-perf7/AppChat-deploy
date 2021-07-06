import React, { useState } from 'react';
import { serverUrl } from '../../config/axios';
import { useDispatch } from 'react-redux';
import { uploadAvatar } from '../../store/reducers/uploadSlice';
import { getUser } from '../../store/reducers/userSlice';
import camera from './image/camera.jpg';
import close from './image/close.png';

const Account = ({ user, closeOverlay }) => {
  const username = user.username;
  const phone = user.phone;
  const apiUrl = `${serverUrl}/upload/`;
  const [avatar, setAvatar] = useState(apiUrl + user.avatar);
  const [fileImg, setFileImg] = useState(null);
  const [typeBtn, setTypeBtn] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    closeOverlay();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setTypeBtn(true);
        setAvatar(URL.createObjectURL(file));
        setFileImg(file);
      }
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('file', fileImg);
    dispatch(uploadAvatar(formData))
      .then((res) => {
        if (res.payload.success) {
          dispatch(getUser());
        } else {
          console.log('Fail update avatar');
        }
      })
      .catch((error) => console.log(error));
    closeOverlay();
  };

  return (
    <>
      <div className="modal" id="modal">
        <div className="modal-header">
          <div className="modal-title">
            <h3>Thông tin cá nhân</h3>
            <img src={close} onClick={handleClose} />
          </div>
          <div className="modal-avatar">
            <img className="avatar" src={avatar} />
            <input
              className="file"
              id="file"
              type="file"
              accept=".png, .jpg, .jpeg"
              data-type="image"
              onChange={onFileChange}
            />
            <label htmlFor="file">
              <img className="camera" src={camera} />
            </label>
          </div>
        </div>
        <div className="modal-body">
          <h3>{username}</h3>
          <div className="phone">{phone}</div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleClose}>
            HỦY
          </button>
          {typeBtn ? (
            <button className="btn-update" onClick={handleUpdate}>
              CẬP NHẬT
            </button>
          ) : (
            <button className="btn-not-allowed">CẬP NHẬT</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
