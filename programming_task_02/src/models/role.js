class Role {
  static SYS_ADMIN = Symbol("sysadmin");
  static LOCAL_ADMIN = Symbol("localadmin");
  static ENTERPRISE_USER = Symbol("enterpriseuser");
  static BASIC_USER = Symbol("basicuser");

  static from(input) {
    if (input === Role.SYS_ADMIN.description) return Role.SYS_ADMIN;
    if (input === Role.LOCAL_ADMIN.description) return Role.LOCAL_ADMIN;
    if (input === Role.ENTERPRISE_USER.description) return Role.ENTERPRISE_USER;
    if (input === Role.BASIC_USER.description) return Role.BASIC_USER;
  }
}

module.exports = Role;
