export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  name: string;
  email: string;
}

export interface authUserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;

}

export interface AuthenticationResponse {
  userResponse: UserResponse;
  access_token: string;
  refresh_token: string;
}

export interface UserBootcampRequest {
  userId: string;
  baseBootcampId: string;
}
