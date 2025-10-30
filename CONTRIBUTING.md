# Contributing

Thanks for your interest in contributing to react-component-mocker!

## Development

### Setup
```bash
git clone https://github.com/malininss/react-component-mocker.git
cd react-component-mocker
bun install
```

### Commands
```bash
bun run dev              # Compile TypeScript to dist/ in watch mode
bun run build            # Compile TypeScript to dist/
bun run test             # Run tests
bun run check:all        # Run all checks (build, format, exports, tests)
bun run check:biome     # Check code with Biome
bun run fix:biome       # Fix code issues
```

## Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes in `src/`
4. Run `bun run release:prepare` to describe your changes
5. Run `bun run check:all` to ensure everything works
6. Commit and push to your fork (including the changeset file)
7. Open a Pull Request

## What to Contribute

Check out our [TODO](TODO.md) for ideas on what to work on next! 
