# Anti-AI-Slop Code Quality Rules

1. **NO Silent Error Swallowing**: Never use empty `try { ... } catch {}` or return fake fallback data to mask runtime exceptions.
2. **NO Redundant Comments**: Delete generic commentary that simply repeats what the code line does.
3. **NO Placeholder Text**: Use realistic, contextual, production-grade data and functional components instead of "Lorem ipsum" or "John Doe".
4. **NO Symptom Patches**: Always diagnose and fix the underlying root cause based on exact un-truncated log tracebacks.
5. **Clean Unbloated Code**: Enforce strict TypeScript typing, modular architecture, and zero code bloat.
