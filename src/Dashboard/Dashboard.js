import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import user from "../assets/user.jpg"
import bot from "../assets/bot.jpg"
import ReactMarkdown from 'react-markdown';
const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [responsemessage, setResponseMessage] = useState("");
  const [showwelcome, setshowwelcome] = useState(true);
  const [chatmessage, setChatmessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  const handleenter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateans(e);
    }
  }

  const chatcontainerref = useRef();

  useEffect(() => {
    if (chatcontainerref.current) {
      chatcontainerref.current.scrollTop = chatcontainerref.current.scrollHeight
    }
  }, [chatmessage])

  const generateans = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    if(showwelcome){
      setshowwelcome(false)
    }

    setChatmessage(prevmessage => [
      ...prevmessage,
      { text: message, sender: "user" },
      { text: "Loading...", sender: "bot" }
    ])

    setLoading(true);

    setMessage("");

    try {
      console.log("Loading...")
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAN6mRfOxSCZhGpVrCIgTVcO-zD-qhxtGY",
        method: "post",
        data: {
          "contents": [{
            "parts": [{ "text": message }]
          }]
        }
      })

      console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
      const generatedtext = response['data']['candidates'][0]['content']['parts'][0]['text'];
      setChatmessage(prevmessage => prevmessage.map(msg => msg.text === "Loading..." ? { ...msg, text: generatedtext } : msg))

      setLoading(false);
      setshowwelcome(false);
    }
    catch (error) {
      console.log("Error: ", error);
      setResponseMessage("Error encountered.....")
    }
  }

  return (
    <>
      <div className='container-fluid' style={{ backgroundColor: '#cfdecc', height: '100vh' }}>
        {/* <h1 className="p-3 text-center" style={{ color: '#4B5945', fontWeight: 'bold' }}>ChatBuddy</h1> */}
        <div className="position-relative p-3">
  <h1 className="text-center m-0" style={{ color: '#4B5945', fontWeight: 'bold' }}>ChatBuddy</h1>
  <button 
    className="btn btn-link position-absolute top-0 end-0 mt-1 me-1"
    onClick={() => {
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }}
    title="Logout"
  >
    <i className="bi bi-box-arrow-right" style={{ fontSize: '1.8rem', color: '#4B5945' }}></i>
  </button>
</div>

        {showwelcome && (
          <div className='container d-flex justify-content-center align-items-center' style={{height: '65vh', backgroundColor: 'white', width: '100%', maxWidth: '900px', padding: '30px', borderRadius: '15px', overflow: 'hidden'}}>
            <div className='container d-flex flex-column justify-content-start align-items-center' style={{minHeight: '55vh', maxHeight: '55vh', backgroundColor: '#cfdecc', width: '100%', borderRadius: '10px', overflow: 'auto', padding: '15px' }}>
              <h4 className='text-center' style={{ fontWeight: 'bold', color: '#4B5945' }}>Welcome to ChatBuddy 👋</h4>
              <p className="text-center" style={{ color: '#66785F' }}>I'm here to help you with anything you'd like to know. You can ask me about:</p>
              <div className='row g-3 d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                <div className='col-lg-5 col-md-5 col-sm-12 p-2 me-lg-3 me-md-3' style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                  <p>💡 General Knowledge</p>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12 p-2' style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                  <p>🔍 Technical Questions</p>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12 p-2 me-lg-3 me-md-3' style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                  <p>📝 Writing assistance</p>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12 p-2' style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                  <p>🤔 Problem Solving</p>
                </div>
              </div>
              <p className='mt-4 text-center'>Just type your question below and press Enter or click Send!</p>
            </div>
          </div>
        )}

        {!showwelcome && (
          <div className='container d-flex justify-content-center' style={{ height: '65vh', backgroundColor: 'white', width: '100%', maxWidth: '900px', borderRadius: '15px' }}>
            <div ref={chatcontainerref} className="mt-3" style={{ width: '100%', overflow: 'auto' }}>
              {chatmessage.map((message, index) => {
                return (
                  <div key={index} className={`d-flex mb-3 ${message.sender === "user" ? "justify-content-end align-items-center" : "justify-content-start align-items-center"}`}>
                    <div>
                      {message.sender === "user" ? "" : <img src={bot} style={{ width: '50px' }}></img>}
                    </div>
                    <div className={`p-2 ${message.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"}`} style={{ borderRadius: '10px', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>
                      <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => (
                          <p style={{ margin: '2px 0', lineHeight: '1.4' }} {...props} />
                        )
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                    </div>  
                    <div>
                      {message.sender === "user" ? <img src={user} style={{ width: '50px' }} /> : ""}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className='container mt-2 p-2' style={{ height: '15vh', backgroundColor: 'white', width: '100%', maxWidth: '900px', borderRadius: '15px' }}>
          <form className='d-flex flex-column flex-sm-row justify-content-center align-items-center h-100' onSubmit={generateans}>
            <textarea className="form-control mb-2 mb-sm-0 mt-2 mt-sm-0" placeholder="Message ChatBuddy" value={message} onChange={handleInputChange} onKeyDown={handleenter} rows={3} style={{ width: '100%', borderRadius: '15px', resize: 'none', overflow: "hidden" }} />
            <button className='btn btn-primary ms-0 ms-sm-2 mt-1 mt-sm-0 p-sm-4' style={{ width: '100%', maxWidth: '100px' }}>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard