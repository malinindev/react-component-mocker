# React Component Mocker

TypeScript NPM package for mocking React components in unit tests.

## Commands

### Development
```bash
npm run build            # Compile TypeScript to dist/
npm run check:all        # Run all checks
npm run check:format     # Check code formatting with Biome
npm run check:exports    # Verify package exports work
npm run check:unit    # Verify package exports work
npm run release:prepare  # Describe your changes for release
npm run fix:format       # Fix formatting issues
```

## Scripts Explained

- **`check:all`** - Runs all quality checks before release
- **`prepublishOnly`** - Automatically runs `ci` when you publish
- **`release:prepare`** - Interactive tool to describe changes for versioning

## Release Process

1. Make changes in `src/`
2. Run `npm run check:all` to check everything works
3. Run `npm run release:prepare` to describe changes
4. Commit and push
5. Go to GitHub Actions → Release → Run workflow
