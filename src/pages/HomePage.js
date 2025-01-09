import React from 'react';
import { Link } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';
import Verify from './Verify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';


library.add(faCircleCheck);
library.add(faWallet);

const HomePage = () => {
    const posts = [
        { 
            id: 1, 
            name: 'John Doe', 
            walletAddress: '0x1234abcd5678efgh9012ijklmnop3456qrst7890',
            isVerified: true,
            content: 'Looking for a developer to help with a new blockchain-based project! If you have experience with Ethereum and smart contracts, I could use your expertise. DM me for details and let’s work together!',
            image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f240b8a1-b1fa-4744-821e-77683cd19efb_1600x1200.jpeg', 
            comments: 12,
            shares: 5,
            likes: 34
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            walletAddress: '0x7890qrst1234abcd5678efgh9012ijklmnop3456',
            isVerified: false,
            content: 'Need someone to help design a new logo for my startup. I’m working on a project for blockchain integration, and I need a modern, clean, professional look. Let me know if you’re interested!',
            image: 'https://insidebitcoins.com/wp-content/uploads/2023/10/Solana-logo.jpeg', 
            comments: 23,
            shares: 9,
            likes: 58
        },
        { 
            id: 3, 
            name: 'Alice Brown', 
            walletAddress: '0x3456mnop7890qrst1234abcd5678efgh9012ijkl',
            isVerified: true,
            content: 'Looking for a freelancer to help with writing smart contracts for a new decentralized finance (DeFi) project. If you have experience with Solana or Ethereum, let’s collaborate. Contact me for more details!',
            image: 'https://th.bing.com/th/id/OIP.rw-_KX_omM0MxoyQpmwoTgHaEK?rs=1&pid=ImgDetMain', 
            comments: 18,
            shares: 7,
            likes: 42
        }
    ];

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Welcome to the RealBook</h1>
            <Verify />
            <ConnectWallet />
            <div className="posts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {posts.map(post => (
                    <div key={post.id} className="post" style={{ textAlign: 'center', margin: '20px 0', width: '100%', maxWidth: '700px' }}>
                        <h3>{post.name}</h3>
                        <div>
                            <FontAwesomeIcon icon="fa-duotone fa-solid fa-wallet" />
                            <p style={{ fontSize: '0.9rem', color: '#555' }}>{post.walletAddress}</p>
                        </div>
                        {post.isVerified && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ color: 'green', fontSize: '1rem' }}>Verified by World ID</span>
                                <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#1fd634",}} />
                            </div>
                        )}
                        <p>{post.content}</p>
                        <img src={post.image} alt={post.name} className="post-image" style={{ width: '100%', borderRadius: '8px', marginTop: '15px', objectFit: 'cover' }} />
                        
                        <div className="post-actions" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
                            <button className="like-button" style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#FF4500', color: 'white', cursor: 'pointer', border: 'none' }}>
                                👍 {post.likes} Like{post.likes > 1 ? 's' : ''}
                            </button>
                            <button className="comment-button" style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#008CBA', color: 'white', cursor: 'pointer', border: 'none' }}>
                                💬 {post.comments} Comment{post.comments > 1 ? 's' : ''}
                            </button>
                            <button className="share-button" style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', border: 'none' }}>
                                📤 {post.shares} Share{post.shares > 1 ? 's' : ''}
                            </button>
                        </div>

                        <Link to={`/message/${post.id}`} className="chat-button" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                            Chat with {post.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
