import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../../src/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date scalar type */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  refresh: Scalars['String'];
};

export type CreatePermissionInput = {
  verb: PermissionVerb;
  resource: PermissionModel;
  own?: Maybe<Scalars['Boolean']>;
};

export type CreateRoleInput = {
  name: Scalars['String'];
};


export type GetUserResult = User | UserNotFoundError;


export type LoginResult = AuthPayload | UserInvalidInputError;

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createPermission: PermissionResult;
  updatePermission: PermissionResult;
  deletePermission: PermissionResult;
  createRole: RoleResult;
  updateRole: RoleResult;
  deleteRole: RoleResult;
  /**
   * Registers a new user account. This API provides a managed user experience. So
   * users cannot register themselves. Once registered, an email will be
   * generated and sent to the user with a link that includes an activation code
   */
  register?: Maybe<RegisterResult>;
  /** Provides authenticated JWT Tokens to the user given appropriate credentials are provided */
  login?: Maybe<LoginResult>;
  /** Updates a user account's details */
  updateUser?: Maybe<UpdateUserResult>;
  /**
   * An API endpoint to reset a user's password. This can happen if the user
   * forgot their password, this is a newly registered account, or an
   * administrator reset a user's password.
   */
  resetUser?: Maybe<LoginResult>;
};


export type MutationCreatePermissionArgs = {
  input?: Maybe<CreatePermissionInput>;
};


export type MutationUpdatePermissionArgs = {
  input?: Maybe<UpdatePermissionInput>;
};


export type MutationDeletePermissionArgs = {
  input?: Maybe<PermissionInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<RoleInput>;
};


export type MutationRegisterArgs = {
  input?: Maybe<UserRegisterInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<UserLoginInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UserUpdateInput>;
};


export type MutationResetUserArgs = {
  input?: Maybe<UserResetInput>;
};

export type PermRoleNotFoundError = {
  __typename?: 'PermRoleNotFoundError';
  message: Scalars['String'];
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['Int'];
  own?: Maybe<Scalars['Boolean']>;
  resource: PermissionModel;
  verb: PermissionVerb;
  roles?: Maybe<Array<Maybe<Role>>>;
};

export type PermissionInput = {
  id: Scalars['Int'];
};

export enum PermissionModel {
  User = 'USER',
  Order = 'ORDER',
  Customer = 'CUSTOMER',
  Permission = 'PERMISSION',
  Role = 'ROLE'
}

export type PermissionResult = Permission | PermRoleNotFoundError;

export enum PermissionVerb {
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE'
}

export type Query = {
  __typename?: 'Query';
  getPermission: PermissionResult;
  getPermissions: Array<Maybe<Permission>>;
  getRole: RoleResult;
  getRoles: Array<Maybe<Role>>;
  _empty?: Maybe<Scalars['String']>;
  /** Retrieves a single user account. */
  getUser: GetUserResult;
  /** Retrieves a list of user accounts. */
  getUsers: Array<Maybe<User>>;
};


export type QueryGetPermissionArgs = {
  id: Scalars['Int'];
};


export type QueryGetRoleArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type RegisterResult = RegisterUser | UserInvalidInputError;

export type RegisterUser = {
  __typename?: 'RegisterUser';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['Date'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
};

export type RoleInput = {
  id: Scalars['Int'];
};

export type RoleResult = Role | PermRoleNotFoundError;

export type UpdatePermissionInput = {
  id: Scalars['Int'];
  verb?: Maybe<PermissionVerb>;
  resource?: Maybe<PermissionModel>;
  own?: Maybe<Scalars['Boolean']>;
};

export type UpdateRoleInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['Int']>>;
};

export type UpdateUserResult = User | UserInvalidInputError;

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  tempCode?: Maybe<Scalars['String']>;
  tempCodeExpires?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['JSON']>;
};

export type UserInvalidInputError = {
  __typename?: 'UserInvalidInputError';
  message: Scalars['String'];
  field: Scalars['String'];
};

