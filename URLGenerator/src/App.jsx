import React, { useState, useEffect } from 'react';
import './App.css';

// InputField Component for input fields
const InputField = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="input-group">
            <label className="label">
                {label}
                <input 
                    type="text" 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder} 
                    className="input-field"
                />
            </label>
        </div>
    );
};

// Button Component for buttons
const Button = ({ onClick, label, isPrimary }) => {
    return (
        <button 
            onClick={onClick} 
            className={`button ${isPrimary ? 'primary' : 'secondary'}`}
        >
            {label}
        </button>
    );
};

// Main App Component
function App() {
    // Lazy initialization for savedUrls to load from localStorage if available
    const [savedUrls, setSavedUrls] = useState(() => {
        const storedUrls = localStorage.getItem('savedUrls');
        return storedUrls ? JSON.parse(storedUrls) : []; // Return stored URLs or an empty array if not found
    });
    const [inputUrl, setInputUrl] = useState('');
    const [editParts, setEditParts] = useState({});

    // Save the current state of savedUrls to localStorage whenever it changes
    useEffect(() => {
        if (savedUrls.length > 0) {
            localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
        }
    }, [savedUrls]);

    // Handle changes in the URL input
    const handleUrlChange = (event) => {
        setInputUrl(event.target.value);
    };

    // Split the URL into parts and save it
    const handleSubmit = () => {
        try {
            const url = new URL(inputUrl); // Use the URL constructor to parse the URL
            const parts = {
                protocol: url.protocol.replace(':', ''), // Remove the ':' from the protocol
                host: url.host, // Includes subdomain and domain
                pathname: url.pathname.replace(/^\//, ''), // Remove leading '/'
                search: url.search, // Query parameters
                hash: url.hash // Fragment
            };

            const newUrlData = {
                url: inputUrl,
                parts: parts,
                isEditing: false, // Track if the URL is being edited
            };

            setSavedUrls([...savedUrls, newUrlData]); // Add new URL object to saved URLs
            setInputUrl(''); // Clear input field
        } catch (error) {
            alert('Invalid URL. Please enter a valid URL.'); // Handle invalid URL input
        }
    };

    // Handle editing toggle and initialize edit state
    const handleEditToggle = (index) => {
        const updatedUrls = savedUrls.map((urlData, i) => {
            if (i === index) {
                if (!urlData.isEditing) {
                    // Initialize the edit state with the current URL parts
                    setEditParts(urlData.parts);
                }
                return { ...urlData, isEditing: !urlData.isEditing }; // Toggle the editing state
            }
            return urlData; // Keep other URLs unchanged
        });

        setSavedUrls(updatedUrls); // Update saved URLs state
    };

    // Save the changes to the URL parts when the "Save" button is clicked
    const handleSaveChanges = (index) => {
        const updatedUrls = savedUrls.map((urlData, i) => {
            if (i === index) {
                const newUrl = `${editParts.protocol}://${editParts.host}/${editParts.pathname}${editParts.search}${editParts.hash}`; // Construct new URL

                const newUrlData = {
                    url: newUrl,
                    parts: editParts,
                    isEditing: false, // Exit editing mode after saving
                };

                return newUrlData; // Return the updated URL data
            }
            return urlData; // Keep other URLs unchanged
        });

        setSavedUrls(updatedUrls); // Update saved URLs state
        setEditParts({}); // Clear edit state
    };

    // Handle deleting a saved URL
    const handleDeleteUrl = (index) => {
        const updatedUrls = savedUrls.filter((_, i) => i !== index);
        setSavedUrls(updatedUrls);
    };

    // Open the URL in a new tab
    const handleOpenUrl = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="content">
            <h1>URL Editor</h1>

            {/* Input for the full URL */}
            {savedUrls.every(urlData => !urlData.isEditing) && (
                <div className="url-input-section">
                    <InputField
                        label="Enter URL:"
                        value={inputUrl}
                        onChange={handleUrlChange}
                        placeholder="e.g., https://www.example.com/path?query=1#hash"
                    />
                    <Button onClick={handleSubmit} label="Save URL" isPrimary />
                </div>
            )}

            {/* List of saved URLs */}
            {savedUrls.length > 0 && (
                <div className="url-list">
                    <h2>Saved URLs</h2>
                    {savedUrls.map((urlData, index) => (
                        <div key={index} className="url-card">
                            <div className="url-content">
                                <span 
                                    onClick={() => handleOpenUrl(urlData.url)} 
                                    className="url-link"
                                >
                                    {urlData.url}
                                </span>
                                <Button 
                                    onClick={() => urlData.isEditing ? handleSaveChanges(index) : handleEditToggle(index)} 
                                    label={urlData.isEditing ? "Save Changes" : "Edit"} 
                                    isPrimary={true}
                                />
                            </div>

                            {/* Show fields for editing URL parts only if in editing mode */}
                            {urlData.isEditing && (
                                <div className="edit-fields">
                                    <InputField
                                        label="Protocol:"
                                        value={editParts.protocol}
                                        onChange={(e) => setEditParts({ ...editParts, protocol: e.target.value })}
                                    />
                                    <InputField
                                        label="Host:"
                                        value={editParts.host}
                                        onChange={(e) => setEditParts({ ...editParts, host: e.target.value })}
                                    />
                                    <InputField
                                        label="Path:"
                                        value={editParts.pathname}
                                        onChange={(e) => setEditParts({ ...editParts, pathname: e.target.value })}
                                    />
                                    <InputField
                                        label="Query String:"
                                        value={editParts.search}
                                        onChange={(e) => setEditParts({ ...editParts, search: e.target.value })}
                                    />
                                    <InputField
                                        label="Fragment:"
                                        value={editParts.hash}
                                        onChange={(e) => setEditParts({ ...editParts, hash: e.target.value })}
                                    />
                                </div>
                            )}
                            <Button onClick={() => handleDeleteUrl(index)} label="Delete" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
