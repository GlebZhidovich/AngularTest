export type User = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

export type UserKeys = keyof User;

export type Users = Array<User>;
