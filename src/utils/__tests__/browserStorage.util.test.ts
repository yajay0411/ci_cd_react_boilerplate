import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { LocalStorage, SessionStorage, CookieStorage } from '../browserStorage.util';

// Helper function to clear all cookies
export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name] = cookie.trim().split('=');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

describe('StorageUtil', () => {
  // Clear storage before and after each test
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
  });

  describe('LocalStorage', () => {
    it('should set and get an item from localStorage', () => {
      const key = 'testKey';
      const value = { name: 'test' };

      // Test set
      LocalStorage.set(key, value);

      // Test get
      const result = LocalStorage.get(key);
      expect(result).toEqual(value);
    });

    it('should return default value when item is not found', () => {
      const key = 'nonExistentKey';
      const defaultValue = 'default';

      const result = LocalStorage.get(key, defaultValue);
      expect(result).toBe(defaultValue);
    });

    it('should remove an item from localStorage', () => {
      const key = 'testKey';
      const value = { name: 'test' };

      // Set item first
      LocalStorage.set(key, value);

      // Verify it was set
      expect(LocalStorage.get(key)).toEqual(value);

      // Remove item
      LocalStorage.remove(key);

      // Verify it was removed
      expect(LocalStorage.get(key)).toBeNull();
    });

    it('should clear all items from localStorage', () => {
      // Add some items
      LocalStorage.set('key1', 'value1');
      LocalStorage.set('key2', 'value2');

      // Verify items were added
      expect(LocalStorage.get('key1')).toBe('value1');
      expect(LocalStorage.get('key2')).toBe('value2');

      // Clear all
      LocalStorage.clear();

      // Verify all items were removed
      expect(LocalStorage.get('key1')).toBeNull();
      expect(LocalStorage.get('key2')).toBeNull();
    });
  });

  describe('SessionStorage', () => {
    it('should set and get an item from sessionStorage', () => {
      const key = 'testKey';
      const value = { name: 'test' };

      // Test set
      SessionStorage.set(key, value);

      // Test get
      const result = SessionStorage.get(key);
      expect(result).toEqual(value);
    });

    it('should remove an item from sessionStorage', () => {
      const key = 'testKey';
      const value = { name: 'test' };

      // Set item first
      SessionStorage.set(key, value);

      // Verify it was set
      expect(SessionStorage.get(key)).toEqual(value);

      // Remove item
      SessionStorage.remove(key);

      // Verify it was removed
      expect(SessionStorage.get(key)).toBeNull();
    });

    it('should clear all items from sessionStorage', () => {
      // Add some items
      SessionStorage.set('key1', 'value1');
      SessionStorage.set('key2', 'value2');

      // Verify items were added
      expect(SessionStorage.get('key1')).toBe('value1');
      expect(SessionStorage.get('key2')).toBe('value2');

      // Clear all
      SessionStorage.clear();

      // Verify all items were removed
      expect(SessionStorage.get('key1')).toBeNull();
      expect(SessionStorage.get('key2')).toBeNull();
    });
  });

  describe('CookieStorage', () => {
    it('should set and get a cookie', () => {
      const name = 'testCookie';
      const value = 'testValue';

      // Set cookie
      CookieStorage.set(name, value);

      // Get cookie
      const result = CookieStorage.get(name);

      // Verify
      expect(result).toBe(value);
    });

    it('should return null when cookie is not found', () => {
      // Set a different cookie
      CookieStorage.set('otherCookie', 'otherValue');

      // Try to get non-existent cookie
      const result = CookieStorage.get('nonExistentCookie');

      expect(result).toBeNull();
    });

    it('should remove a cookie', () => {
      const name = 'testCookie';

      // Set the cookie first
      CookieStorage.set(name, 'testValue');
      expect(CookieStorage.get(name)).not.toBeNull();

      // Remove the cookie
      CookieStorage.remove(name);

      // The cookie should be removed
      expect(CookieStorage.get(name)).toBeNull();
    });
  });
});
