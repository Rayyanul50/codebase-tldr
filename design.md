# Codebase TL;DR - Design Document

## System Architecture

### High-Level Architecture
```
┌─────────────┐
│   User      │
│  Browser    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     React Frontend              │
│  - URL Input                    │
│  - Progress Display             │
│  - Video Player                 │
└──────┬──────────────────────────┘
       │ HTTPS/REST API
       ▼
┌─────────────────────────────────┐
│     Backend API Server          │
│  - Request Handler              │
│  - Job Queue Manager            │
│  - Response Handler             │
└──────┬──────────────────────────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ GitHub   │   │ OpenAI   │   │ElevenLabs│   │  Video   │
│   API    │   │ GPT-4    │   │   API    │   │Generator │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
       │              │              │              │
       └──────────────┴──────────────┴──────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   Storage    │
              │  (S3/CDN)    │
              └──────────────┘
```

## Component Design

### 1. Frontend (React)

#### Components Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── URLInput.jsx
│   ├── ProgressTracker.jsx
│   ├── VideoPlayer.jsx
│   ├── ErrorDisplay.jsx
│   └── ShareButtons.jsx
├── pages/
│   ├── Home.jsx
│   └── Result.jsx
├── services/
│   └── api.js
├── hooks/
│   └── useAnalysis.js
├── utils/
│   └── validators.js
└── App.jsx
```

#### Key Components

**URLInput Component**
```jsx
- Input field for GitHub URL
- Validation indicator
- Submit button
- Example URLs
- Error messages
```

**ProgressTracker Component**
```jsx
- Step indicators:
  1. Fetching repository
  2. Analyzing code
  3. Generating script
  4. Creating voiceover
  5. Rendering video
- Progress percentage
- Estimated time remaining
- Cancel option
```

**VideoPlayer Component**
```jsx
- Video playback controls
- Quality selector
- Download button
- Share options
- Transcript toggle
```

### 2. Backend API

#### API Endpoints

**POST /api/analyze**
```json
Request:
{
  "repo_url": "https://github.com/user/repo",
  "options": {
    "video_length": "5min",
    "detail_level": "medium"
  }
}

Response:
{
  "job_id": "uuid-string",
  "status": "processing",
  "estimated_time": 300
}
```

**GET /api/status/:job_id**
```json
Response:
{
  "job_id": "uuid-string",
  "status": "completed",
  "progress": 100,
  "current_step": "video_generation",
  "video_url": "https://cdn.../video.mp4",
  "transcript": "...",
  "metadata": {
    "repo_name": "user/repo",
    "languages": ["JavaScript", "Python"],
    "duration": "5:23"
  }
}
```

**GET /api/video/:job_id**
```
Returns: Video file stream or redirect to CDN
```

#### Processing Pipeline

```python
class CodebaseAnalyzer:
    def __init__(self, repo_url):
        self.repo_url = repo_url
        self.repo_data = None
        self.analysis = None
        self.script = None
        self.audio = None
        self.video = None
    
    def process(self):
        # Step 1: Fetch Repository
        self.repo_data = self.fetch_repository()
        
        # Step 2: Analyze Code
        self.analysis = self.analyze_codebase()
        
        # Step 3: Generate Script
        self.script = self.generate_script()
        
        # Step 4: Create Voiceover
        self.audio = self.generate_audio()
        
        # Step 5: Render Video
        self.video = self.create_video()
        
        return self.video
```

### 3. Code Analysis Module

#### Analysis Strategy
```python
def analyze_codebase(repo_path):
    analysis = {
        "overview": extract_overview(repo_path),
        "structure": analyze_structure(repo_path),
        "tech_stack": detect_technologies(repo_path),
        "key_files": identify_key_files(repo_path),
        "architecture": map_architecture(repo_path),
        "dependencies": extract_dependencies(repo_path)
    }
    return analysis

