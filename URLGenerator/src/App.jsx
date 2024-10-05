import React, { useState } from 'react';
import './App.css';

// InputField Component for input fields
const InputField = ({ label, value, onChange, placeholder }) => {
    return (
        <div>
            <label>
                {label}
                <input 
                    type="text" 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder} 
                />
            </label>
        </div>
    );
};

// Button Component for buttons
const Button = ({ onClick, label }) => {
    return (
        <button onClick={onClick} className="button">
            {label}
        </button>
    );
};

// OpenUrls Component for handling URL opening logic
const OpenUrls = ({ customUrl }) => {
    const openUrlInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            <Button
                onClick={() => openUrlInNewTab(customUrl)}
                label="Open Custom URL in New Tab"
            />
        </div>
    );
};

// Main App Component
function App() {
    const [customUrl, setCustomUrl] = useState('');
    const [savedUrls, setSavedUrls] = useState([]);
    const [editEnv, setEditEnv] = useState('');
    const [editId, setEditId] = useState('');
    const [editIndex, setEditIndex] = useState(null); // To track which URL is being edited

    const handleCustomUrlChange = (event) => setCustomUrl(event.target.value);

    const handleAddUrl = () => {
        if (customUrl && !savedUrls.includes(customUrl)) {
            setSavedUrls([...savedUrls, customUrl]);
            setCustomUrl(''); // Clear input field
        }
    };

    const handleUpdateUrl = () => {
        if (editEnv && editId) {
            const newUrl = `https://${editEnv}.crm.dynamics.com/main.aspx?forceUCI=1&appid=${editId}`;
            setSavedUrls([...savedUrls, newUrl]); // Add new URL instead of replacing
            setEditEnv(''); // Clear edit fields
            setEditId('');
            setEditIndex(null); // Reset edit index
        }
    };

    const handleEditUrl = (index) => {
        const urlParts = savedUrls[index].match(/https:\/\/(.*?)\.crm.dynamics.com\/.*?appid=(.*)/);
        if (urlParts) {
            setEditEnv(urlParts[1]); // Extract environment
            setEditId(urlParts[2]); // Extract app ID
            setEditIndex(index); // Set the index for editing
        }
    };

    const handleDeleteUrl = (index) => {
        const updatedUrls = savedUrls.filter((_, i) => i !== index);
        setSavedUrls(updatedUrls);
    };

    return (
        <div className="main-container">
            <div className="content">
                <h1>Open Dynamics URLs</h1>

                <InputField
                    label="Enter custom URL:"
                    value={customUrl}
                    onChange={handleCustomUrlChange}
                    placeholder="e.g., https://salonrepublicdev.crm.dynamics.com/main.aspx?forceUCI=1&appid=YOUR_APP_ID"
                />

                <Button
                    onClick={handleAddUrl}
                    label="Add URL"
                />

                <OpenUrls customUrl={customUrl} />
            </div>
            <div className="saved-urls">
                <h2>Saved URLs</h2>
                <ul>
                    {savedUrls.map((url, index) => (
                        <li key={index}>
                            <span onClick={() => window.open(url, '_blank')} className="url-link">
                                {url}
                            </span>
                            <Button onClick={() => handleEditUrl(index)} label="Edit" />
                            <Button onClick={() => handleDeleteUrl(index)} label="Delete" />
                        </li>
                    ))}
                </ul>
                <h3>Add Customized URL</h3>
                <InputField
                    label="Environment:"
                    value={editEnv}
                    onChange={(e) => setEditEnv(e.target.value)}
                    placeholder="e.g., salonrepublicdev"
                />
                <InputField
                    label="App ID:"
                    value={editId}
                    onChange={(e) => setEditId(e.target.value)}
                    placeholder="e.g., 8fdf831d-1d57-ee11-be6f-002248081975"
                />
                <Button onClick={handleUpdateUrl} label="Add Customized URL" />
            </div>
        </div>
    );
}

export default App;
