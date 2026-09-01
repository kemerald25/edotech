import { INITIAL_ROLES, INITIAL_ADMIN_USERS, Role, AdminUser, PermissionKey } from "./permissions";

export type { Role, AdminUser, PermissionKey } from "./permissions";

export interface PlatformEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "Product Studio" | "Talent" | "Community" | "Civic Tech" | "Hackathon";
  date: string;
  endDate?: string;
  locationType: "physical" | "virtual" | "hybrid";
  venueName: string;
  address: string;
  virtualLink?: string;
  bannerUrl: string;
  capacity: number;
  registeredCount: number;
  status: "published" | "draft" | "completed";
  featured: boolean;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  attendanceMode: "in-person" | "virtual";
  hubspotSynced: boolean;
  createdAt: string;
}

export interface DynamicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}

export interface MembershipRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  discipline: string;
  hubLocation: string;
  portfolioUrl?: string;
  interests: string[];
  status: "active" | "review" | "alumni";
  hubspotSynced: boolean;
  createdAt: string;
}

// Initial Seed Data
const INITIAL_EVENTS: PlatformEvent[] = [
  {
    id: "evt-1",
    title: "Paty Innovation Sprint: Civic AI & Smart Transit",
    slug: "paty-innovation-sprint-civic-ai",
    description:
      "A high-velocity co-creation weekend where engineers, product designers, and civic operators prototype autonomous transit telemetry and public dashboard systems for Edo State.",
    category: "Product Studio",
    date: "2026-10-18T09:00:00Z",
    endDate: "2026-10-19T18:00:00Z",
    locationType: "hybrid",
    venueName: "Edo Innovation Hub (Main Auditorium)",
    address: "59 ICE Road, off Wire Road, Benin City, Edo State",
    virtualLink: "https://meet.edotech.community/paty-sprint",
    bannerUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    capacity: 200,
    registeredCount: 84,
    status: "published",
    featured: true,
    createdAt: "2026-08-01T00:00:00Z",
  },
  {
    id: "evt-2",
    title: "FutureCraft Fellowship: Climate Hardware Lab",
    slug: "futurecraft-fellowship-climate-hardware",
    description:
      "Kickoff orientation for the 12-week fellowship cohort focusing on clean energy micro-grids and regenerative IoT telemetry.",
    category: "Talent",
    date: "2026-11-05T10:00:00Z",
    locationType: "hybrid",
    venueName: "Diamund Makerspace & Remote",
    address: "Benin City & Virtual Pods",
    virtualLink: "https://meet.edotech.community/futurecraft",
    bannerUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    capacity: 60,
    registeredCount: 42,
    status: "published",
    featured: false,
    createdAt: "2026-08-10T00:00:00Z",
  },
  {
    id: "evt-3",
    title: "Edo Open Source Commons: Demo Day",
    slug: "edo-open-source-commons-demo-day",
    description:
      "Showcasing open-source libraries, datasets, and civic dashboards built by Edo technologists over the quarter.",
    category: "Community",
    date: "2026-11-28T14:00:00Z",
    locationType: "virtual",
    venueName: "Discord Stage & YouTube Live",
    address: "Global Livestream",
    virtualLink: "https://youtube.com/live/edotech-demo-day",
    bannerUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    capacity: 500,
    registeredCount: 190,
    status: "published",
    featured: false,
    createdAt: "2026-08-15T00:00:00Z",
  },
];

const INITIAL_REGISTRATIONS: EventRegistration[] = [
  {
    id: "reg-1",
    eventId: "evt-1",
    eventTitle: "Paty Innovation Sprint: Civic AI & Smart Transit",
    name: "Efe Osazuwa",
    email: "efe@solgrid.africa",
    phone: "+234 802 123 4567",
    role: "Hardware Founder",
    attendanceMode: "in-person",
    hubspotSynced: true,
    createdAt: "2026-08-20T10:00:00Z",
  },
  {
    id: "reg-2",
    eventId: "evt-1",
    eventTitle: "Paty Innovation Sprint: Civic AI & Smart Transit",
    name: "Mary Asemota",
    email: "mary.asemota@edogov.ng",
    phone: "+234 803 987 6543",
    role: "Civic Policy Lead",
    attendanceMode: "in-person",
    hubspotSynced: true,
    createdAt: "2026-08-22T14:30:00Z",
  },
];

