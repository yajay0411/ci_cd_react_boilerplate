/* eslint-disable no-console */
type StorageType = 'local' | 'session';

class StorageUtil {
  private storage: Storage;

  constructor(type: StorageType = 'local') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage`, error);
    }
  }

  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from storage`, error);
      return defaultValue;
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage`, error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
}

// Cookie Utility
class CookieUtil {
  set(
    name: string,
    value: string,
    days = 7,
    path = '/',
    sameSite: 'Strict' | 'Lax' | 'None' = 'Lax',
    secure = false,
  ): void {
    try {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `; expires=${date.toUTCString()}`;
      const secureFlag = secure ? '; Secure' : '';
      document.cookie = `${name}=${encodeURIComponent(
        value,
      )}${expires}; path=${path}; SameSite=${sameSite}${secureFlag}`;
    } catch (error) {
      console.error(`Error setting cookie ${name}`, error);
    }
  }

  get(name: string): string | null {
    try {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    } catch (error) {
      console.error(`Error reading cookie ${name}`, error);
      return null;
    }
  }

  remove(name: string, path = '/'): void {
    try {
      document.cookie = `${name}=; Max-Age=-99999999; path=${path}`;
    } catch (error) {
      console.error(`Error removing cookie ${name}`, error);
    }
  }
}

export const LocalStorage = new StorageUtil('local');
export const SessionStorage = new StorageUtil('session');
export const CookieStorage = new CookieUtil();
