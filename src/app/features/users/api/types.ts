export type User = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

export type Users = Array<User>;
