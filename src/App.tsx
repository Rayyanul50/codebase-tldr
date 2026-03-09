import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';

// Home Component
function Home({ setAnalysisResult, setLoading }: any) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const validateGitHubUrl = (url: string) => {
    const pattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+(\/)?$/;
    return pattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateGitHubUrl(repoUrl)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setLoading(true);

    // Mock analysis result
    setTimeout(() => {
      setAnalysisResult({
        repoName: repoUrl.split('github.com/')[1],
        stars: '220k',
        forks: '45k',
        updated: '2 days ago',
        techStack: ['React', 'JavaScript', 'Jest', 'Rollup'],
        keyFiles: [
          { name: 'packages/react/index.js', desc: 'Core entry point' },
          { name: 'packages/react-dom/client.js', desc: 'DOM renderer' },
          { name: 'CONTRIBUTING.md', desc: 'How to contribute' }
        ]
      });
      setLoading(false);
      navigate('/results');
    }, 3000);
  };

  const popularRepos = [
    'facebook/react', 'vuejs/vue', 'tensorflow/tensorflow', 'django/django'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>🚀 Codebase TL;DR</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-indigo-600">Login</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Understand any GitHub repo
            <span className="text-indigo-600"> in 5 minutes</span>
          </h1>
          <p className="text-xl text-gray-600">
            Paste any GitHub URL and get an AI-generated video explanation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/facebook/react"
                className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-500 ${
                  isValid ? 'border-gray-300' : 'border-red-500'
                }`}
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Generate Explanation
              </button>
            </div>
            {!isValid && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid GitHub repository URL
              </p>
            )}
          </form>
          <p className="text-sm text-gray-500 mt-4">
            ✨ Free for public repositories • Takes ~2-3 minutes • Includes video + transcript
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800">Paste URL</h3>
            <p className="text-gray-600 text-sm">Any public GitHub repository</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800">AI Analysis</h3>
            <p className="text-gray-600 text-sm">We analyze code structure</p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-800">5-Minute Video</h3>
            <p className="text-gray-600 text-sm">Get instant understanding</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Popular Examples</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularRepos.map((repo) => (
              <div
                key={repo}
                onClick={() => setRepoUrl(`https://github.com/${repo}`)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              >
                <p className="font-semibold text-gray-800">{repo}</p>
                <p className="text-sm text-gray-500 mt-1">⭐ 200k+ stars</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Component
function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-2xl text-center">
        <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analyzing Repository...</h2>
        <p className="text-gray-600 mb-8">This takes about 2-3 minutes</p>
        <div className="space-y-3 text-left">
          {['Cloning repository', 'Analyzing code structure', 'Generating script', 'Creating voiceover', 'Assembling video'].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600 animate-pulse"></div>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Results Component
function Results({ analysisResult }: any) {
  const navigate = useNavigate();
  
  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <p className="text-gray-600 mb-4">No analysis found. Start by pasting a GitHub URL.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>🚀 Codebase TL;DR</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{analysisResult.repoName}</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>⭐ {analysisResult.stars} stars</span>
            <span>🍴 {analysisResult.forks} forks</span>
            <span>📅 Updated {analysisResult.updated}</span>
          </div>
        </div>

        <div className="bg-black rounded-xl shadow-lg p-4 mb-6">
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl">5-Minute Explanation Video</p>
              <p className="text-sm text-gray-400 mt-2">Video player would appear here</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📁 Key Files</h2>
            <ul className="space-y-3">
              {analysisResult.keyFiles.map((file: any, index: number) => (
                <li key={index} className="border-b pb-2">
                  <div className="font-mono text-sm text-indigo-600">{file.name}</div>
                  <div className="text-sm text-gray-600">{file.desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔧 Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {analysisResult.techStack.map((tech: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home 
            setAnalysisResult={setAnalysisResult} 
            setLoading={setLoading} 
          />
        } />
        <Route path="/loading" element={<Loading />} />
        <Route path="/results" element={
          loading ? <Loading /> : <Results analysisResult={analysisResult} />
        } />
      </Routes>
    </Router>
  );
}

export default App;