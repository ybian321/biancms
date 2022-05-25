import { Role } from './role.type';

export interface LoginFormValues {
   type: Role;
   email: string;
   password: string;
   remember: boolean;
}
