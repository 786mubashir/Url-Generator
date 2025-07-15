import React, { useState } from 'react';
import './UrlEncoderDecoder.css';

const UrlEncoderDecoder = () => {
  const [inputUrl, setInputUrl] = useState(''); // To hold the input value

  // Handle URL encoding and update input
  const handleEncode = () => {
    try {
      const result = encodeURIComponent(inputUrl);
      setInputUrl(result); // Update input with encoded URL
    } catch (error) {
      setInputUrl('Error: Invalid URL format');
    }
  };

  // Handle URL decoding and update input
  const handleDecode = () => {
    try {
      const result = decodeURIComponent(inputUrl);
      setInputUrl(result); // Update input with decoded URL
    } catch (error) {
      setInputUrl('Error: Invalid encoded URL');
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  return (
    <div className="url-encoder-decoder">

      {/* Large Textarea Input */}
      <div className="input-group">
        <label>Enter URL or Encoded URL:</label>
        <textarea
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="Enter URL or encoded URL"
          rows="5"
        />
      </div>

      {/* Buttons for Encoding/Decoding */}
      <div className="button-group">
        <button onClick={handleEncode}>Encode URL</button>
        <button onClick={handleDecode}>Decode URL</button>
      </div>
    </div>
  );
};

export default UrlEncoderDecoder;
