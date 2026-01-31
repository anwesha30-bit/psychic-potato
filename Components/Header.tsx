
import React, { useState } from 'react';
import { Theme, ViewMode } from '../types';
import { MoonIcon, SunIcon, CubeIcon, SquareIcon, GlobeAltIcon, ClipboardIcon, CheckIcon, XMarkIcon } from './icons/EditorIcons';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

const PublishModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isCopied, setIsCopied] = useState(false);
    const fakeUrl = 'https://react-engine.live/demo-project';

    const handleCopy = () => {
        navigator.clipboard.writeText(fakeUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                        <GlobeAltIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Your Engine is Live!</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Your project has been successfully published. Share the link below with others.
                    </p>
                    <div className="flex w-full bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700">
                        <input 
                            type="text" 
                            readOnly 
                            value={fakeUrl} 
                            className="flex-1 bg-transparent p-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
                        />
                        <button 
                            onClick={handleCopy}
                            className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 transition-colors"
                        >
                            {isCopied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                            <span className="text-sm">{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, viewMode, setViewMode }) => {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    
    return (
        <>
            <header className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-md z-10">
                <div className="flex items-center space-x-4">
                    <div className="font-bold text-lg text-blue-500">ReactEngine</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <span>File</span>
                        <span>Edit</span>
                        <span>Assets</span>
                        <span>GameObject</span>
                        <span>Component</span>
                        <span>Window</span>
                        <span>Help</span>
                    </div>
                </div>

                <div className="flex items-center justify-center flex-1">
                    <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                        <button
                            onClick={() => setViewMode('2D')}
                            className={`px-3 py-1 text-xs rounded-md flex items-center space-x-1 ${viewMode === '2D' ? 'bg-blue-500 text-white' : 'hover:bg-gray-400 dark:hover:bg-gray-600'}`}
                        >
                            <SquareIcon className="w-4 h-4" />
                            <span>2D</span>
                        </button>
                        <button
                            onClick={() => setViewMode('3D')}
                            className={`px-3 py-1 text-xs rounded-md flex items-center space-x-1 ${viewMode === '3D' ? 'bg-blue-500 text-white' : 'hover:bg-gray-400 dark:hover:bg-gray-600'}`}
                        >
                            <CubeIcon className="w-4 h-4" />
                            <span>3D</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setIsPublishModalOpen(true)}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        <GlobeAltIcon className="w-5 h-5" />
                        <span>Publish</span>
                    </button>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                    </button>
                </div>
            </header>
            {isPublishModalOpen && <PublishModal onClose={() => setIsPublishModalOpen(false)} />}
        </>
    );
};

export default Header;
