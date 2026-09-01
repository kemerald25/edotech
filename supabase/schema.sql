-- ==============================================================================
-- EDO TECH COMMUNITY - SUPABASE / POSTGRESQL PRODUCTION SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- to initialize the database tables, RBAC permissions, and HubSpot sync tables.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SYSTEM CAPABILITIES CATALOG
CREATE TABLE IF NOT EXISTS permissions (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL
);

-- Seed System Permissions
INSERT INTO permissions (id, name, description, category) VALUES
  ('events.create', 'Create Events', 'Can create new events and drafts', 'Events'),
  ('events.edit', 'Edit Events', 'Can update event details and schedules', 'Events'),
  ('events.publish', 'Publish Events', 'Can make events live and open RSVPs', 'Events'),
  ('events.delete', 'Delete Events', 'Can delete events', 'Events'),
  ('events.view_attendees', 'View RSVPs', 'Can view attendee lists and contact details', 'Events'),
  ('events.export_csv', 'Export Attendees', 'Can export attendee CSV spreadsheets', 'Events'),
  ('blog.create', 'Create Blog Posts', 'Can draft articles and research briefs', 'Blog'),
  ('blog.edit', 'Edit Blog Posts', 'Can edit article content and tags', 'Blog'),
  ('blog.publish', 'Publish Blog Posts', 'Can publish posts live to the blog', 'Blog'),
  ('blog.delete', 'Delete Blog Posts', 'Can delete blog articles', 'Blog'),
  ('hubspot.view_crm', 'View HubSpot CRM', 'Can explore synced contacts, deals, and companies', 'HubSpot'),
  ('hubspot.trigger_sync', 'Trigger Sync', 'Can run manual full account sync with HubSpot', 'HubSpot'),
  ('hubspot.manage_settings', 'Manage HubSpot Settings', 'Can configure API keys and sync mappings', 'HubSpot'),
  ('members.view', 'View Members', 'Can view member directory and applications', 'Members'),
  ('members.manage', 'Manage Members', 'Can approve, reject, or edit member status', 'Members'),
  ('members.export', 'Export Members', 'Can export member list', 'Members'),
  ('roles.manage', 'Manage Roles & Permissions', 'Can create custom roles and assign capabilities', 'System'),
  ('users.manage', 'Manage Admin Users', 'Can invite users and assign roles', 'System')
ON CONFLICT (id) DO NOTHING;

-- 2. DYNAMIC ROLES
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Initial System Roles
INSERT INTO roles (id, name, description, is_system) VALUES
  ('super_admin', 'Super Admin / Executive', 'Full unrestricted access across all platform modules and settings', true),
  ('event_manager', 'Volunteer Event Manager', 'Host, schedule, manage events, and track attendee RSVPs', true),
  ('writer', 'Volunteer Writer / Editor', 'Author, edit, and manage articles and MDX publications', true),
  ('crm_lead', 'Partnerships & CRM Lead', 'Manage partner organizations, HubSpot CRM records, and deals', true)
ON CONFLICT (id) DO NOTHING;

-- 3. ROLE PERMISSIONS JUNCTION
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
  permission_id VARCHAR(64) REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Map Permissions to Default Roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT 'super_admin', id FROM permissions
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id) VALUES
  ('event_manager', 'events.create'),
  ('event_manager', 'events.edit'),
  ('event_manager', 'events.publish'),
  ('event_manager', 'events.view_attendees'),
  ('event_manager', 'events.export_csv'),
  ('writer', 'blog.create'),
  ('writer', 'blog.edit'),
  ('writer', 'blog.publish'),
  ('crm_lead', 'hubspot.view_crm'),
  ('crm_lead', 'hubspot.trigger_sync'),
  ('crm_lead', 'members.view'),
  ('crm_lead', 'members.manage')
ON CONFLICT DO NOTHING;

-- 4. ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT,
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE SET NULL,
  avatar_url TEXT,
  status VARCHAR(32) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- 5. SELF-HOSTED EVENTS
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL DEFAULT 'Community',
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location_type VARCHAR(32) NOT NULL DEFAULT 'hybrid',
  venue_name VARCHAR(255) NOT NULL DEFAULT 'Edo Innovation Hub',
  address VARCHAR(255) DEFAULT 'Benin City, Edo State',
  virtual_link TEXT,
  banner_url TEXT,
  capacity INTEGER DEFAULT 150,
  status VARCHAR(32) NOT NULL DEFAULT 'published',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. EVENT REGISTRATIONS / RSVPs
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  role VARCHAR(128),
  attendance_mode VARCHAR(32) DEFAULT 'in-person',
  hubspot_synced BOOLEAN DEFAULT false,
  hubspot_contact_id VARCHAR(64),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MEMBERSHIP APPLICATIONS
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(64),
  discipline VARCHAR(128) NOT NULL,
  hub_location VARCHAR(128) DEFAULT 'Benin City',
  interests TEXT[],
  portfolio_url TEXT,
  status VARCHAR(32) DEFAULT 'active',
  hubspot_synced BOOLEAN DEFAULT false,
  hubspot_contact_id VARCHAR(64),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. HUBSPOT CONTACTS (FULL SYNC)
CREATE TABLE IF NOT EXISTS hubspot_contacts (
  id VARCHAR(64) PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  lifecycle_stage VARCHAR(64),
  job_title VARCHAR(255),
  company VARCHAR(255),
  hub_location VARCHAR(255),
  lead_source VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. HUBSPOT DEALS & SERVICES
CREATE TABLE IF NOT EXISTS hubspot_deals (
  id VARCHAR(64) PRIMARY KEY,
  deal_name VARCHAR(255) NOT NULL,
  stage VARCHAR(128) NOT NULL,
  amount NUMERIC(12, 2) DEFAULT 0,
  currency VARCHAR(8) DEFAULT 'USD',
  close_date TIMESTAMP WITH TIME ZONE,
  pipeline VARCHAR(128),
  service_type VARCHAR(128),
  partner_name VARCHAR(255),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. HUBSPOT COMPANIES & HUBS
CREATE TABLE IF NOT EXISTS hubspot_companies (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  industry VARCHAR(128),
  city VARCHAR(128),
  description TEXT,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. HUBSPOT SYNC AUDIT LOGS
CREATE TABLE IF NOT EXISTS hubspot_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sync_type VARCHAR(64) NOT NULL,
  records_processed INTEGER DEFAULT 0,
  records_synced INTEGER DEFAULT 0,
  status VARCHAR(32) NOT NULL,
  details JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
