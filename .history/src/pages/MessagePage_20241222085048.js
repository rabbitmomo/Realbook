import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ConnectWallet from './ConnectWallet';
import Verify from './Verify';

const MessagePage = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [jobOffer, setJobOffer] = useState(false); // Track if a job offer should appear
    const [jobAnalysis, setJobAnalysis] = useState(''); // Store job analysis result

    // Simulating a message fetching mechanism (you would fetch messages from your backend here)
    useEffect(() => {
        setMessages([
            { sender: 'John Doe', content: 'Hey, how are you?' }        
        ]);
    }, [userId]);

    const handleSend = async () => {
        const newMessage = { sender: 'You', content: message };
        setMessages([...messages, newMessage]);
        setMessage('');

        // Simulate sending the message to the backend
        try {
            await axios.post('/send-message', { userId, message });
        } catch (err) {
            console.error('Error sending message:', err);
        }

        // Simulate a response from the other user with job phases
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    sender: 'John Doe',
                    content: `
                        <p>I have a job for you! Please follow these steps:</p>
                        <ul>
                            <li><strong>Phase 1:</strong> Accept the job offer by clicking the button below.</li>
                            <li><strong>Phase 2:</strong> Once accepted, the job will be added to your task list.</li>
                            <li><strong>Phase 3:</strong> After completing the job, you will receive a payment and confirmation.</li>
                        </ul>
                    `
                }
            ]);
            setJobOffer(true);
        }, 1000); // Simulate delay in reply        
    };

    const handleApproveJob = () => {
        // Simulate approving the crypto job transaction
        alert('Success! Transaction approved. Proceed to Phase 2.');
    };

    const handleAnalyzeJobOffer = async () => {
        try {
            // Get the content of the latest job offer message
            const jobOfferContent = messages
                .filter(msg => msg.sender === 'John Doe' && msg.content.includes('Phase 1')) // Example condition
                .map(msg => msg.content)
                .join('\n');

            // Send the job offer content to the GPT-based backend for scam analysis
            const analysisResponse = await axios.post('http://localhost:5000/gpt-response', {
                prompt: `
                Analyze the following job offer for potential scams or malicious intent. Respond in a JSON object with the following structure:
                {
                    "isScam": "Yes" or "No", // Indicate whether it is a scam
                    "analysis": "Detailed explanation and relevant warnings about the job offer"
                }
                Job Offer Content:
                ${jobOfferContent}
                `
            });

            // Extract the JSON response
            const { isScam, analysis } = JSON.parse(analysisResponse.data.reply);
            if (isScam === 'Yes') {
                setJobAnalysis(`
                    <p><strong>Warning:</strong> This job offer may be a scam.</p>
                    <p>${analysis}</p>
                `);
            } else {
                setJobAnalysis(`
                    <p><strong>Good News:</strong> This job offer seems legitimate.</p>
                    <p>${analysis}</p>
                `);
            }
        } catch (err) {
            console.error('Error analyzing job offer:', err);
            setJobAnalysis('Failed to analyze the job offer. Please try again.');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Chat with {userId === '1' ? 'John Doe' : 'Unknown User'}</h1>
            <Verify />
            <ConnectWallet />
            <div className="chat">
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'You' ? 'message-right' : 'message-left'}>
                            <strong>{msg.sender}: </strong>
                            <div
                                dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
                {/* Show job offer with phases and buttons */}
                {jobOffer && (
                    <div className="job-offer">
                    <button onClick={handleAnalyzeJobOffer}>Analyze Job Offer for Scam</button>
                        <button onClick={handleApproveJob} style={{ marginLeft: '10px' }}>Approve Job Transaction</button>
                    </div>
                )}
                {/* Display the job analysis result */}
                {jobAnalysis && (
                    <div className="job-analysis" dangerouslySetInnerHTML={{ __html: jobAnalysis }} />
                )}
            </div>
        </div>
    );
};

export default MessagePage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ConnectWallet from './ConnectWallet';
import Verify from './Verify';

const MessagePage = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [jobOffer, setJobOffer] = useState(false); // Track if a job offer should appear
    const [jobAnalysis, setJobAnalysis] = useState(''); // Store job analysis result

    // Simulating a message fetching mechanism (you would fetch messages from your backend here)
    useEffect(() => {
        setMessages([
            { sender: 'John Doe', content: 'Hey, how are you?' }        
        ]);
    }, [userId]);

    const handleSend = async () => {
        const newMessage = { sender: 'You', content: message };
        setMessages([...messages, newMessage]);
        setMessage('');

        // Simulate sending the message to the backend
        try {
            await axios.post('/send-message', { userId, message });
        } catch (err) {
            console.error('Error sending message:', err);
        }

        // Simulate a response from the other user with job phases
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    sender: 'John Doe',
                    content: `
                        <p>I have a job for you! Please follow these steps:</p>
                        <ul>
                            <li><strong>Phase 1:</strong> Accept the job offer by clicking the button below.</li>
                            <li><strong>Phase 2:</strong> Once accepted, the job will be added to your task list.</li>
                            <li><strong>Phase 3:</strong> After completing the job, you will receive a payment and confirmation.</li>
                        </ul>
                    `
                }
            ]);
            setJobOffer(true);
        }, 1000); // Simulate delay in reply        
    };

    const handleApproveJob = () => {
        // Simulate approving the crypto job transaction
        alert('Success! Transaction approved. Proceed to Phase 2.');
    };

    const handleAnalyzeJobOffer = async () => {
        try {
            // Get the content of the latest job offer message
            const jobOfferContent = messages
                .filter(msg => msg.sender === 'John Doe' && msg.content.includes('Phase 1')) // Example condition
                .map(msg => msg.content)
                .join('\n');

            // Send the job offer content to the GPT-based backend for scam analysis
            const analysisResponse = await axios.post('http://localhost:5000/gpt-response', {
                prompt: `
                Analyze the following job offer for potential scams or malicious intent. Respond in a JSON object with the following structure:
                {
                    "isScam": "Yes" or "No", // Indicate whether it is a scam
                    "analysis": "Detailed explanation and relevant warnings about the job offer"
                }
                Job Offer Content:
                ${jobOfferContent}
                `
            });

            // Extract the JSON response
            const { isScam, analysis } = JSON.parse(analysisResponse.data.reply);
            if (isScam === 'Yes') {
                setJobAnalysis(`
                    <p><strong>Warning:</strong> This job offer may be a scam.</p>
                    <p>${analysis}</p>
                `);
            } else {
                setJobAnalysis(`
                    <p><strong>Good News:</strong> This job offer seems legitimate.</p>
                    <p>${analysis}</p>
                `);
            }
        } catch (err) {
            console.error('Error analyzing job offer:', err);
            setJobAnalysis('Failed to analyze the job offer. Please try again.');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Chat with {userId === '1' ? 'John Doe' : 'Unknown User'}</h1>
            <Verify />
            <ConnectWallet />
            <div className="chat">
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'You' ? 'message-right' : 'message-left'}>
                            <strong>{msg.sender}: </strong>
                            <div
                                dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
                {/* Show job offer with phases and buttons */}
                {jobOffer && (
                    <div className="job-offer">
                    <button onClick={handleAnalyzeJobOffer}>Analyze Job Offer for Scam</button>
                        <button onClick={handleApproveJob} style={{ marginLeft: '10px' }}>Approve Job Transaction</button>
                    </div>
                )}
                {/* Display the job analysis result */}
                {jobAnalysis && (
                    <div className="job-analysis" dangerouslySetInnerHTML={{ __html: jobAnalysis }} />
                )}
            </div>
        </div>
    );
};

export default MessagePage;
