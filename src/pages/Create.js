import React, { useState } from 'react';
import './Create.css'; // 导入自定义的 CSS 样式

const Create = ({ User_id }) => {
  const [showInput, setShowInput] = useState(false); // 用于控制是否显示输入框
  const [Title, settitle] = useState(''); // 用于保存用户输入的值

  const handleButtonClick = () => {
    // 点击按钮时显示输入框
    setShowInput(true);
  };

  const handleInputSubmit = () => {
    // 处理输入框中的值提交的事件
    // 这里可以发送请求，并根据用户输入的值执行相应的操作
    // 发送请求的逻辑代码在这里
    const requestData = {
      Title: Title,
      User_id:User_id,
  };
  const apiUrl = 'http://167.172.75.201:8877/create';
  fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json', // 设置请求头的 Content-Type 为 application/json
  },
    body: JSON.stringify(requestData), // 将 JSON 对象转换为 JSON 字符串
  })
    .then((response) => response.json())
    .then((data) => {
    // 处理返回的数据
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
  });

    // 处理完逻辑后，隐藏输入框
    setShowInput(false);
    settitle('');
  };

  const handleInputCancel = () => {
    // 处理取消输入的事件
    // 在这里可以清空用户输入的值，并隐藏输入框
    settitle('');
    setShowInput(false);
  };
  
  return (
    <div>
      {/* 显示按钮 */}
      {!showInput && (
        <button className="new-chat-button" onClick={handleButtonClick}>
          + New chat
        </button>
      )}

      {/* 显示输入框 */}
      {showInput && (
        <div>
          <input
            type="text"
            value={Title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Enter value..."
          />
          <button onClick={handleInputSubmit}>Send</button>
          <button onClick={handleInputCancel}>Cancel</button> {/* 添加取消按钮 */}
        </div>
      )}
    </div>
  );
};

export default Create;
