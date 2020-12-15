import {RoleInterface} from './RoleInterface';
import PermissionInterface from './PermissionInterface';

export class Role implements RoleInterface {
  constructor(
    private readonly _title: string,
    private readonly _permissions: PermissionInterface[] = []
  ) {}

  get title() {
    return this._title;
  }

  get permissions() {
    return this._permissions;
  }
}
