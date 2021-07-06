import React, { useState } from 'react';
import { serverUrl } from '../../config/axios';
import { useDispatch } from 'react-redux';
import {
  findFriend,
  addFriend,
  getListFriend,
} from '../../store/reducers/friendSlice';
import close from './image/close.png';

const AddFriend = ({ closeOverlay }) => {
  const [infoFriend, setInfoFriend] = useState(null);
  const [phone, setPhone] = useState(null);
  const [noti, setNoti] = useState(null);
  const apiUrl = `${serverUrl}/upload/`;
  const dispatch = useDispatch();

  const handleClose = () => {
    closeOverlay();
  };

  const getValuePhone = (e) => setPhone(e.target.value);

  const handleFindFriend = () => {
    setInfoFriend(null);
    setNoti(null);
    dispatch(findFriend({ phone: phone }))
      .then((res) => {
        const data = res.payload;
        if (data.success) {
          setInfoFriend(data.data);
        } else {
          setNoti(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddFriend = () => {
    dispatch(addFriend({ phone: phone }))
      .then((res) => {
        const data = res.payload;
        if (data.success) {
          dispatch(getListFriend());
          handleClose();
        } else {
          setNoti(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="modal" id="modal">
        <div className="modal-header">
          <div className="modal-title">
            <h3>Thêm bạn</h3>
            <img src={close} onClick={handleClose} />
          </div>
        </div>
        <div className="modal-body-friend">
          <h5>Số điện thoại:</h5>
          <input type="text" maxLength="10" onChange={getValuePhone} />
          <div className="friend-notifi">{noti}</div>
          {infoFriend ? (
            <div className="info-friend">
              <div className="info-friend-detail">
                <img
                  className="info-friend-img"
                  src={apiUrl + infoFriend.avatar}
                />
                <h5 className="info-friend-name">{infoFriend.username}</h5>
              </div>
              <button className="info-friend-btn" onClick={handleAddFriend}>
                Thêm bạn
              </button>
            </div>
          ) : (
            <div className="info-friend-null"></div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleClose}>
            HỦY
          </button>
          <button className="btn-update" onClick={handleFindFriend}>
            TÌM KIẾM
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFriend;
