import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../src/proof.js';

test('renderMarkdown includes repository state and verification commands', () => {
  const markdown = renderMarkdown({
    gitState: {
      root: '/repo',
      branch: 'feature/proof',
      head: 'abc1234',
      upstream: 'origin/main',
      ahead: 1,
      behind: 0,
      clean: true,
      changedFiles: [],
    },
    diffSummary: {
      staged: '',
      unstaged: '',
      files: [],
    },
    commands: ['npm test', 'npm run lint'],
  });

  assert.match(markdown, /## AgentProof/);
  assert.match(markdown, /Branch: `feature\/proof`/);
  assert.match(markdown, /`npm test`/);
  assert.match(markdown, /`npm run lint`/);
  assert.match(markdown, /Working tree is clean/);
});

test('renderMarkdown warns when branch is behind upstream', () => {
  const markdown = renderMarkdown({
    gitState: {
      root: '/repo',
      branch: 'feature/stale',
      head: 'def5678',
      upstream: 'origin/main',
      ahead: 0,
      behind: 3,
      clean: false,
      changedFiles: [{ status: ' M', path: 'src/index.js' }],
    },
    diffSummary: {
      staged: '',
      unstaged: ' src/index.js | 2 ++',
      files: ['src/index.js'],
    },
    commands: [],
  });

  assert.match(markdown, /⚠️ Working tree has local changes/);
  assert.match(markdown, /⚠️ Branch is 3 commit\(s\) behind origin\/main/);
  assert.match(markdown, /`src\/index.js`/);
});