const INITIAL_BLOG_POSTS: DynamicBlogPost[] = [
  {
    id: "post-1",
    title: "AI Civic Labs are Reimagining Public Services in Edo",
    slug: "ai-civic-labs",
    excerpt: "From autonomous mobility pilots to regenerative agriculture dashboards, we document what happens when Edo technologists co-create with public institutions.",
    content: `Edo Tech Community has spent the last year embedding AI civic labs inside local councils. Each lab pairs a designer, an engineer, and a policy champion to rewire service delivery.`,
    author: "Imade Iyamu",
    authorRole: "Volunteer Research Lead",
    date: "Oct 12, 2025",
    readingTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    tags: ["ai", "civic-tech", "labs"],
    featured: true,
    published: true,
  },
  {
    id: "post-2",
    title: "Paty Futures: Building Equitable Tech Pipelines",
    slug: "paty-futures",
    excerpt: "We unpack how the Paty pipeline is nurturing multi-disciplinary builders and why Edo State is primed for frontier experimentation.",
    content: `The Paty program is our flagship pathway that blends studio-based learning with deep community immersion.`,
    author: "Adaeze Uwa",
    authorRole: "Volunteer Writer",
    date: "Aug 30, 2025",
    readingTime: "3 min read",
    coverImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    tags: ["paty", "programs", "talent"],
    featured: false,
    published: true,
  },
];

const INITIAL_MEMBERSHIPS: MembershipRecord[] = [
  {
    id: "mem-1",
    fullName: "Osamudiamen Igbinosa",
    email: "osamudiamen@futurestack.io",
    phone: "+234 805 555 1212",
    discipline: "AI Engineer",
    hubLocation: "Auchi Hub Pod",
    portfolioUrl: "https://github.com/osamudiamen",
    interests: ["Artificial Intelligence", "Civic Tech", "Open Source"],
    status: "active",
    hubspotSynced: true,
    createdAt: "2026-03-05T00:00:00Z",
  },
  {
    id: "mem-2",
    fullName: "Blessing Okojie",
    email: "blessing.o@diamundlabs.com",
    phone: "+234 810 444 8899",
    discipline: "Hardware Prototyper",
    hubLocation: "Benin City Hub",
    portfolioUrl: "https://diamundlabs.com",
    interests: ["Clean Energy", "IoT & Hardware", "Paty Sprints"],
    status: "active",
    hubspotSynced: true,
    createdAt: "2026-04-12T00:00:00Z",
  },
];

// Live Mutable State
let liveEvents = [...INITIAL_EVENTS];
let liveRegistrations = [...INITIAL_REGISTRATIONS];
let liveBlogPosts = [...INITIAL_BLOG_POSTS];
let liveMemberships = [...INITIAL_MEMBERSHIPS];
let liveRoles = [...INITIAL_ROLES];
let liveUsers = [...INITIAL_ADMIN_USERS];

// ============ EVENTS CRUD ============
export function getAllEvents(): PlatformEvent[] {
  return liveEvents;
}

export function getPublishedEvents(): PlatformEvent[] {
  return liveEvents.filter((e) => e.status === "published");
}

export function getFeaturedNextEvent(): PlatformEvent | undefined {
  return (
    liveEvents.find((e) => e.featured && e.status === "published") ||
    liveEvents.find((e) => e.status === "published")
  );
}

export function getEventById(id: string): PlatformEvent | undefined {
  return liveEvents.find((e) => e.id === id);
}

export function getEventBySlug(slug: string): PlatformEvent | undefined {
  return liveEvents.find((e) => e.slug === slug);
}

export function createEvent(event: Omit<PlatformEvent, "id" | "registeredCount" | "createdAt" | "slug"> & { slug?: string }): PlatformEvent {
  const generatedSlug = event.slug || event.title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  const newEvent: PlatformEvent = {
    ...event,
    id: `evt-${Date.now()}`,
    slug: generatedSlug,
    registeredCount: 0,
    createdAt: new Date().toISOString(),
  };
  liveEvents = [newEvent, ...liveEvents];
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<PlatformEvent>): PlatformEvent | null {
  const idx = liveEvents.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  liveEvents[idx] = { ...liveEvents[idx], ...updates };
  return liveEvents[idx];
}

export function deleteEvent(id: string): boolean {
  const initialLen = liveEvents.length;
  liveEvents = liveEvents.filter((e) => e.id !== id);
  return liveEvents.length < initialLen;
}

