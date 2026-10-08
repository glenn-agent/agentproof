import { execFileSync } from 'node:child_process';

export function runGit(args, options = {}) {
  try {
    return execFileSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trimEnd();
  } catch (error) {
    if (options.allowFailure) {
      return '';
    }

    const stderr = error.stderr ? String(error.stderr).trim() : error.message;
    throw new Error(`git ${args.join(' ')} failed: ${stderr}`);
  }
}

export function readGitState(cwd = process.cwd()) {
  const insideWorkTree = runGit(['rev-parse', '--is-inside-work-tree'], {
    cwd,
    allowFailure: true,
  });

  if (insideWorkTree !== 'true') {
    throw new Error(`${cwd} is not inside a Git work tree`);
  }

  const branch = runGit(['branch', '--show-current'], { cwd, allowFailure: true }) || '(detached)';
  const head = runGit(['rev-parse', '--short', 'HEAD'], { cwd, allowFailure: true }) || '(unborn)';
  const root = runGit(['rev-parse', '--show-toplevel'], { cwd });
  const porcelain = runGit(['status', '--short'], { cwd, allowFailure: true });
  const upstream = runGit(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'], {
    cwd,
    allowFailure: true,
  });

  let ahead = 0;
  let behind = 0;
  if (upstream) {
    const counts = runGit(['rev-list', '--left-right', '--count', `${upstream}...HEAD`], {
      cwd,
      allowFailure: true,
    });
    const [behindCount, aheadCount] = counts.split(/\s+/).map((value) => Number.parseInt(value, 10));
    behind = Number.isFinite(behindCount) ? behindCount : 0;
    ahead = Number.isFinite(aheadCount) ? aheadCount : 0;
  }

  const changedFiles = porcelain
    ? porcelain.split('\n').map((line) => ({
        status: line.slice(0, 2),
        path: line.slice(3),
      }))
    : [];

  return {
    root,
    branch,
    head,
    upstream: upstream || null,
    ahead,
    behind,
    clean: changedFiles.length === 0,
    changedFiles,
  };
}

export function readDiffSummary(cwd = process.cwd()) {
  const staged = runGit(['diff', '--cached', '--stat'], { cwd, allowFailure: true });
  const unstaged = runGit(['diff', '--stat'], { cwd, allowFailure: true });
  const names = runGit(['diff', '--name-only', 'HEAD'], { cwd, allowFailure: true });

  return {
    staged,
    unstaged,
    files: names ? names.split('\n').filter(Boolean) : [],
  };
}
