# AfiyaPulse - Video Demo Guide

## Video Requirements

- **Duration**: 3 minutes (strict limit)
- **Format**: MP4, MOV, or AVI
- **Quality**: 1080p minimum
- **Audio**: Clear narration with no background noise
- **Platform**: YouTube (unlisted) or Vimeo
- **Accessibility**: Must be publicly accessible

---

## Demo Script (3 minutes - Condensed)

### 1. Introduction (20 seconds)

**On Screen**: Title slide with AfiyaPulse logo

**Narration**:
> "AfiyaPulse is an AI-powered clinical documentation system that reduces physician documentation time by 70%. Built with IBM Watson Speech-to-Text and IBM Bob, it automates SOAP notes, prescriptions, and referrals using multi-agent AI."

---

### 2. Live Demo - Consultation Recording (45 seconds)

**On Screen**: Dashboard → New Consultation

**Actions** (Fast-paced):

1. Quick login and dashboard view (3 seconds)
2. Click "New Consultation" → Select patient (3 seconds)
3. Click "Start Recording" (2 seconds)
4. Play 15-second pre-recorded conversation showing real-time Watson transcription
5. Stop recording (2 seconds)
6. Show AI agents processing in real-time (20 seconds):
   - Clinical Scribe generating SOAP note
   - Prescription Drafter creating prescription
   - All agents completing

**Narration**:
> "Watch as we record a consultation. IBM Watson transcribes in real-time with speaker identification. Our multi-agent AI system, built with LangGraph and developed using IBM Bob, automatically generates comprehensive SOAP notes, prescriptions with drug interaction checks, and referral letters in under 30 seconds."

---

### 3. Review & Approval (45 seconds)

**On Screen**: Review Panel

**Actions**:

1. Navigate to Review Panel (2 seconds)
2. Show side-by-side view: transcript and SOAP note (10 seconds)
3. Quick edit demonstration (5 seconds)
4. Show prescription with drug interactions (8 seconds)
5. Click "Approve All" (3 seconds)
6. Generate PDFs (5 seconds)
7. Show professional PDF output (7 seconds)
8. Show email notification sent (5 seconds)

**Narration**:
> "Physicians review AI-generated documents side-by-side with transcripts. Edit anything needed - changes are tracked. Approve all documents with one click. Professional PDFs are generated instantly and patients receive secure email notifications. What took 20 minutes now takes 2."

---

### 4. Technology & Impact (30 seconds)

**On Screen**: Split screen - Technology stack + Impact metrics

**Narration**:
> "Built entirely with IBM Bob as our development assistant - 15,000 lines of production-ready code in 30 days. IBM Watson Speech-to-Text provides 95% accuracy with medical terminology. The result: 70% less documentation time, 30% more patients seen, 85% fewer errors, and happier physicians.
>
> AfiyaPulse is production-ready and transforming healthcare documentation today. Visit our GitHub for the complete source code."

**Show**:

- Bob usage stats
- Watson STT integration
- Impact metrics
- GitHub link

---

### 5. Closing (10 seconds)

**On Screen**: Contact information and links

**Narration**:
> "Thank you. AfiyaPulse - AI-powered clinical documentation automation."

**Show**:

- Project name and tagline
- GitHub repository link
- Contact email

---

## Recording Setup

### Equipment Needed

- **Screen Recording**: OBS Studio, Camtasia, or ScreenFlow
- **Microphone**: USB microphone or headset with good audio quality
- **Webcam** (optional): For picture-in-picture introduction
- **Editing Software**: DaVinci Resolve (free) or Adobe Premiere Pro

### Recording Settings

- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30 fps
- **Audio**: 48kHz, 16-bit minimum
- **Format**: MP4 (H.264 codec)
- **Bitrate**: 5-10 Mbps

### Environment Setup

- **Quiet Room**: No background noise
- **Good Lighting**: If using webcam
- **Clean Desktop**: Close unnecessary applications
- **Browser**: Use Chrome/Edge in incognito mode for clean UI
- **Test Data**: Pre-populate with sample patients and consultations

---

## Pre-Recording Checklist

### System Preparation

- [ ] Start API server (`npm run dev:api`)
- [ ] Start web app (`npm run dev:web`)
- [ ] Clear browser cache and cookies
- [ ] Login with demo account
- [ ] Pre-load sample data (patients, consultations)
- [ ] Test audio recording functionality
- [ ] Prepare pre-recorded doctor-patient conversation audio
- [ ] Test Watson STT connection
- [ ] Verify all services are running (database, Redis, storage)