def extract_overview(repo_path):
    # Read README, package.json, setup.py
    # Extract project description
    # Identify main purpose
    pass

def analyze_structure(repo_path):
    # Build directory tree
    # Categorize folders (src, tests, docs, etc.)
    # Count files by type
    pass

def detect_technologies(repo_path):
    # Check package.json, requirements.txt, etc.
    # Identify frameworks (React, Django, etc.)
    # Detect build tools
    pass

def identify_key_files(repo_path):
    # Find entry points (main.py, index.js, etc.)
    # Locate configuration files
    # Identify core modules
    # Rank by importance
    pass
```

### 4. Script Generation Module

#### GPT-4 Prompt Template
```python
ANALYSIS_PROMPT = """
You are a technical educator creating a 5-minute video explanation of a codebase.

Repository Information:
- Name: {repo_name}
- Languages: {languages}
- Structure: {structure}
- Key Files: {key_files}
- Dependencies: {dependencies}

Create a structured script with the following sections:

1. INTRODUCTION (30 seconds)
   - What the project does
   - Who it's for
   - Main value proposition

2. TECHNOLOGY STACK (30 seconds)
   - Programming languages
   - Frameworks and libraries
   - Key tools

3. ARCHITECTURE OVERVIEW (90 seconds)
   - High-level architecture
   - Folder structure explanation
   - Design patterns used

4. KEY FILES DEEP DIVE (120 seconds)
   - Most important files
   - What each file does
   - How they connect

5. DATA FLOW (60 seconds)
   - How data moves through the system
   - Main user interactions
   - API endpoints (if applicable)

Format each section with:
- Clear, conversational language
- Technical accuracy
- Beginner-friendly explanations
- Specific code examples

Include timestamps and visual cues for video production.
"""

def generate_script(analysis):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a technical educator."},
            {"role": "user", "content": ANALYSIS_PROMPT.format(**analysis)}
        ],
        temperature=0.7,
        max_tokens=2000
    )
    return parse_script(response.choices[0].message.content)
```

### 5. Video Generation Module

#### Video Structure
```python
class VideoGenerator:
    def __init__(self, script, audio_path):
        self.script = script
        self.audio_path = audio_path
        self.scenes = []
    
    def create_scenes(self):
        # Scene 1: Title Card
        self.scenes.append({
            "type": "title",
            "duration": 3,
            "content": {
                "title": repo_name,
                "subtitle": "Code Explanation"
            }
        })
        
        # Scene 2-6: Content Scenes
        for section in self.script.sections:
            self.scenes.append({
                "type": "content",
                "duration": section.duration,
                "content": {
                    "title": section.title,
                    "text": section.text,
                    "code": section.code_snippet,
                    "diagram": section.diagram
                }
            })
        
        # Scene 7: Outro
        self.scenes.append({
            "type": "outro",
            "duration": 5,
            "content": {
                "message": "Thanks for watching!",
                "cta": "Star the repo on GitHub"
            }
        })
    
    def render(self):
        # Use FFmpeg to combine scenes with audio
        pass
```

#### FFmpeg Command Structure
```bash
# Combine images and audio
ffmpeg -loop 1 -i scene1.png -i audio.mp3 \
  -c:v libx264 -tune stillimage -c:a aac \
  -b:a 192k -pix_fmt yuv420p -shortest \
  -vf "scale=1920:1080" output.mp4

# Add text overlays
ffmpeg -i input.mp4 -vf "drawtext=text='Title':fontsize=48:x=(w-text_w)/2:y=50" output.mp4

# Concatenate multiple scenes
ffmpeg -f concat -i scenes.txt -c copy final.mp4
```

### 6. Visual Design System

#### Color Palette
```css
:root {
  --primary: #6366f1;      /* Indigo */
  --secondary: #8b5cf6;    /* Purple */
  --accent: #ec4899;       /* Pink */
  --background: #0f172a;   /* Dark Blue */
  --surface: #1e293b;      /* Slate */
  --text: #f1f5f9;         /* Light */
  --code-bg: #1e1e1e;      /* VS Code Dark */
  --success: #10b981;      /* Green */
  --error: #ef4444;        /* Red */
}
```

#### Typography
```css
/* Headings */
h1 { font-family: 'Inter', sans-serif; font-weight: 700; }
h2 { font-family: 'Inter', sans-serif; font-weight: 600; }

