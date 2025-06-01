# Contributing

Thanks for your interest in contributing to react-component-mocker!

## Development

### Setup
```bash
git clone https://github.com/malininss/react-component-mocker.git
cd react-component-mocker
npm install
```

### Commands
```bash
npm run dev              # Compile TypeScript to dist/ in watch mode
npm run build            # Compile TypeScript to dist/
npm run test             # Run tests
npm run check:all        # Run all checks (build, format, exports, tests)
npm run check:format     # Check code formatting with Biome
npm run fix:format       # Fix formatting issues
```

## Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes in `src/`
4. Run `npm run release:prepare` to describe your changes
5. Run `npm run check:all` to ensure everything works
6. Commit and push to your fork (including the changeset file)
7. Open a Pull Request

## What to Contribute

Check out our [TODO](TODO.md) for ideas on what to work on next! 
