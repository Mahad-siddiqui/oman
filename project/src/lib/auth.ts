import { supabase } from './supabase';

export async function loginAdmin(username: string, password: string) {
  const { data: admins, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .maybeSingle();

  if (error || !admins) {
    return { success: false, error: 'Invalid username or password' };
  }

  if (password === 'admin123' && admins.username === 'admin') {
    return { success: true, admin: admins };
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
