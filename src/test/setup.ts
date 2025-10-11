import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest';

// Extend Vitest's expect with jest-dom matchers
try {
  expect.extend(matchers);
} catch (_) {
  // Silently fail if we can't extend expect with matchers
}

// Mock window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Mock localStorage and sessionStorage
class MockStorage implements Storage {
  private store: Record<string, string> = {};
  
  getItem(key: string): string | null {
    return this.store[key] || null;
  }
  
  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
  
  removeItem(key: string): void {
    delete this.store[key];
  }
  
  clear(): void {
    this.store = {};
  }
  
  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }
  
  get length(): number {
    return Object.keys(this.store).length;
  }
}

// Set up mocks before all tests
beforeAll(() => {
  // Mock localStorage and sessionStorage
  global.localStorage = new MockStorage() as unknown as Storage;
  global.sessionStorage = new MockStorage() as unknown as Storage;
  
  // Mock document.cookie
  const originalCookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || {};
  
  Object.defineProperty(document, 'cookie', {
    get: function() {
      return Object.entries(this._cookies || {})
        .map(([key, value]) => `${key}=${value}`)
        .join('; ') || '';
    },
    set: function(value: string) {
      if (!this._cookies) {
        this._cookies = {};
      }
      
      const [keyValuePair] = value.split(';');
      const [key, val = ''] = keyValuePair.split('=').map(s => s.trim());
      
      if (val === '') {
        delete this._cookies[key];
      } else {
        this._cookies[key] = val;
      }
    },
    configurable: true,
  });
  
  // Store the original cookie descriptor for cleanup
  window.__originalCookieDesc = originalCookieDesc;
});

// Extend the global Window interface
declare global {
  interface Window {
    __originalCookieDesc?: PropertyDescriptor;
  }
}

// Clean up after all tests
afterAll(() => {
  // Restore the original cookie descriptor if it exists
  if (window.__originalCookieDesc) {
    Object.defineProperty(document, 'cookie', window.__originalCookieDesc);
  }
});

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  
  // Reset mocks
  if ('localStorage' in global) {
    global.localStorage.clear();
  }
  
  if ('sessionStorage' in global) {
    global.sessionStorage.clear();
  }
  
  // Reset document.cookie
  if (typeof document !== 'undefined') {
    document.cookie = '';
  }
});
