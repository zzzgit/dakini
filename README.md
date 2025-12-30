# Dakini

Utility functions for Node.js (≥22) - random numbers, file system helpers, time formatting, and cross-platform directory paths.

## Installation
```bash
npm install dakini
```

## API

### Random & Probability
- `random(n, isFloating)` - Random number [0, n)
- `range(min, max, isFloating)` - Random number [min, max)
- `flipCoin()` - Random boolean (50/50)
- `chance(chance, range)` - Random boolean with probability
- `shuffle(arr)` - Shuffle array in place

### Math
- `factorial(num)` - Calculate factorial

### Time
- `formatTimeRange(seconds)` - Format time range as {days, hours, minutes, seconds}

### File System
- `ensureDir(dir)` - Create directory recursively
- `readFromFile(file)` - Read file contents

### System
- `getUsername()` - Get current username
- `getConfigDir(app)` - Get app config directory (XDG-compliant)
- `getDataDir(app)` - Get app data directory
- `getStateDir(app)` - Get app state directory
- `getCacheDir(app)` - Get app cache directory

### Utilities
- `sleep(milliseconds)` - Async delay
- `getCounter()` - Returns incrementing counter function

## License
GNU
