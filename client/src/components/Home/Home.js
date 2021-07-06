import React, { useEffect, useState } from 'react';
import { serverUrl } from '../../config/axios';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getListFriend,
  getListMessage,
} from '../../store/reducers/friendSlice';
import { setAuth } from '../../store/reducers/userSlice';
import notifi from './image/notifi.png';
import ChatBox from './ChatBox';
import AddFriend from './AddFriend';
import Account from './Account';
import './style.css';

const OPEN = 'open';
const overlay_1 = 'overlay-1';
const overlay_2 = 'overlay-2';

const Home = () => {
  const user = useSelector((state) => state.userReducer.user);
  const friends = useSelector((state) => state.friendReducer.friends);
  const numberOfFriends = friends.length;
  const [type, setType] = useState(null);
  const [friend, setFriend] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [modalSetting, setModalSetting] = useState(null);
  const [modalAccount, setModalAccount] = useState(null);
  const [modalAddFriend, setModalAddFriend] = useState(null);
  const [active, setActive] = useState({ status: '', index: null });
  const dispatch = useDispatch();
  const inputSearch = (e) => setSearchItem(e.target.value);

  useEffect(() => {
    dispatch(getListFriend());
  }, []);

  const closeOverlay = () => {
    setOverlay(null);
    setModalSetting(null);
    setModalAccount(null);
    setModalAddFriend(null);
  };

  const handleModalSetting = () => {
    if (modalSetting) {
      setOverlay(null);
      setModalSetting(null);
    } else {
      setModalSetting(OPEN);
      setOverlay(overlay_2);
    }
  };

  const handleModalAccount = () => {
    if (modalAccount) {
      setOverlay(null);
      setModalAccount(null);
    } else {
      setOverlay(overlay_1);
      setModalSetting(null);
      setModalAccount(OPEN);
    }
  };

  const handleModalAddFriend = () => {
    if (modalAddFriend) {
      setOverlay(null);
      setModalAddFriend(null);
    } else {
      setModalAddFriend(OPEN);
      setOverlay(overlay_1);
    }
  };

  const handleSignOut = () => {
    const keyStorage = 'accessToken';
    localStorage.removeItem(keyStorage);
    dispatch(
      setAuth({ user: null, isAuthenticated: false, authLoading: true })
    );
  };

  const handleChatBox = (roomId, item) => {
    setType(OPEN);
    dispatch(getListMessage(roomId));
    setFriend(item);
  };

  const apiUrl = `${serverUrl}/upload/`;
  const renderFriend = (i, index) => {
    return (
      <div
        key={index}
        className={`conversation ${
          active.index === index ? active.status : ''
        }`}
        onClick={() => {
          handleChatBox(i._id, i);
          setActive({ status: 'active', index: index });
        }}
      >
        <img src={`${apiUrl}${i.users[0].avatar}`} />
        <div className="title-text">{i.users[0].username}</div>
      </div>
    );
  };

  return (
    <div className="container">
      {modalAddFriend && <AddFriend closeOverlay={closeOverlay} />}
      {modalAccount && <Account user={user} closeOverlay={closeOverlay} />}
      {overlay && <div className={overlay} onClick={closeOverlay}></div>}
      <div className="container-conversation">
        <div className="chat-container">
          <div className="search-container">
            <img
              className="avatar-image"
              src={apiUrl + user.avatar}
              onClick={handleModalSetting}
            />
            <input type="text" placeholder="Search" onChange={inputSearch} />
            {modalSetting && (
              <div className="choice">
                <div className="choice-account" onClick={handleModalAccount}>
                  Account
                </div>
                <div className="choice-logout" onClick={handleSignOut}>
                  Sign out
                </div>
              </div>
            )}
          </div>
          <div className="conversation-list">
            {numberOfFriends ? (
              friends
                .filter((item) => {
                  if (searchItem === '') {
                    return item;
                  } else if (
                    item.users[0].username
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map(renderFriend)
            ) : (
              <>
                <div className="no-friend">
                  <PersonAddIcon
                    onClick={handleModalAddFriend}
                    style={{
                      color: 'white',
                      fontSize: '60px',
                      cursor: 'pointer',
                    }}
                  />
                  <i>No friend</i>
                </div>
              </>
            )}
          </div>

          <div className="new-message-container">
            <button onClick={handleModalAddFriend}>+</button>
          </div>
          {type ? (
            <ChatBox friend={friend} />
          ) : (
            <>
              <div className="chat-null-title"></div>
              <div className="chat-null-list">
                <img src={notifi} />
              </div>
              <div className="chat-null-form"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