/* Body */
body { font-family: 'Inter', sans-serif; font-weight: 400; }

/* Code */
code { font-family: 'Fira Code', monospace; }
```

#### Video Slide Templates

**Template 1: Title Slide**
```
┌─────────────────────────────────┐
│                                 │
│         [REPO NAME]             │
│                                 │
│    Understanding the Codebase  │
│                                 │
│         [LOGO/ICON]             │
│                                 │
└─────────────────────────────────┘
```

**Template 2: Content Slide**
```
┌─────────────────────────────────┐
│  Section Title                  │
├─────────────────────────────────┤
│                                 │
│  • Bullet point 1               │
│  • Bullet point 2               │
│  • Bullet point 3               │
│                                 │
│  [CODE SNIPPET OR DIAGRAM]      │
│                                 │
└─────────────────────────────────┘
```

**Template 3: Architecture Slide**
```
┌─────────────────────────────────┐
│  Architecture Overview          │
├─────────────────────────────────┤
│                                 │
│     ┌──────┐    ┌──────┐       │
│     │ API  │───▶│  DB  │       │
│     └──────┘    └──────┘       │
│        │                        │
│        ▼                        │
│     ┌──────┐                    │
│     │ UI   │                    │
│     └──────┘                    │
│                                 │
└─────────────────────────────────┘
```

## Data Flow

### Complete Processing Flow
```
1. User submits GitHub URL
   ↓
2. Frontend validates URL
   ↓
3. POST request to /api/analyze
   ↓
4. Backend creates job in queue
   ↓
5. Worker picks up job
   ↓
6. Clone/fetch repository
   ↓
7. Analyze code structure
   ↓
8. Send analysis to GPT-4
   ↓
9. Receive structured script
   ↓
10. Send script to ElevenLabs
    ↓
11. Receive audio file
    ↓
12. Generate visual slides
    ↓
13. Combine audio + visuals with FFmpeg
    ↓
14. Upload video to storage
    ↓
15. Update job status to "completed"
    ↓
16. Frontend polls and gets video URL
    ↓
17. Display video to user
```

## Database Schema

### Jobs Table
```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY,
    repo_url VARCHAR(500) NOT NULL,
    status VARCHAR(50) NOT NULL,
    progress INTEGER DEFAULT 0,
    current_step VARCHAR(100),
    video_url VARCHAR(500),
    transcript TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT
);

CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
```

### Cache Table
```sql
CREATE TABLE repo_cache (
    repo_url VARCHAR(500) PRIMARY KEY,
    analysis JSONB,
    video_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    access_count INTEGER DEFAULT 0,
    last_accessed TIMESTAMP
);
```

## Error Handling

### Error Types
```python
class CodebaseTLDRError(Exception):
    pass

class RepositoryNotFoundError(CodebaseTLDRError):
    message = "Repository not found or not accessible"

class RepositoryTooLargeError(CodebaseTLDRError):
    message = "Repository exceeds size limit (100MB)"

class AnalysisFailedError(CodebaseTLDRError):
    message = "Failed to analyze codebase"

class APIError(CodebaseTLDRError):
    message = "External API error"

class VideoGenerationError(CodebaseTLDRError):
    message = "Failed to generate video"
