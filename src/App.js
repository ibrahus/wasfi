import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';

import React, { useState } from 'react';
import Home from "./pages/Home";
import Service from "./pages/Service";


const getImage = (img) => {
  return "data:image/jpeg;base64,"

}
const getKey = () => {

  const keys = [
    'X4PdcjPVLJMwtop4VYlBKjpFH8BcJflDlxVE27uT',
    'jUBgifIRyajdfy6r8uo9BuLrrLxS6xMDy8o53IXc',
    'AVNuXIrGO4PneKgojXC89i4xO6DfKzHDHVKcy1SH',
    
  ]

  // console.log(keys[Math.floor(Math.random() * keys.length)],)

  return keys[Math.floor(Math.random() * keys.length)]
}


const generateText = async (prompt) => {
  const url = `https://api.cohere.ai/v1/generate`
  const options = {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
      "url": false
    },
    body: JSON.stringify({
      model: 'command',
      prompt: `Write a creative product description for ${prompt}, and describe benefits of this product.`,
      max_tokens: 300,
      temperature: 0.9,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE',
    }),
  }

  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  return data
}





function App() {
  const [promot, setPromot] = useState('')
  const [response, setResponse] = useState('')

  const [imageData, setImageData] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      setImageData(base64Data);
    };
  };


  const handleSumbit = () => {
    generateText(promot)
      .then(data =>
        setResponse(data?.generations?.[0]?.text)
      )
  }
  const [result, setResult] = useState(null);

  const predict = async (imageData) => {
    const response = await fetch('https://ibrahus-salesforce-blip-image-captioning-large.hf.space/run/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        data: [imageData],
      }),
    });

    const result = await response.json();
    setResult(result.data);
    generateText(result.data)
  };
  return (
    // <div className="App">
    //   <div>
    //     <input type="text" onChange={(e) => setPromot(e.target.value)} />
    //   </div>
    //   <div>
    //     <Button type="primary" disabled={promot === ""} onClick={() => handleSumbit()}>Submit</Button>
    //     <div>

    //     {response }
    //     </div>

    //     <button onClick={() => predict(`data:image/jpeg;base64,${imageData}`)}>
    //       Predict
    //     </button>
    //     {result && <div>{result}</div>}
        
    //   </div>

    //   <div>
    //     title
    //     <input type="text" onChange={(e) => setPromot(e.target.value)} />
    //   </div>
    //   <div>
    //     keywords
    //     <input type="text" onChange={(e) => setPromot(e.target.value)} />
    //   </div>
    //   <div>
    //     <input type="file" onChange={handleImageChange} />
    //     {imageData && <img src={`data:image/jpeg;base64,${imageData}`} alt="Selected Image" />}
    //   </div>



        
    // </div>

    // <Home />
    <Service />
  );
}

export default App;


