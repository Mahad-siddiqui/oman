import { db } from './localStorage';

export async function loginAdmin(username: string, password: string) {
  const admin = await db.admins.getByUsername(username);

  if (!admin) {
    return { success: false, error: 'Invalid username or password' };
  }

  if (password === admin.password) {
    return { success: true, admin: admin };
  }

  return { success: false, error: 'Invalid username or password' };
}

export function getStoredAdmin() {
  const adminStr = localStorage.getItem('admin');
  if (adminStr) {
    try {
      return JSON.parse(adminStr);
    } catch {
      return null;
    }
  }
  return null;
}

export function storeAdmin(admin: unknown) {
  localStorage.setItem('admin', JSON.stringify(admin));
}

export function clearAdmin() {
  localStorage.removeItem('admin');
}
