import usersData from "../../data/users.json";
import type { PartnerUser, PublicPartnerUser } from "./types";

const users = usersData as PartnerUser[];

export function listUsers(): PublicPartnerUser[] {
  return users.map(({ password: _password, ...user }) => user);
}

export function findUserByEmail(email: string): PartnerUser | undefined {
  return users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );
}

export function findUserById(id: string): PartnerUser | undefined {
  return users.find((user) => user.id === id);
}

export function toPublicUser(user: PartnerUser): PublicPartnerUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}
