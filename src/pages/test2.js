import React from 'react';

const Home = () => {
  // 假设你有从后端获取的数据
  {/* 固定在最左侧，左侧容器有滚动效果  const dataForLeft = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);
  const dataForMiddle = Array.from({ length: 30 }, (_, index) => `Data ${index + 1}`);*/}
 

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '200px', height: '100%', background: 'gray', overflowY: 'auto' }}>
        {/* 第一个容器的内容 {dataForLeft.map((item, index) => (
          <p key={index}>{item}</p>
        ))} */}
        
      </div>

      {/* 在页面中部，中间容器有滚动效果 */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'lightblue', overflowY: 'auto' }}>
        {/* 第三个容器的内容 {dataForMiddle.map((item, index) => (
          <p key={index}>{item}</p>
        ))}*/}
        
      </div>

      {/* 固定在页面下方 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100px', background: 'lightgray' }}>
        {/* 第二个容器的内容 */}
        <form>
          <input type="text" placeholder="Enter value..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Home;