```

### Error Response Format
```json
{
  "error": {
    "code": "REPO_NOT_FOUND",
    "message": "Repository not found or not accessible",
    "details": "The URL provided does not point to a valid public repository",
    "timestamp": "2024-02-06T10:30:00Z"
  }
}
```

## Performance Optimization

### Caching Strategy
- Cache repository analysis for 24 hours
- Cache generated videos for 7 days
- Use Redis for job status caching
- CDN for video delivery

### Async Processing
```python
# Use Celery or similar for background jobs
@celery.task
def process_repository(job_id, repo_url):
    try:
        analyzer = CodebaseAnalyzer(repo_url)
        result = analyzer.process()
        update_job_status(job_id, "completed", result)
    except Exception as e:
        update_job_status(job_id, "failed", error=str(e))
```

## Security Considerations

### Input Validation
```python
def validate_github_url(url):
    # Check URL format
    # Verify it's a GitHub URL
    # Check repository accessibility
    # Validate size before cloning
    pass
```

### Rate Limiting
```python
# Limit requests per IP
RATE_LIMIT = "10 per hour"

# Limit concurrent processing
MAX_CONCURRENT_JOBS = 5
```

### API Key Security
```python
# Store in environment variables
# Never commit to repository
# Rotate regularly
# Use separate keys for dev/prod
```

## Deployment Architecture

### Production Setup
```
┌─────────────────┐
│   Cloudflare    │  (CDN + DDoS Protection)
└────────┬────────┘
         │
┌────────▼────────┐
│     Vercel      │  (Frontend)
└─────────────────┘

┌─────────────────┐
│   Railway/      │  (Backend API)
│   Render        │
└────────┬────────┘
         │
┌────────▼────────┐
│   PostgreSQL    │  (Database)
└─────────────────┘

┌─────────────────┐
│   AWS S3 /      │  (Video Storage)
│   Cloudinary    │
└─────────────────┘

┌─────────────────┐
│   Redis         │  (Queue + Cache)
└─────────────────┘
```

## Testing Strategy

### Unit Tests
- URL validation
- Code analysis functions
- Script parsing
- Error handling

### Integration Tests
- GitHub API integration
- OpenAI API integration
- ElevenLabs API integration
- Video generation pipeline

### End-to-End Tests
- Complete workflow from URL to video
- Error scenarios
- Performance benchmarks

## Monitoring & Analytics

### Metrics to Track
- Processing time per stage
- Success/failure rates
- API costs per request
- User engagement (video views, shares)
- Popular repositories analyzed
- Error frequency by type

### Logging
```python
import logging

logger.info(f"Processing repository: {repo_url}")
logger.debug(f"Analysis result: {analysis}")
logger.error(f"Failed to generate video: {error}")
```

## Future Enhancements

### Phase 2 Features
- Interactive code exploration
- Custom video length options
- Multiple language support
- Private repository support
- Team collaboration features

### Phase 3 Features
- AI-powered Q&A about the codebase
- Code comparison between versions
- Integration with IDEs
- API for developers
- Mobile app

## Demo Script (Hackathon Presentation)

**Opening (30 seconds)**
"Ever spent hours trying to understand a new codebase? We built Codebase TL;DR - paste any GitHub URL and get a 5-minute video explanation in minutes."

**Demo (2 minutes)**
1. Show homepage with clean interface
2. Paste popular repo URL (e.g., React)
3. Show real-time progress tracker
4. Play generated video highlighting key features
5. Show download and share options

**Technical Highlights (1 minute)**
"We use GPT-4 to analyze code structure, ElevenLabs for natural voiceovers, and FFmpeg for video generation - all wrapped in a React frontend."

**Impact (30 seconds)**
"Perfect for developers onboarding to new projects, students learning from open source, or anyone wanting to understand code faster."

## Success Criteria

### MVP Success
- Process repository in < 5 minutes
- Generate coherent 5-minute video
- 90% accuracy in identifying key files
- Clean, functional UI
- Working demo for 3+ repositories

### Post-Hackathon Success
- 100+ repositories analyzed
- 80% user satisfaction
- < 2% error rate
- Positive feedback from developers
- Interest from potential users/investors
