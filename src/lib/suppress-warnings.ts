// Suppress React compatibility warnings
if (typeof window !== 'undefined') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    // Suppress Ant Design React compatibility warnings
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      args[0].includes('[antd: compatible]')
    ) {
      return;
    }
    // Allow other warnings to pass through
    originalConsoleWarn.apply(console, args);
  };
}
