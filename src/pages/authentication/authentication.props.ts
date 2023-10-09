import { RegisteredUser } from '../../shared';

export interface AuthenticationProps {
  isLoggedIn: boolean;
}

export interface SignInProps extends AuthenticationProps {
  signIn: (username: string, password: string) => void;
}

export interface SignUpProps extends AuthenticationProps {
  signUp: (user: RegisteredUser) => void;
}
