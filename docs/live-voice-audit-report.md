# Translink Live Voice Assistant: Tester vs. Main Project Audit

## 1. Executive Summary
This audit compares the prototype codebase found in `\docs\gemini-live-voice-tester` against the currently integrated solution in the main application (`\vite.config.ts` and `TranslinkEasterEggFriend`). 

The tester project contains several advanced **User Experience (UX)** and **Backend Cognitive (RAG)** features that are currently missing from the main production application. Migrating these features will significantly elevate the professionalism and intelligence of the AI Assistant.

---

## 2. Frontend & UX Audit

### 2.1 Missing UI Components (`src/App.tsx`)
The tester project implements a highly polished React UI overlay that provides critical feedback to the user:
*   **`TranscriptionHud`:** Displays real-time, live captions of what the AI and the user are saying. Currently, the main 3D easter egg only provides audio output.
*   **`ConnectionStatus`:** Gives visual feedback (connecting, active, error) ensuring the user knows the state of the websocket.
*   **Cinematic Trigger Button:** A highly stylized "LAUNCH FLEET AI" toggle button with pulse animations (`motion/react`) used to manually activate/deactivate the HUD and AI session.

### 2.2 Interactive Visuals (`src/components/character/Robot`)
*   The tester project features a 2D/3D reactive Robot component that tracks the user's cursor (`mousePos`, `mouseInStage`). 
*   **Recommendation:** While the main project uses `TranslinkEasterEggFriend` (a 3D canvas object), we should implement the cursor-tracking mathematics from the tester project so the 3D Easter Egg "looks" at the user's mouse when active.

---

## 3. Backend & AI Brain Audit

### 3.1 Long-Term Memory & Logging (`server/services/GeminiLiveService.ts`)
*   **Feature:** The tester captures the conversational transcript and logs it using `knowledgeBridge.recordInteraction(sessionId, text)`. 
*   **Status in Main:** Missing. The main application forwards the Gemini text payload via websockets but drops it without logging.
*   **Recommendation:** Add a MongoDB or local JSON logger into `vite.config.ts` to save chat transcripts. This is vital for customer support QA and lead generation.

### 3.2 Vector RAG Architecture (`scripts/ingest_knowledge.ts`)
*   **Feature:** The tester project uses a `ragService.indexDocument()` pipeline. This means it creates mathematical embeddings (Vector RAG) for files, allowing it to search massive databases (like thousands of pages of FLS manuals).
*   **Status in Main:** Replaced with **In-Context Dynamic Loading**. We recently built a system in `vite.config.ts` that injects the whole `knowledge.md` file directly into the system prompt.
*   **Recommendation:** Our current method is actually **faster and perfectly suited** for < 20,000 words. However, if the Translink website data grows beyond Gemini's context window, we will need to migrate the `RagService` embedding scripts from the tester into the main project's backend.

---

## 4. Proposed Migration Roadmap

To bring the main project up to the standard of the tester project, we should execute the following phases:

### Phase 1: Real-time Transcription Integration
1. Extract the `TranscriptionHud` and `ConnectionStatus` components from `docs/gemini-live-voice-tester/src/components`.
2. Integrate them into the main React overlay over the Three.js Canvas.
3. Bind the HUD to the WebSocket text stream already provided by our custom `geminiVoicePlugin`.

### Phase 2: User Interaction Logging
1. Update `vite.config.ts` to capture the `message.serverContent.modelTurn.parts` text.
2. Save these transcripts to a daily log file in `src/translinkconfig/logs/` so the admin can review what questions clients are asking.

### Phase 3: RAG Scalability (Optional Future Upgrade)
1. If the `knowledge.md` file grows too large, copy the `server/brain` folder from the tester project.
2. Implement Pinecone or Weaviate to chunk and search the website documentation dynamically instead of injecting the entire file on every call.
