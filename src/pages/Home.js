import React, { useEffect, useState } from 'react';
import Fingerprint2 from 'fingerprintjs2';
import DataDetails from './DataDetails';
import './Ask.css';
import './Create.css'; // 导入自定义的 CSS 样式
const Home = () => {
  const [User_id, setUserid] = useState('');
  const [datalist, setDataList] = useState(null);
  const [Session_id, setSession_id] = useState(null);
  const [dataDetails, setDataDetails] = useState(null);

  const Rename=({ User_id ,itemId})=>{
    const [showInput_title, setShowInput_title] = useState(false); // 用于控制是否显示输入框
    const [Title, set_retitle] = useState(''); // 用于保存用户输入的值
    const handleButtonClick_rename = () => {
        // 点击按钮时显示输入框
        setShowInput_title(true);
      };
    const handleInputSubmit = () => {
        // 处理输入框中的值提交的事件
        // 这里可以发送请求，并根据用户输入的值执行相应的操作
        // 发送请求的逻辑代码在这里
        const requestData = {
          Title: Title,
          User_id:User_id,
          Session_id: itemId,
      };
      const apiUrl = 'https://chattoday.info/update';
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
        if (data && data.Meg === 'success') {
          handlegetlist();
        } else {
          // Handle the error if needed
          console.error('Ask API returned an error:', data);
        }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
      });
    
        // 处理完逻辑后，隐藏输入框
        setShowInput_title(false);
        set_retitle('');

      };
      const handleInputCancel = () => {
        // 处理取消输入的事件
        // 在这里可以清空用户输入的值，并隐藏输入框
        set_retitle('');
        setShowInput_title(false);
      };
      return (
        <div>
          {/* 显示按钮 */}
          {!showInput_title && (
            <button  onClick={handleButtonClick_rename}>Rename</button>
          )}
    
          {/* 显示输入框 */}
          {showInput_title && (
            <div>
              <input
                type="text"
                value={Title}
                onChange={(e) => set_retitle(e.target.value)}
                placeholder="Enter value..."
              />
              <button onClick={handleInputSubmit}>Send</button>
              <button onClick={handleInputCancel}>Cancel</button> {/* 添加取消按钮 */}
            </div>
          )}
        </div>
      );
      };


  const delete_session=(itemId) =>{
    const requestData = {
        Session_id: itemId,
        User_id: User_id,
      };
      const apiUrl='https://chattoday.info/delete';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      
      .then((data) => {
        // 处理返回的数据
        if (data && data.Meg === 'success') {
          handlegetlist();
        } else {
          // Handle the error if needed
          console.error('Ask API returned an error:', data);
        }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
      });

};
  const handledetails = (itemId) => {
    const requestData = {
      Session_id: itemId,
      User_id: User_id,
    };

    const apiUrl = 'https://chattoday.info/detail';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((dataDetails) => {
        // Handle the response data if needed
        setDataDetails(dataDetails);
        setSession_id(itemId)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  // Fetch initial data list
  const handlegetlist=()=>{const requestData = {
    User_id: User_id,
  };

  const apiUrl = 'https://chattoday.info/getlist';
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((datalist) => {
      // Handle the fetched data list
      setDataList(datalist);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  };
  
  
  useEffect(() => {
  const generateFingerprint = async () => {
    const components = await Fingerprint2.getPromise();
    const values = components.map((component) => component.value);
    const fingerprint = Fingerprint2.x64hash128(values.join(''), 64);
    setUserid(fingerprint); // 使用状态设置方法设置userid的值
  };

  generateFingerprint();

  // 将 handlegetlist 提取到一个变量中
  const handleGetListFunction = handlegetlist;

  handleGetListFunction();
}, [User_id, handlegetlist]);

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
    const apiUrl = 'https://chattoday.info/create';
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
      if (data && data.Meg === 'success') {
        handlegetlist();
      } else {
        // Handle the error if needed
        console.error('Ask API returned an error:', data);
      }
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
  const Ask = () => {
    const [Question, setQuestion] = useState('');
    const [ setResponseData] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const requestData = {
        Question: Question,
        User_id: User_id,
        Session_id: Session_id,
      };
      const apiUrl = 'https://chattoday.info/ask';
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          console.error('Ask API returned an error:', response.status);
          return;
        }
  
        const data = await response.json();
  
        // Handle the response data here
        setResponseData(data);
  
        if (data && data.Meg === 'success') {
          handledetails(Session_id);
        } else {
          // Handle the error if needed
          console.error('Ask API returned an error:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div className="box">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={Question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
            className="input"
          />
          <button type="submit" className="button">
            Send
          </button>
        </form>
      </div>
    );
  };
  






  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
<div style={{ position: 'fixed', top: 0, left: 0, width: '200px', height: '100%', background: 'gray'}}>
  <Create User_id={User_id}/>
  <div>
    {/* Display buttons sorted by UpdateTimestamp in descending order */}
    {datalist && datalist.Meg === 'success' && datalist.Data && datalist.Data.length > 0 && datalist.Data
      .sort((a, b) => new Date(b.UpdateTimestamp) - new Date(a.UpdateTimestamp))
      .map((item) => (
        <div key={item.Session_id} >
          <button className="new-chat-button" onClick={() => {handledetails(item.Session_id);}}>
            {item.Title}
          </button>
          <button onClick={() => {delete_session(item.Session_id);}}>Delete</button>
          <Rename User_id={User_id} itemId={item.Session_id}/>
        </div>
      ))}
    {datalist && datalist.Meg === 'success' && datalist.Data && datalist.Data.length === 0 && (
      <p>No data available</p>
    )}
  </div>
</div>


<div style={{ position: 'fixed', top: '10px', left: '210px', height: '80%', width: 'calc(100% - 210px)', overflow: 'auto' }}>
  <DataDetails dataDetails={dataDetails} />
</div>

      <div style={{ position: 'fixed', bottom: 0, left: 200, width: '100%', height: '100px', background: 'lightgray' }}>
        <Ask handledetails={handledetails}/>
      </div>
    </div>
  );
};

export default Home;
