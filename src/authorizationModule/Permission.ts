import PermissionInterface from './PermissionInterface';

export default class Permission implements PermissionInterface {
  public constructor(
    private readonly _title: string,
    private readonly _permission: string
  ) {}

  get permission(): string {
    return this._permission;
  }

  get title(): string {
    return this._title;
  }
}