/** Provides data to authenticate a user */
export type UserLoginInput = {
  /** The user's email */
  email: Scalars['String'];
  /** The user's password */
  password: Scalars['String'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  message: Scalars['String'];
};

/** Provides data to register a new user */
export type UserRegisterInput = {
  /** The new user's email address (must be unique) */
  email: Scalars['String'];
  /** The new user's first name */
  firstName?: Maybe<Scalars['String']>;
  /** The new user's last name */
  lastName?: Maybe<Scalars['String']>;
};

/** Provides data to reset a user's password. */
export type UserResetInput = {
  /** The temporary code provided in the url passed to the email */
  tempCode?: Maybe<Scalars['String']>;
  /** The password the user will update their account with */
  password?: Maybe<Scalars['String']>;
};

/** Provides data to update an existing user account */
export type UserUpdateInput = {
  /** The id of the user to update (required) */
  id: Scalars['ID'];
  /** Updating the user's email (optional) */
  newEmail?: Maybe<Scalars['String']>;
  /** Updating the user's password (optional) */
  newPassword?: Maybe<Scalars['String']>;
  /** Updating the user's first name (optional) */
  newFirstName?: Maybe<Scalars['String']>;
  /** Updating the user's last name (optional) */
  newLastName?: Maybe<Scalars['String']>;
  /** Updating the user's settings (optional) */
  newSettings?: Maybe<Scalars['JSON']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreatePermissionInput: CreatePermissionInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateRoleInput: CreateRoleInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  GetUserResult: ResolversTypes['User'] | ResolversTypes['UserNotFoundError'];
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LoginResult: ResolversTypes['AuthPayload'] | ResolversTypes['UserInvalidInputError'];
  Mutation: ResolverTypeWrapper<{}>;
  PermRoleNotFoundError: ResolverTypeWrapper<PermRoleNotFoundError>;
  Permission: ResolverTypeWrapper<Permission>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PermissionInput: PermissionInput;
  PermissionModel: PermissionModel;
  PermissionResult: ResolversTypes['Permission'] | ResolversTypes['PermRoleNotFoundError'];
  PermissionVerb: PermissionVerb;
  Query: ResolverTypeWrapper<{}>;
  RegisterResult: ResolversTypes['RegisterUser'] | ResolversTypes['UserInvalidInputError'];
  RegisterUser: ResolverTypeWrapper<RegisterUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Role: ResolverTypeWrapper<Role>;
  RoleInput: RoleInput;
  RoleResult: ResolversTypes['Role'] | ResolversTypes['PermRoleNotFoundError'];
  UpdatePermissionInput: UpdatePermissionInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateUserResult: ResolversTypes['User'] | ResolversTypes['UserInvalidInputError'];
  User: ResolverTypeWrapper<User>;
  UserInvalidInputError: ResolverTypeWrapper<UserInvalidInputError>;
  UserLoginInput: UserLoginInput;
  UserNotFoundError: ResolverTypeWrapper<UserNotFoundError>;
  UserRegisterInput: UserRegisterInput;
  UserResetInput: UserResetInput;
  UserUpdateInput: UserUpdateInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  String: Scalars['String'];
  CreatePermissionInput: CreatePermissionInput;
  Boolean: Scalars['Boolean'];
  CreateRoleInput: CreateRoleInput;
  Date: Scalars['Date'];
  GetUserResult: ResolversParentTypes['User'] | ResolversParentTypes['UserNotFoundError'];
  JSON: Scalars['JSON'];
  LoginResult: ResolversParentTypes['AuthPayload'] | ResolversParentTypes['UserInvalidInputError'];
  Mutation: {};
  PermRoleNotFoundError: PermRoleNotFoundError;
  Permission: Permission;
  Int: Scalars['Int'];
  PermissionInput: PermissionInput;
  PermissionResult: ResolversParentTypes['Permission'] | ResolversParentTypes['PermRoleNotFoundError'];
  Query: {};
  RegisterResult: ResolversParentTypes['RegisterUser'] | ResolversParentTypes['UserInvalidInputError'];
  RegisterUser: RegisterUser;
  ID: Scalars['ID'];
  Role: Role;
  RoleInput: RoleInput;
  RoleResult: ResolversParentTypes['Role'] | ResolversParentTypes['PermRoleNotFoundError'];
  UpdatePermissionInput: UpdatePermissionInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateUserResult: ResolversParentTypes['User'] | ResolversParentTypes['UserInvalidInputError'];
  User: User;
  UserInvalidInputError: UserInvalidInputError;
  UserLoginInput: UserLoginInput;
  UserNotFoundError: UserNotFoundError;
  UserRegisterInput: UserRegisterInput;
  UserResetInput: UserResetInput;
  UserUpdateInput: UserUpdateInput;
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetUserResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUserResult'] = ResolversParentTypes['GetUserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'UserNotFoundError', ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'AuthPayload' | 'UserInvalidInputError', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createPermission?: Resolver<ResolversTypes['PermissionResult'], ParentType, ContextType, RequireFields<MutationCreatePermissionArgs, never>>;
  updatePermission?: Resolver<ResolversTypes['PermissionResult'], ParentType, ContextType, RequireFields<MutationUpdatePermissionArgs, never>>;
  deletePermission?: Resolver<ResolversTypes['PermissionResult'], ParentType, ContextType, RequireFields<MutationDeletePermissionArgs, never>>;
  createRole?: Resolver<ResolversTypes['RoleResult'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, never>>;
  updateRole?: Resolver<ResolversTypes['RoleResult'], ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, never>>;
  deleteRole?: Resolver<ResolversTypes['RoleResult'], ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, never>>;
  register?: Resolver<Maybe<ResolversTypes['RegisterResult']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, never>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResult']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserResult']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  resetUser?: Resolver<Maybe<ResolversTypes['LoginResult']>, ParentType, ContextType, RequireFields<MutationResetUserArgs, never>>;
}>;

export type PermRoleNotFoundErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PermRoleNotFoundError'] = ResolversParentTypes['PermRoleNotFoundError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PermissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  own?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  resource?: Resolver<ResolversTypes['PermissionModel'], ParentType, ContextType>;
  verb?: Resolver<ResolversTypes['PermissionVerb'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PermissionResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PermissionResult'] = ResolversParentTypes['PermissionResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Permission' | 'PermRoleNotFoundError', ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getPermission?: Resolver<ResolversTypes['PermissionResult'], ParentType, ContextType, RequireFields<QueryGetPermissionArgs, 'id'>>;
  getPermissions?: Resolver<Array<Maybe<ResolversTypes['Permission']>>, ParentType, ContextType>;
  getRole?: Resolver<ResolversTypes['RoleResult'], ParentType, ContextType, RequireFields<QueryGetRoleArgs, 'id'>>;
  getRoles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getUser?: Resolver<ResolversTypes['GetUserResult'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type RegisterResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'RegisterUser' | 'UserInvalidInputError', ParentType, ContextType>;
}>;

export type RegisterUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterUser'] = ResolversParentTypes['RegisterUser']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Permission']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RoleResult'] = ResolversParentTypes['RoleResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Role' | 'PermRoleNotFoundError', ParentType, ContextType>;
}>;

export type UpdateUserResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateUserResult'] = ResolversParentTypes['UpdateUserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'UserInvalidInputError', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  tempCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tempCodeExpires?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserInvalidInputErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserInvalidInputError'] = ResolversParentTypes['UserInvalidInputError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNotFoundErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserNotFoundError'] = ResolversParentTypes['UserNotFoundError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  GetUserResult?: GetUserResultResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LoginResult?: LoginResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PermRoleNotFoundError?: PermRoleNotFoundErrorResolvers<ContextType>;
  Permission?: PermissionResolvers<ContextType>;
  PermissionResult?: PermissionResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResult?: RegisterResultResolvers<ContextType>;
  RegisterUser?: RegisterUserResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RoleResult?: RoleResultResolvers<ContextType>;
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInvalidInputError?: UserInvalidInputErrorResolvers<ContextType>;
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