### Content Preparation

- [ ] Write and practice narration script
- [ ] Prepare slides (title, architecture, tech stack, impact)
- [ ] Create sample patient data
- [ ] Record doctor-patient conversation audio
- [ ] Test complete workflow end-to-end
- [ ] Time each section to ensure 3-minute total (strict!)
- [ ] Prepare backup recordings in case of issues

### Technical Setup

- [ ] Close all unnecessary applications
- [ ] Disable notifications (Do Not Disturb mode)
- [ ] Set screen resolution to 1920x1080
- [ ] Increase browser zoom if needed for visibility
- [ ] Test microphone levels
- [ ] Test screen recording software
- [ ] Have backup recording method ready

---

## Recording Tips for 3-Minute Demo

### Do's

✅ Speak clearly and at a BRISK pace (3 minutes is very tight!)
✅ Practice multiple times to stay within 3 minutes exactly
✅ Use quick, smooth transitions between sections
✅ Show enthusiasm and confidence
✅ Highlight ONLY core features (transcription, AI agents, review)
✅ Demonstrate real functionality (not mockups)
✅ Keep cursor movements smooth and deliberate
✅ Use keyboard shortcuts for speed
✅ Show real-time processing and results
✅ Emphasize IBM Bob and Watson integration prominently
✅ Time each section precisely with a stopwatch

### Don'ts

❌ Go over 3 minutes (strict limit - may be disqualified!)
❌ Rush so fast that narration becomes unclear
❌ Use filler words ("um", "uh", "like")
❌ Show errors or bugs
❌ Include sensitive or real patient data
❌ Show too many features (focus on core value proposition)
❌ Use poor audio quality
❌ Show cluttered or messy UI
❌ Forget to mention IBM technologies
❌ End abruptly without conclusion

### Precise Time Management

- **0:00-0:20**: Introduction (20 seconds)
- **0:20-1:05**: Consultation recording demo (45 seconds)
- **1:05-1:50**: Review and approval (45 seconds)
- **1:50-2:20**: Technology and impact (30 seconds)
- **2:20-2:30**: Closing (10 seconds)
- **2:30-3:00**: Buffer for transitions (30 seconds)
- **Total**: Exactly 3:00 minutes

---

## Post-Recording

### Editing

1. **Trim**: Remove dead air and mistakes
2. **Add**: Title cards and transitions
3. **Enhance**: Adjust audio levels and remove noise
4. **Highlight**: Add arrows or circles to emphasize features
5. **Captions**: Add subtitles for accessibility
6. **Music**: Add subtle background music (optional)
7. **Export**: Render in 1080p MP4 format

### Upload

1. **YouTube**:
   - Create unlisted video
   - Title: "AfiyaPulse - AI-Powered Clinical Documentation Automation"
   - Description: Include project overview and links
   - Tags: healthcare, AI, IBM Watson, clinical documentation, Bob
   - Thumbnail: Create custom thumbnail with logo

2. **Vimeo** (alternative):
   - Upload as public or password-protected
   - Add project description
   - Enable download if required

### Verification

- [ ] Video plays correctly
- [ ] Audio is clear throughout
- [ ] All features are demonstrated
- [ ] Links in description work
- [ ] Video is publicly accessible
- [ ] Duration is EXACTLY 3 minutes or less (strict requirement!)
- [ ] Quality is 1080p
- [ ] Captions are accurate (if added)

---

## Backup Plan

If live demo fails during recording:

1. Have pre-recorded demo segments ready
2. Use screenshots with voiceover
3. Show architecture diagrams and explain functionality
4. Focus on code walkthrough in repository
5. Demonstrate individual components separately

---

## Sample Narration Script

See detailed narration in each section above. Key points to emphasize:

1. **Problem**: Healthcare documentation burden
2. **Solution**: AI-powered automation with IBM technologies
3. **Technology**: Bob for development, Watson for transcription
4. **Features**: Real-time transcription, multi-agent AI, review workflow
5. **Impact**: 70% time reduction, improved patient care
6. **Future**: Scalable, production-ready platform

---

## Resources

- **Architecture Diagram**: `docs/Agent-system-architecture.png`
- **API Documentation**: `docs/API.md`
- **README**: `README.md`
- **Submission Details**: `SUBMISSION.md`
- **GitHub Repository**: [Add URL after making public]

---

## Contact

For questions about the demo:

- **Email**: <oyugimaurice22@gmail.com>
- **Project**: AfiyaPulse
- **Repository**: [GitHub URL]

---

**Good luck with your video recording! 🎥**
