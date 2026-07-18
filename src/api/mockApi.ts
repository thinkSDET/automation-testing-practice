// A fully in-memory "backend" so the app has zero external dependencies.
// Every function returns a Promise and simulates network latency, which
// is the whole point: it gives an automation framework real waits,
// real loading states, and real error paths to handle.

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface ManagedUser extends SessionUser {
  status: 'active' | 'invited' | 'suspended';
  createdAt: string;
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const LATENCY = { fast: 250, normal: 600, slow: 1400 };

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---------- Auth ----------

const VALID_CREDENTIALS = {
  email: 'qa.engineer@example.com',
  password: 'Practice123!',
};

let failedAttempts = 0;
const LOCKOUT_THRESHOLD = 3;

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: SessionUser }> {
  await delay(null, LATENCY.normal);

  if (failedAttempts >= LOCKOUT_THRESHOLD) {
    throw new Error(
      'Account temporarily locked after multiple failed attempts. Wait a moment and try again, or refresh to reset the practice session.'
    );
  }

  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    failedAttempts = 0;
    const user: SessionUser = {
      id: 'usr-001',
      name: 'Jordan Reyes',
      email,
      role: 'admin',
    };
    const token = 'mock-token-' + Math.random().toString(36).slice(2);
    localStorage.setItem('qa_sandbox_token', token);
    localStorage.setItem('qa_sandbox_user', JSON.stringify(user));
    return { token, user };
  }

  failedAttempts += 1;
  throw new Error('Invalid email or password.');
}

export async function registerAccount(
  name: string,
  email: string,
  password: string
): Promise<{ success: true }> {
  await delay(null, LATENCY.normal);
  if (email.toLowerCase() === VALID_CREDENTIALS.email) {
    throw new Error('An account with that email already exists.');
  }
  return { success: true };
}

export async function requestPasswordReset(email: string): Promise<{ success: true }> {
  await delay(null, LATENCY.slow);
  return { success: true };
}

export function logout(): void {
  localStorage.removeItem('qa_sandbox_token');
  localStorage.removeItem('qa_sandbox_user');
}

export function getSession(): { token: string; user: SessionUser } | null {
  const token = localStorage.getItem('qa_sandbox_token');
  const userRaw = localStorage.getItem('qa_sandbox_user');
  if (!token || !userRaw) return null;
  try {
    return { token, user: JSON.parse(userRaw) as SessionUser };
  } catch {
    return null;
  }
}

// ---------- Dashboard ----------

export interface DashboardStats {
  activeUsers: number;
  openOrders: number;
  revenueToday: number;
  errorRate: number;
}

export async function fetchDashboardStats(simulateError = false): Promise<DashboardStats> {
  await delay(null, LATENCY.slow);
  if (simulateError) {
    throw new Error('Failed to load dashboard metrics from the analytics service.');
  }
  return {
    activeUsers: 1284,
    openOrders: 37,
    revenueToday: 15420.5,
    errorRate: 0.4,
  };
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  await delay(null, LATENCY.normal);
  return [
    { id: 'act-1', message: 'Order #10432 was shipped', timestamp: '2 minutes ago' },
    { id: 'act-2', message: 'New user invited: priya@example.com', timestamp: '18 minutes ago' },
    { id: 'act-3', message: 'Order #10428 was cancelled', timestamp: '41 minutes ago' },
    { id: 'act-4', message: 'Monthly report generated', timestamp: '2 hours ago' },
  ];
}

// ---------- Orders table ----------

const ORDER_STATUSES: Order['status'][] = ['pending', 'shipped', 'delivered', 'cancelled'];

function buildOrders(): Order[] {
  const customers = [
    'Ava Thompson', 'Liam Chen', 'Sofia Martinez', 'Noah Patel', 'Mia Johansson',
    'Ethan Wright', 'Zara Ahmed', 'Lucas Kim', 'Grace O\u2019Neill', 'Omar Haddad',
    'Ines Fischer', 'Ben Okafor', 'Chloe Dubois', 'Ravi Shankar', 'Elena Popescu',
    'Marcus Lee', 'Nadia Volkov', 'Tom Baker', 'Yuki Tanaka', 'Sara Lindqvist',
  ];
  const products = ['Trail Runner Shoes', 'Wireless Headphones', 'Ceramic Mug Set', 'Backpack Pro', 'Desk Lamp', 'Notebook Bundle'];
  const orders: Order[] = [];
  for (let i = 0; i < 47; i++) {
    const d = new Date(2026, 6, 1 + (i % 18));
    orders.push({
      id: `ORD-${1000 + i}`,
      customer: customers[i % customers.length],
      product: products[i % products.length],
      amount: Math.round((20 + (i * 13.37) % 480) * 100) / 100,
      status: ORDER_STATUSES[i % ORDER_STATUSES.length],
      date: d.toISOString().slice(0, 10),
    });
  }
  return orders;
}

