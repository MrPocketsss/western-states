import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { Context } from '../../src/context'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date scalar type */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']
  refresh: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type GetUserResult = User | UserNotFoundError

export type LoginResult = AuthPayload | UserInvalidInputError

export type Mutation = {
  __typename?: 'Mutation'
  _empty?: Maybe<Scalars['String']>
  register?: Maybe<RegisterResult>
  login?: Maybe<LoginResult>
}

export type MutationRegisterArgs = {
  input?: Maybe<UserRegisterInput>
}

export type MutationLoginArgs = {
  input?: Maybe<UserLoginInput>
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']>
  getUsers: Array<Maybe<User>>
  getUser: GetUserResult
}

export type QueryGetUserArgs = {
  id: Scalars['Int']
}

export type RegisterResult = RegisterUser | UserInvalidInputError

export type RegisterUser = {
  __typename?: 'RegisterUser'
  id: Scalars['ID']
  email: Scalars['String']
  tempPassword: Scalars['String']
  tempPasswordExpires: Scalars['Date']
  verified: Scalars['Boolean']
  createdAt: Scalars['Date']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  verified: Scalars['Boolean']
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  settings?: Maybe<Scalars['JSON']>
}

export type UserInput = {
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type UserInvalidInputError = {
  __typename?: 'UserInvalidInputError'
  message: Scalars['String']
  field: Scalars['String']
}

export type UserLoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError'
  message: Scalars['String']
}

export type UserRegisterInput = {
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>
  String: ResolverTypeWrapper<Scalars['String']>
  CacheControlScope: CacheControlScope
  Date: ResolverTypeWrapper<Scalars['Date']>
  GetUserResult: ResolversTypes['User'] | ResolversTypes['UserNotFoundError']
  JSON: ResolverTypeWrapper<Scalars['JSON']>
  LoginResult: ResolversTypes['AuthPayload'] | ResolversTypes['UserInvalidInputError']
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  RegisterResult: ResolversTypes['RegisterUser'] | ResolversTypes['UserInvalidInputError']
  RegisterUser: ResolverTypeWrapper<RegisterUser>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Upload: ResolverTypeWrapper<Scalars['Upload']>
  User: ResolverTypeWrapper<User>
  UserInput: UserInput
  UserInvalidInputError: ResolverTypeWrapper<UserInvalidInputError>
  UserLoginInput: UserLoginInput
  UserNotFoundError: ResolverTypeWrapper<UserNotFoundError>
  UserRegisterInput: UserRegisterInput
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload
  String: Scalars['String']
  Date: Scalars['Date']
  GetUserResult: ResolversParentTypes['User'] | ResolversParentTypes['UserNotFoundError']
  JSON: Scalars['JSON']
  LoginResult: ResolversParentTypes['AuthPayload'] | ResolversParentTypes['UserInvalidInputError']
  Mutation: {}
  Query: {}
  Int: Scalars['Int']
  RegisterResult:
    | ResolversParentTypes['RegisterUser']
    | ResolversParentTypes['UserInvalidInputError']
  RegisterUser: RegisterUser
  ID: Scalars['ID']
  Boolean: Scalars['Boolean']
  Upload: Scalars['Upload']
  User: User
  UserInput: UserInput
  UserInvalidInputError: UserInvalidInputError
  UserLoginInput: UserLoginInput
  UserNotFoundError: UserNotFoundError
  UserRegisterInput: UserRegisterInput
}>

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars['Int']>
  scope?: Maybe<CacheControlScope>
}

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = CacheControlDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AuthPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  refresh?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type GetUserResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['GetUserResult'] = ResolversParentTypes['GetUserResult']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'UserNotFoundError', ParentType, ContextType>
}>

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type LoginResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'AuthPayload' | 'UserInvalidInputError', ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  register?: Resolver<
    Maybe<ResolversTypes['RegisterResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, never>
  >
  login?: Resolver<
    Maybe<ResolversTypes['LoginResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, never>
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  getUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>
  getUser?: Resolver<
    ResolversTypes['GetUserResult'],
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, 'id'>
  >
}>

export type RegisterResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']
> = ResolversObject<{
  __resolveType: TypeResolveFn<'RegisterUser' | 'UserInvalidInputError', ParentType, ContextType>
}>

export type RegisterUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RegisterUser'] = ResolversParentTypes['RegisterUser']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tempPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tempPasswordExpires?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  settings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserInvalidInputErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserInvalidInputError'] = ResolversParentTypes['UserInvalidInputError']
> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserNotFoundErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserNotFoundError'] = ResolversParentTypes['UserNotFoundError']
> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>
  Date?: GraphQLScalarType
  GetUserResult?: GetUserResultResolvers<ContextType>
  JSON?: GraphQLScalarType
  LoginResult?: LoginResultResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  RegisterResult?: RegisterResultResolvers<ContextType>
  RegisterUser?: RegisterUserResolvers<ContextType>
  Upload?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  UserInvalidInputError?: UserInvalidInputErrorResolvers<ContextType>
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>
}>

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>
