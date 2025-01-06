/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  /** Session access token */
  accessToken: Scalars['String']['output'];
  /** User logged in */
  user: User;
};

export type CreateCustomerInput = {
  /** Document (CPF) of the customer */
  document: Scalars['String']['input'];
  /** Email of the customer */
  email: Scalars['String']['input'];
  /** Name of the customer */
  name: Scalars['String']['input'];
  /** Phone of the customer */
  phone: Scalars['String']['input'];
};

export type CreateFinancialAccountInput = {
  /** Account number with digit */
  account: Scalars['String']['input'];
  /** Agency number with digit */
  agency: Scalars['String']['input'];
  /** Bank holder number with digit */
  bankHolder: Scalars['String']['input'];
  /** Transfer key (PIX) */
  transferKey: Scalars['String']['input'];
  /** Transfer key type */
  transferKeyType: TransferKeyType;
};

export type CreateUserInput = {
  /** Document (CPF) of the user */
  document: Scalars['String']['input'];
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Name of the user */
  name: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
  /** Phone of the user */
  phone: Scalars['String']['input'];
  /** Role of the user */
  role: RoleEnum;
};

export type Customer = {
  __typename?: 'Customer';
  /** Creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Document (CPF) of the user */
  document: Scalars['String']['output'];
  /** Email of the user */
  email: Scalars['String']['output'];
  /** ID field */
  id: Scalars['ID']['output'];
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Phone of the user */
  phone: Scalars['String']['output'];
  /** Update date */
  updatedAt: Scalars['DateTime']['output'];
};

export type FinancialAccount = {
  __typename?: 'FinancialAccount';
  /** Account number with digit */
  account: Scalars['String']['output'];
  /** Agency number with digit */
  agency: Scalars['String']['output'];
  /** Bank holder number with digit */
  bankHolder: Scalars['String']['output'];
  /** Creation date */
  createdAt: Scalars['DateTime']['output'];
  /** ID field */
  id: Scalars['ID']['output'];
  /** Transfer key (PIX) */
  transferKey: Scalars['String']['output'];
  /** Transfer key type */
  transferKeyType: TransferKeyType;
  /** Update date */
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelTransfer: Transfer;
  createCustomer: Customer;
  createFinancialAccount: FinancialAccount;
  createUser: User;
  deleteCustomer: Customer;
  signIn: Auth;
  withdrawBalance: Wallet;
};


export type MutationCancelTransferArgs = {
  transferId: Scalars['String']['input'];
  withdrawValue: Scalars['Float']['input'];
};


export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};


export type MutationCreateFinancialAccountArgs = {
  createCustomerInput: CreateFinancialAccountInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationWithdrawBalanceArgs = {
  financialAccountId: Scalars['String']['input'];
  withdrawValue: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  deleteFinancialAccount: FinancialAccount;
  getCurrentUser: User;
  getCustomer: Customer;
  getCustomers: Array<Customer>;
  getFinancialAccount: FinancialAccount;
  getFinancialAccounts: Array<FinancialAccount>;
  getUser: User;
  getUserByEmail: User;
  getUserWallet: User;
  getUsers: Array<User>;
};


export type QueryDeleteFinancialAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCustomerArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetFinancialAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export enum RoleEnum {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignInInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Password of the user */
  normalizedPassword: Scalars['String']['input'];
};

export type Transfer = {
  __typename?: 'Transfer';
  /** Creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Financial account of the transfer */
  financialAccount: FinancialAccount;
  /** ID field */
  id: Scalars['ID']['output'];
  /** Status of the transfer */
  status: TransferStatus;
  /** Transaction token for gateway */
  token: Scalars['String']['output'];
  /** Total value of the transfer */
  transferValue: Scalars['String']['output'];
  /** Update date */
  updatedAt: Scalars['DateTime']['output'];
  /** User of the transfer */
  user: User;
};

export enum TransferKeyType {
  All = 'ALL',
  Cpf = 'CPF',
  Email = 'EMAIL',
  Phone = 'PHONE'
}

export enum TransferStatus {
  Canceled = 'CANCELED',
  Done = 'DONE',
  Issue = 'ISSUE',
  Pending = 'PENDING'
}

export type User = {
  __typename?: 'User';
  /** Creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Document (CPF) of the user */
  document: Scalars['String']['output'];
  /** Email of the user */
  email: Scalars['String']['output'];
  /** ID field */
  id: Scalars['ID']['output'];
  /** Name of the user */
  name: Scalars['String']['output'];
  /** Phone of the user */
  phone: Scalars['String']['output'];
  /** Name of the user */
  role: RoleEnum;
  /** Update date */
  updatedAt: Scalars['DateTime']['output'];
  /** Wallet of the user */
  wallet: Wallet;
};

export type Wallet = {
  __typename?: 'Wallet';
  /** Wallet balance amount */
  balance: Scalars['Float']['output'];
  /** Creation date */
  createdAt: Scalars['DateTime']['output'];
  /** ID field */
  id: Scalars['ID']['output'];
  /** Is active status of the wallet */
  isActive: Scalars['Boolean']['output'];
  /** Update date */
  updatedAt: Scalars['DateTime']['output'];
};
