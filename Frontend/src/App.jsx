import axios from "axios";
import Markdown from "react-markdown";
import { use, useState } from "react";

function App() {
    const [user, setUser] = useState("");
    const [prompt, setPrompt] = useState("");
    const [response, setResopnse] = useState("");

    async function handleClick() {
        try {
            setUser("Please wait....");
            const res = await axios.post("https://kravenbackend.vercel.app/generate", {prompt})
            setResopnse(res.data.response);
            setPrompt("");
        }
        catch(error) {
            setUser("Error while Fetching your request, Try again")
            console.error("Error fetching response:", error);
        }
    }
    return (
        <div className="container">
            <h1 className="ai_name">K-Raven<span>.</span></h1>
            <div className="icon-div">
            <i onClick={() => (window.location.href='https://github.com/Sumitchouhan774')} class="bi bi-github icon"></i>
            <i onClick={() => (window.location.href='https://www.linkedin.com/in/sumit-chouhan-848674272/')} class="bi bi-linkedin icon"></i>
            </div>
            <div className="hero"> 
            <div className="output-container"><p>{user}</p><Markdown>{response}</Markdown></div>
            <div className="chat-container">
            <div className="input-box">
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Type Something...."/>
                <i onClick={handleClick} class="bi bi-arrow-right-square-fill btn"></i>
            </div>
            </div>
            </div>
        </div>
    )
};

export default App;