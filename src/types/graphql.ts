// src/types/graphql.ts
export interface User {
  id: string;
  name: string;
}

export interface GetUsersResponse {
  users: User[];
}

export interface AddUserResponse {
  addUser: User;
}

export interface AddUserInput {
  name: string;
}

export interface UserAddedSubscriptionResponse {
  userAdded: User;
}
