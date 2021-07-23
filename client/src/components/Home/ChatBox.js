import React, { useState, useEffect } from 'react';
import { serverUrl } from '../../config/axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  pushMessage,
  unshiftMessage,
  filterMessage,
} from '../../store/reducers/friendSlice';
import { uploadMedia } from '../../store/reducers/uploadSlice';
import loading2 from './image/Loading2.gif';
import loading3 from './image/Loading3.gif';
import MoodIcon from '@material-ui/icons/Mood';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Picker from 'emoji-picker-react';
import io from 'socket.io-client';

const ChatBox = ({ friend }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('text');
  const [openEmoji, setOpenEmoji] = useState(false);
  const [previewImg, setPreviewImg] = useState(false);
  const messages = useSelector((state) => state.friendReducer.messages);
  const loadMessage = useSelector((state) => state.friendReducer.loadMessage);
  const user = useSelector((state) => state.userReducer.user);
  const userId = String(user._id);
  const roomId = friend._id;
  const infoFriend = friend.users[0];
  const existMess = messages.length;
  const apiUrl = `${serverUrl}/upload/`;
  const server = serverUrl;

  const dispatch = useDispatch();

  const getValueMess = (e) => setMessage(e.target.value);

  useEffect(() => {
    socket.emit('join-room', roomId);
  }, []);

  // io
  const socket = io(server);

  const openModalEmoji = () => {
    if (openEmoji) {
      setOpenEmoji(false);
    } else {
      setOpenEmoji(true);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const data = {
        roomId: roomId,
        userId: userId,
        message: message,
        type: type,
      };
      socket.emit('send-message', data);
      setMessage('');
    }
  };

  const sendMessEnter = (e) => {
    if (e.charCode === 13) {
      sendMessage();
    }
  };

  socket.on('receive-message', (doc) => {
    dispatch(pushMessage(doc.messages));
  });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file['type'];
      const validImageTypes = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'video/mp4',
      ];
      if (validImageTypes.includes(fileType)) {
        sendFile(file);
      }
    }
  };

  const sendFile = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const loadData = {
        sender: userId,
        message: `${file.name}-loading`,
        type: 'loading',
      };
      dispatch(unshiftMessage(loadData));
      dispatch(uploadMedia(formData))
        .then((res) => {
          const resData = res.payload;
          if (resData) {
            if (resData.success) {
              dispatch(filterMessage(loadData.message));
              const data = {
                roomId: roomId,
                userId: userId,
                message: resData.data.filename,
                type: resData.data.fileType,
              };
              socket.emit('send-message', data);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handlePreviewImg = (imgUrl) => {
    if (previewImg) {
      setPreviewImg(false);
    } else {
      setPreviewImg(imgUrl);
    }
  };

  const renderMessage = (item, index) => {
    return userId === String(item.sender) ? (
      <div key={index} className="message-row you-message">
        {item.type === 'text' ? (
          <div className="message-text">{item.message}</div>
        ) : item.type === 'loading' ? (
          <img className="message-image" src={loading3} alt="image" />
        ) : item.type === 'video/mp4' ? (
          <video
            className="message-video"
            src={apiUrl + item.message}
            alt="video"
            type="video/mp4"
            controls
          />
        ) : (
          <img
            className="message-image"
            src={apiUrl + item.message}
            alt="image"
            onClick={handlePreviewImg.bind(this, apiUrl + item.message)}
          />
        )}
      </div>
    ) : (
      <div key={index} className="message-row other-message">
        {item.type === 'text' ? (
          <div className="message-text">{item.message}</div>
        ) : item.type === 'video/mp4' ? (
          <video
            className="message-video"
            src={apiUrl + item.message}
            alt="video"
            type="video/mp4"
            controls
          />
        ) : (
          <img
            className="message-image"
            src={apiUrl + item.message}
            alt="image"
            onClick={handlePreviewImg.bind(this, apiUrl + item.message)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="chat-title">
        {previewImg && (
          <div className="modal-preview" onClick={handlePreviewImg}>
            <CloseIcon
              style={{
                position: 'absolute',
                top: '3%',
                right: '2%',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            />
            <img src={previewImg} alt="" className="full-img" />
          </div>
        )}
        <div className="chat-title-info">
          <img src={apiUrl + infoFriend.avatar} className="chat-title-avatar" />
          <span>{infoFriend.username}</span>
        </div>
        <div></div>
        {/* <VideocamIcon style={{ fontSize: '1.8rem', cursor: 'pointer' }} /> */}
      </div>

      <div className="chat-message-list">
        {loadMessage ? (
          <img className="load-message" src={loading2} />
        ) : existMess === 0 ? (
          <div className="chat-message-status">
            <div className="message-text">
              <i style={{ color: 'gray' }}>No message here!</i>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
      </div>
      <div className="chat-form">
        <label htmlFor="file">
          <CloudUploadOutlinedIcon
            style={{
              fontSize: '2rem',
              cursor: 'pointer',
              color: 'grey',
              margin: '0 10px',
            }}
          />
        </label>
        <input
          className="file"
          id="file"
          type="file"
          accept=".png, .jpg, .jpeg, .mp4"
          onChange={onFileChange}
        />
        <input
          type="text"
          placeholder="type a message..."
          value={message}
          onChange={getValueMess}
          onKeyPress={sendMessEnter}
        ></input>
        <MoodIcon
          onClick={openModalEmoji}
          style={{ fontSize: '2rem', cursor: 'pointer', color: 'grey' }}
        />
        {openEmoji && (
          <div className="emoji">
            <Picker
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              native={true}
            />
          </div>
        )}
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default ChatBox;
