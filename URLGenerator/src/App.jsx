import React, { useState } from 'react';
import './App.css';

function App() {
    const OpenUrlsInNewTab = () => {
        // State to hold user inputs
        const [emailPart, setEmailPart] = useState('');
        const [systemUserId, setSystemUserId] = useState('');

        // Function to open a URL in a new tab
        const openUrlInNewTab = (url) => {
            window.open(url, '_blank', 'noopener,noreferrer');
        };

        // Handle changes in the email input field
        const handleEmailChange = (event) => {
            setEmailPart(event.target.value);
        };

        // Handle changes in the system user ID input field
        const handleSystemUserIdChange = (event) => {
            setSystemUserId(event.target.value);
        };

        return (
            <div>
                <h1>Open Dynamics URLs</h1>
                <label>
                    Enter internal email address part:
                    <input 
                        type="text" 
                        value={emailPart} 
                        onChange={handleEmailChange} 
                        placeholder="e.g., wangleo" 
                    />
                </label>
                <br /><br />

                <label>
                    Enter system user ID:
                    <input 
                        type="text" 
                        value={systemUserId} 
                        onChange={handleSystemUserIdChange} 
                        placeholder="e.g., 53a043d6-50ed-ed11-8849-000d3a18b404" 
                    />
                </label>
                <br /><br />

                <button
                    onClick={() =>
                        openUrlInNewTab(
                            `https://salonrepublicdev.crm.dynamics.com/api/data/v9.1/systemusers?$filter=contains(internalemailaddress,'${emailPart}')&$select=azureactivedirectoryobjectid,isdisabled`
                        )
                    }
                >
                    Open URL 1 in New Tab
                </button>

                <button
                    onClick={() =>
                        openUrlInNewTab(
                            `https://salonrepublicdev.crm.dynamics.com/api/data/v9.1/systemusers?$select=systemuserid&$expand=systemuserroles_association($select=roleid,name,businessunitidname)&$filter=systemuserid eq '${systemUserId}'`
                        )
                    }
                >
                    Open URL 2 in New Tab
                </button>
            </div>
        );
    };

    return <OpenUrlsInNewTab />;
}

export default App;