const ORDERS_DB = buildOrders();

export interface OrdersQuery {
  page: number;
  pageSize: number;
  sortBy?: keyof Order;
  sortDir?: 'asc' | 'desc';
  search?: string;
  status?: Order['status'] | 'all';
}

export async function fetchOrders(query: OrdersQuery): Promise<{ rows: Order[]; total: number }> {
  await delay(null, LATENCY.normal);
  let rows = [...ORDERS_DB];

  if (query.search) {
    const s = query.search.toLowerCase();
    rows = rows.filter(
      (o) => o.customer.toLowerCase().includes(s) || o.id.toLowerCase().includes(s) || o.product.toLowerCase().includes(s)
    );
  }
  if (query.status && query.status !== 'all') {
    rows = rows.filter((o) => o.status === query.status);
  }
  if (query.sortBy) {
    const { sortBy, sortDir } = query;
    rows.sort((a, b) => {
      const av: any = a[sortBy];
      const bv: any = b[sortBy];
      const cmp = av > bv ? 1 : av < bv ? -1 : 0;
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }

  const total = rows.length;
  const start = (query.page - 1) * query.pageSize;
  rows = rows.slice(start, start + query.pageSize);
  return { rows, total };
}

// ---------- User management ----------

let USERS_DB: ManagedUser[] = [
  { id: 'u1', name: 'Jordan Reyes', email: 'qa.engineer@example.com', role: 'admin', status: 'active', createdAt: '2026-01-14' },
  { id: 'u2', name: 'Priya Nair', email: 'priya@example.com', role: 'editor', status: 'active', createdAt: '2026-02-02' },
  { id: 'u3', name: 'Diego Alvarez', email: 'diego@example.com', role: 'viewer', status: 'invited', createdAt: '2026-03-19' },
  { id: 'u4', name: 'Hana Suzuki', email: 'hana@example.com', role: 'editor', status: 'suspended', createdAt: '2026-04-05' },
];

export async function fetchUsers(): Promise<ManagedUser[]> {
  await delay(null, LATENCY.fast);
  return [...USERS_DB];
}

export async function createUser(input: {
  name: string;
  email: string;
  role: ManagedUser['role'];
}): Promise<ManagedUser> {
  await delay(null, LATENCY.normal);
  if (USERS_DB.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error('A user with that email already exists.');
  }
  const user: ManagedUser = {
    id: 'u' + (USERS_DB.length + 1) + '-' + Math.random().toString(36).slice(2, 6),
    name: input.name,
    email: input.email,
    role: input.role,
    status: 'invited',
    createdAt: new Date().toISOString().slice(0, 10),
  };
  USERS_DB = [user, ...USERS_DB];
  return user;
}

export async function updateUser(id: string, patch: Partial<ManagedUser>): Promise<ManagedUser> {
  await delay(null, LATENCY.normal);
  const idx = USERS_DB.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error('User not found.');
  USERS_DB[idx] = { ...USERS_DB[idx], ...patch };
  return USERS_DB[idx];
}

export async function deleteUser(id: string): Promise<{ success: true }> {
  await delay(null, LATENCY.normal);
  USERS_DB = USERS_DB.filter((u) => u.id !== id);
  return { success: true };
}

// ---------- Form submission ----------

export interface ContactFormInput {
  fullName: string;
  email: string;
  department: string;
  priority: string;
  subscribe: boolean;
  message: string;
}

export async function submitContactForm(
  input: ContactFormInput
): Promise<{ ticketId: string }> {
  await delay(null, LATENCY.slow);
  if (input.email.toLowerCase().includes('bounce')) {
    throw new Error('The mail server rejected this address. Try a different email.');
  }
  return { ticketId: 'TKT-' + Math.floor(1000 + Math.random() * 9000) };
}
