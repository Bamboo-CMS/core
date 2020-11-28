import PermissionInterface from './PermissionInterface';

export interface RoleInterface {
  readonly permissions: PermissionInterface[];
  readonly title: string;
}