// src/pages/Home.js
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState(null);

  // useEffect 用于在组件加载时发送请求
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data'); // 替换为你的 API URL
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  // 定义处理表单提交的函数
  const handleSubmit = async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    try {
      const response = await fetch(`https://api.example.com/data?query=${inputValue}`); // 替换为你的 API URL，将用户输入的值作为查询参数
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page.</p>

      {/* 用户输入表单 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value..."
        />
        <button type="submit">Submit</button>
      </form>

      {/* 在这里根据请求的结果渲染内容 */}
      {responseData ? (
        <p>Data received: {JSON.stringify(responseData)}</p>
      ) : (
        <p>Waiting for user input...</p>
      )}
    </div>
  );
};

export default Home;