// ============ REGISTRATIONS CRUD ============
export function registerForEvent(payload: {
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  attendanceMode: "in-person" | "virtual";
}): EventRegistration {
  const event = liveEvents.find((e) => e.id === payload.eventId);
  const newReg: EventRegistration = {
    id: `reg-${Date.now()}`,
    eventId: payload.eventId,
    eventTitle: event?.title || "Edo Tech Event",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    attendanceMode: payload.attendanceMode,
    hubspotSynced: true,
    createdAt: new Date().toISOString(),
  };

  liveRegistrations = [newReg, ...liveRegistrations];
  if (event) {
    event.registeredCount += 1;
  }
  return newReg;
}

export function getAllRegistrations(eventId?: string): EventRegistration[] {
  if (eventId) {
    return liveRegistrations.filter((r) => r.eventId === eventId);
  }
  return liveRegistrations;
}

export const getEventRegistrations = getAllRegistrations;

// ============ BLOG CRUD ============
export function getAllPosts(): DynamicBlogPost[] {
  return liveBlogPosts;
}

export const getAllBlogPosts = getAllPosts;

export function getPublishedBlogPosts(): DynamicBlogPost[] {
  return liveBlogPosts.filter((p) => p.published);
}

export function createPost(post: Omit<DynamicBlogPost, "id" | "slug" | "date" | "readingTime"> & { slug?: string }): DynamicBlogPost {
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newPost: DynamicBlogPost = {
    ...post,
    id: `post-${Date.now()}`,
    slug,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readingTime: `${Math.max(1, Math.ceil(post.content.split(" ").length / 200))} min read`,
  };
  liveBlogPosts = [newPost, ...liveBlogPosts];
  return newPost;
}

export const createBlogPost = createPost;

export function updatePost(id: string, updates: Partial<DynamicBlogPost>): DynamicBlogPost | null {
  const idx = liveBlogPosts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  liveBlogPosts[idx] = { ...liveBlogPosts[idx], ...updates };
  return liveBlogPosts[idx];
}

export const updateBlogPost = updatePost;

export function deletePost(id: string): boolean {
  const initialLen = liveBlogPosts.length;
  liveBlogPosts = liveBlogPosts.filter((p) => p.id !== id);
  return liveBlogPosts.length < initialLen;
}

export const deleteBlogPost = deletePost;

// ============ MEMBERSHIP CRUD ============
export function getAllMemberships(): MembershipRecord[] {
  return liveMemberships;
}

export function registerMembership(data: Omit<MembershipRecord, "id" | "status" | "hubspotSynced" | "createdAt"> & { status?: MembershipRecord["status"] }): MembershipRecord {
  const newMem: MembershipRecord = {
    ...data,
    id: `mem-${Date.now()}`,
    status: data.status || "active",
    hubspotSynced: true,
    createdAt: new Date().toISOString(),
  };
  liveMemberships = [newMem, ...liveMemberships];
  return newMem;
}

export const createMembership = registerMembership;

// ============ ROLES & PERMISSIONS CRUD ============
export function getAllRoles(): Role[] {
  return liveRoles;
}

export function getRoleById(roleId: string): Role | undefined {
  return liveRoles.find((r) => r.id === roleId);
}

export function createCustomRole(data: { name: string; description: string; permissions: PermissionKey[] }): Role {
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const newRole: Role = {
    id: slug || `role_${Date.now()}`,
    name: data.name,
    description: data.description,
    isSystem: false,
    permissions: data.permissions,
    createdAt: new Date().toISOString(),
  };
  liveRoles = [...liveRoles, newRole];
  return newRole;
}

export const createRole = createCustomRole;

export function deleteCustomRole(roleId: string): boolean {
  const role = liveRoles.find((r) => r.id === roleId);
  if (!role || role.isSystem) return false;
  liveRoles = liveRoles.filter((r) => r.id !== roleId);
  return true;
}

export const deleteRole = deleteCustomRole;

// ============ ADMIN USERS CRUD ============
export function getAllAdminUsers(): AdminUser[] {
  return liveUsers;
}

export function getAdminUser(userId: string): AdminUser | undefined {
  return liveUsers.find((u) => u.id === userId) || liveUsers[0];
}

export function assignUserRole(userId: string, roleId: string): AdminUser | null {
  const userIdx = liveUsers.findIndex((u) => u.id === userId);
  const role = liveRoles.find((r) => r.id === roleId);
  if (userIdx === -1 || !role) return null;

  liveUsers[userIdx] = {
    ...liveUsers[userIdx],
    roleId: role.id,
    roleName: role.name,
  };
  return liveUsers[userIdx];
}
