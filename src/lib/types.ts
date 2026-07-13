export type PartnerUser = {
  id: string;
  externalUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  organisationName: string;
  registrationNumber: string;
  vatNumber: string;
  address: string;
  password: string;
};

export type PublicPartnerUser = Omit<PartnerUser, "password">;
