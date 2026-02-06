# Codebase TL;DR - Requirements Document

## Project Overview
**Name:** Codebase TL;DR  
**Tagline:** "Understand any GitHub repository in 5 minutes"  
**Purpose:** AI-powered tool that analyzes GitHub repositories and generates video explanations of code architecture, key files, and functionality.

## Core Features

### 1. Repository Input
- Accept GitHub repository URL via web interface
- Validate URL format and repository accessibility
- Support public repositories (private repos optional for MVP)
- Handle various repo sizes (set initial limit: <100MB for MVP)

### 2. Code Analysis
- Clone/fetch repository contents
- Analyze project structure and file organization
- Identify programming languages and frameworks
- Detect key files (entry points, configs, main modules)
- Map dependencies and relationships
- Generate architecture diagram/visualization
- Extract code patterns and design principles

### 3. Content Generation
- Create structured explanation script covering:
  - Project purpose and overview (30 seconds)
  - Technology stack (30 seconds)
  - Architecture and folder structure (1.5 minutes)
  - Key files and their roles (2 minutes)
  - Data flow and main functionality (1 minute)
- Generate visual slides/diagrams for video
- Ensure explanation is beginner-friendly yet technical

### 4. Video Production
- Convert script to natural-sounding voiceover
- Sync voiceover with visual elements
- Include code snippets and highlights
- Add architecture diagrams
- Generate 4-6 minute video output
- Support multiple video formats (MP4, WebM)

### 5. User Interface
- Clean, modern React frontend
- Single input field for GitHub URL
- Real-time progress indicator
- Video player with controls
- Download/share options
- History of analyzed repositories (optional)

## Technical Requirements

### Backend
- **Language:** Python or Node.js
- **Framework:** Flask/FastAPI or Express.js
- **API Integration:**
  - OpenAI GPT-4 API (code analysis & script generation)
  - GitHub API (repository access)
  - ElevenLabs API (text-to-speech)
- **Video Processing:** FFmpeg or similar
- **Storage:** Temporary file storage for processing

### Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS or Material-UI
- **State Management:** React Context or Redux (if needed)
- **HTTP Client:** Axios or Fetch API

### APIs & Services

#### 1. OpenAI GPT-4 API
- **Purpose:** Code analysis and script generation
- **Endpoints:** Chat Completions API
- **Rate Limits:** Consider token limits per request
- **Cost:** ~$0.03 per 1K tokens (input), ~$0.06 per 1K tokens (output)

#### 2. GitHub API
- **Purpose:** Repository access and metadata
- **Authentication:** Personal Access Token or OAuth
- **Rate Limits:** 5,000 requests/hour (authenticated)
- **Endpoints:**
  - Get repository contents
  - Get repository tree
  - Get file contents

#### 3. ElevenLabs API
- **Purpose:** Text-to-speech voiceover generation
- **Voice Options:** Professional, clear voice
- **Output Format:** MP3 or WAV
- **Rate Limits:** Based on subscription tier
- **Cost:** ~$0.30 per 1K characters (starter plan)

#### 4. Video Generation
- **Tool:** FFmpeg (open-source)
- **Alternative:** Remotion (React-based video)
- **Features:**
  - Combine audio and visuals
  - Add transitions
  - Overlay text and code snippets

### Infrastructure
- **Hosting:** Vercel (frontend) + Railway/Render (backend)
- **Storage:** AWS S3 or Cloudinary (video storage)
- **Database:** PostgreSQL or MongoDB (user history, cache)
- **Queue System:** Redis/Bull (for async processing)

## System Requirements

### Development Environment
- Node.js 18+ or Python 3.9+
- Git
- FFmpeg installed locally
- 8GB RAM minimum
- 10GB free disk space

### Production Environment
- Cloud hosting with 2GB+ RAM
- 20GB storage for temporary files
- CDN for video delivery
- SSL certificate for HTTPS

## API Keys Required
1. OpenAI API Key (GPT-4 access)
2. ElevenLabs API Key
3. GitHub Personal Access Token
4. (Optional) AWS credentials for S3

## Performance Requirements
- Repository analysis: < 2 minutes
- Script generation: < 1 minute
- Video generation: < 2 minutes
- Total processing time: < 5 minutes
- Video quality: 1080p or 720p
- Audio quality: 128kbps minimum

## Security Requirements
- Secure API key storage (environment variables)
- Input validation and sanitization
- Rate limiting to prevent abuse
- No storage of repository code after processing
- HTTPS for all communications
- CORS configuration for frontend

## Scalability Considerations
- Queue system for handling multiple requests
- Caching for previously analyzed repositories
- Horizontal scaling capability
- CDN for video delivery
- Database indexing for quick lookups

## User Experience Requirements
- Mobile-responsive design
- Loading states with progress indicators
- Error handling with clear messages
- Video preview before download
- Share functionality (social media, embed code)
- Accessibility compliance (WCAG 2.1)

## MVP Scope (Hackathon Version)
**Must Have:**
- GitHub URL input
- Basic code analysis (file structure, main files)
- GPT-4 generated explanation script
- ElevenLabs voiceover
- Simple video with static slides
- Basic React frontend

**Nice to Have:**
- Advanced architecture diagrams
- Code snippet highlighting
- User authentication
- Repository history
- Multiple language support

**Future Enhancements:**
- Private repository support
- Custom video length options
- Interactive code exploration
- Team collaboration features
- API for developers

## Success Metrics
- Processing time < 5 minutes
- Video clarity and audio quality
- User satisfaction (feedback)
- Accuracy of code analysis
- Number of repositories processed

## Constraints & Limitations
- Repository size limit (100MB for MVP)
- Supported languages (focus on popular ones)
- API rate limits and costs
- Processing queue capacity
- Video storage limits

## Budget Estimate (Monthly)
- OpenAI API: $50-200 (depending on usage)
- ElevenLabs: $30-100
- Hosting: $20-50
- Storage: $10-30
- Total: ~$110-380/month

## Timeline (Hackathon - 48 hours)
- Hour 0-4: Setup & GitHub API integration
- Hour 4-12: GPT-4 code analysis implementation
- Hour 12-20: Script generation & ElevenLabs integration
- Hour 20-32: Video generation with FFmpeg
- Hour 32-40: React frontend development
- Hour 40-48: Testing, polish, demo preparation

## Dependencies
```json
{
  "backend": [
    "openai",
    "requests",
    "flask/fastapi",
    "python-dotenv",
    "gitpython",
    "elevenlabs"
  ],
  "frontend": [
    "react",
    "axios",
    "tailwindcss",
    "react-player"
  ],
  "tools": [
    "ffmpeg",
    "git"
  ]
}
```

## Risk Mitigation
- **API Failures:** Implement retry logic and fallbacks
- **Large Repos:** Set size limits and timeout handling
- **Cost Overruns:** Implement usage caps and monitoring
- **Quality Issues:** Add validation for generated content
- **Performance:** Use caching and queue systems

## Testing Requirements
- Unit tests for core functions
- Integration tests for API calls
- End-to-end test for full workflow
- Load testing for concurrent requests
- Manual testing of video quality

## Documentation Needs
- API documentation
- Setup instructions
- User guide
- Architecture documentation
- Deployment guide
