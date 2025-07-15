import React, { useState } from 'react';
import './GuidGenerator.css';
const GuidGenerator = () => {
    const [guid, setGuid] = useState(''); // To store the generated GUID
    const [copied, setCopied] = useState(false); // To manage "Copied!" message visibility
    const [inputGuid, setInputGuid] = useState(''); // To hold user input for validation
    const [isValid, setIsValid] = useState(false); // To manage validation state

    // Function to generate a random GUID
    const generateGuid = () => {
        const newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        setGuid(newGuid); // Set the generated GUID in state
        setCopied(false); // Reset the copied state
    };

    // Function to copy GUID to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(guid);
        setCopied(true); // Show "Copied!" message

        // Hide the "Copied!" message after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    // Function to validate the GUID format
    const validateGuid = () => {
        const guidPattern = /^[{(]?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32})[)}]?$/i;
        setIsValid(guidPattern.test(inputGuid)); // Validate and set state
    };

    // Handle input change for validation
    const handleInputChange = (e) => {
        setInputGuid(e.target.value);
        setIsValid(false); // Reset validation state on input change
    };
    return (
        <div className="guid-generator">
            {/* Button to generate a new GUID */}
            <div className="button-group">
                <button onClick={generateGuid}>Generate New GUID</button>
            </div>

            {/* Display the generated GUID */}
            {guid && (
                <div className="guid-display">
                    <textarea
                        value={guid}
                        readOnly
                        rows="3"
                    />
                    <div>
                        <button onClick={copyToClipboard}>Copy to Clipboard</button>
                        {copied && <span className="copied-message">Copied!</span>} {/* Display "Copied!" message */}
                    </div>
                </div>
            )}

            {/* Input field for GUID validation */}
            <div className="guid-validation">
                <h3>Validate a GUID</h3>
                <input
                    type="text"
                    value={inputGuid}
                    onChange={handleInputChange}
                    placeholder="Enter GUID to validate"
                />
                <button onClick={validateGuid}>Validate GUID</button>
                {inputGuid && (
                    <div>
                        {isValid ? (
                            <span className="valid-message">Valid GUID!</span>
                        ) : (
                            <span className="invalid-message">Invalid GUID!</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidGenerator;
