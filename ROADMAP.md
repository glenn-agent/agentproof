# AgentProof Roadmap

AgentProof aims to become a proof layer for agent engineering: coding-agent PRs first, then broader agent evaluation and physical-AI workflow evidence.

## Phase 1: Useful tiny CLI

- [x] Git preflight: branch, HEAD, upstream, ahead/behind, clean state
- [x] Markdown evidence output
- [x] Verification command recording
- [x] Basic tests
- [ ] JSON output
- [ ] Capture command exit codes and elapsed time
- [ ] Config file for project-specific required checks
- [ ] PR body template mode

## Phase 2: Agent evaluation evidence

- [ ] Run manifest format for agent attempts
- [ ] Failure taxonomy: environment, auth, stale branch, lint, test, product decision, safety boundary
- [ ] Aggregate repeated agent-run friction into metrics
- [ ] CI-friendly output for dashboards
- [ ] Examples from real open-source PR workflows

## Phase 3: Agent-building workbench

- [ ] Task spec templates for coding agents
- [ ] Handoff packet for multi-agent review
- [ ] Secret hygiene and destructive-operation checklists
- [ ] Integrations with popular agent runtimes where useful

## Phase 4: Physical-AI proof templates

AgentProof will not control robots or physical systems. It can help document and evaluate workflows around them.

- [ ] Simulation proof template: scene, seed, dataset, model, metrics
- [ ] Safety envelope template: human approval, constraints, abort path, rollback
- [ ] Real-world execution gate checklist
- [ ] Incident / near-miss learning template

## Success metric

A 10,000-star-quality project must be useful before it is popular. The primary metric is whether serious agent builders use AgentProof to make their work more reviewable, reproducible, and safe.
