#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { generateProof } from '../src/proof.js';

function printHelp() {
  console.log(`AgentProof

Turn coding-agent work into review-ready proof.

Usage:
  agentproof [options]

Options:
  --cwd <path>          Repository path. Defaults to the current directory.
  --command <command>   Verification command to include. Repeatable.
  --out <path>          Write markdown proof to a file instead of stdout.
  -h, --help            Show help.

Examples:
  agentproof
  agentproof --command "npm test" --command "npm run lint"
  agentproof --cwd ../openclaw --out proof.md
`);
}

function parseArgs(argv) {
  const options = { commands: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '-h' || arg === '--help') {
      options.help = true;
      continue;
    }

    if (arg === '--cwd') {
      options.cwd = argv[++index];
      if (!options.cwd) throw new Error('--cwd requires a path');
      continue;
    }

    if (arg === '--command') {
      const command = argv[++index];
      if (!command) throw new Error('--command requires a value');
      options.commands.push(command);
      continue;
    }

    if (arg === '--out') {
      options.out = argv[++index];
      if (!options.out) throw new Error('--out requires a path');
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

try {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  const markdown = generateProof({ cwd: options.cwd ?? process.cwd(), commands: options.commands });

  if (options.out) {
    writeFileSync(options.out, markdown);
  } else {
    console.log(markdown);
  }
} catch (error) {
  console.error(`agentproof: ${error.message}`);
  process.exit(1);
}
