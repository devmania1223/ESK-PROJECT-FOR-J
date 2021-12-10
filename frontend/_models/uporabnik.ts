import { Pravica } from './pravica';

export class Uporabnik {
	id: number;
	userName: string;
	delavecIme: string;
	mail: string;
	telefon: string;
	token: string;
	orgSif: string;
	orgIme: string;
	orgNaslov: string;
	pravice: Pravica[];
	lastExeceutionTime: number;

	constructor(init?: Partial<Uporabnik>) {
		Object.assign(this, init);
		this.lastExeceutionTime = Date.now();
	}
}

export class LoginResponse {
	token: string;
	user: User;
  }
  export class User {
	enabled: boolean;
	password: string;
	username: string;
	eskUser: EskUser;
	authorities?: (AuthoritiesEntity)[] | null;
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
  }
  export class EskUser {
	id: number;
	orgSif: string;
	orgIme: string;
	orgNaslov: string;
	userName: string;
	delavecIme: string;
	mail: string;
	tel: string;
	pravice: string;
  }
  export class AuthoritiesEntity {
	authority: string;
  }
