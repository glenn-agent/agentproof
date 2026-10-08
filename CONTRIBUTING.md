# Contributing to AgentProof

Thank you for considering a contribution.

AgentProof is intentionally small at the start. The best contributions are practical, reviewable, and tied to real agent-building or agent-evaluation workflows.

## Good first contributions

- Improve CLI output clarity.
- Add tests for Git edge cases.
- Add JSON output without changing the default Markdown flow.
- Document real PR evidence examples.
- Propose proof templates for coding-agent, evaluation, or physical-AI workflows.

## Design principles

1. **Proof over claims** — AgentProof should help agents show evidence, not just report success.
2. **Human review first** — generated output should be easy to inspect before pasting or publishing.
3. **Small reliable core** — avoid heavyweight frameworks until the need is proven.
4. **Safety matters** — physical-AI and real-world automation templates must include approval gates and rollback notes.
5. **No secrets** — never include tokens, private endpoints, or credentials in examples, fixtures, issues, or commits.

## Development

```sh
npm install
npm test
npm run lint
node bin/agentproof.js --help
```

## Pull requests

Please include:

- What changed
- Why it matters
- Commands you ran
- Any limitations or follow-up work

If you use AgentProof to generate the PR evidence block, review it before posting.
