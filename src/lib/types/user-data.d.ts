// Permission type
export interface Permission {
  id: string;
  name: string;
  created_at: string;
  description: string;
}

// RolePermission type (relation between role and permission)
export interface RolePermission {
  role_id: string;
  update_at: string;
  created_at: string;
  permission_id: string;
  role_permission_id: string;
  permissions: Permission;
}

// Role type
export interface Role {
  id: string;
  name: string;
  created_at: string;
  description: string;
  role_permissions: RolePermission[];
}

// User type
export type UserData = {
  id: string;
  email: string;
  update_at: string;
  created_at: string;
  role_id: string;
  roles: Role;
};
