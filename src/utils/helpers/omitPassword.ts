export default function omitPassword<T>(user: T) {
  if (
    user &&
    !Array.isArray(user) &&
    typeof user === "object" &&
    "password" in user
  ) {
    delete user.password;
    return user;
  }

  return user;
}
