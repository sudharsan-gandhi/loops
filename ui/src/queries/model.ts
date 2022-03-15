export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any
  /** Cursor for paging through collections */
  ConnectionCursor: any
}

export type Job = {
  __typename?: "job"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  title: Scalars["String"]
  /** Example field (placeholder) */
  description: Scalars["String"]
  /** Example field (placeholder) */
  expirationDate: Scalars["Timestamp"]
  contact: Scalars["String"]
  location: Scalars["String"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  postedById: Scalars["ID"]
  postedBy: User
}

export type Rave = {
  __typename?: "rave"
  id: Scalars["ID"]
  /** Example field (placeholder) */
  followerId: Scalars["Int"]
  /** Example field (placeholder) */
  followingId: Scalars["Int"]
  follower: User
  following: User
}

export type Review = {
  __typename?: "Review"
  id: Scalars["ID"]
  review: Scalars["String"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  userId: Scalars["ID"]
  packId: Scalars["ID"]
  user: User
  pack: Pack
}

export type User = {
  __typename?: "user"
  id: Scalars["ID"]
  email: Scalars["String"]
  password: Scalars["String"]
  emailVerified?: Maybe<Scalars["Boolean"]>
  image?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  about?: Maybe<Scalars["String"]>
  authorizer: Authorizer
  role: Scalars["String"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  jobs: UserJobsConnection
  packs: UserPacksConnection
  followers: UserFollowersConnection
  followings: UserFollowingsConnection
  payments: UserPaymentsConnection
  reviews: UserReviewsConnection
}

export type UserJobsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<JobFilter>
  sorting?: Maybe<Array<JobSort>>
}

export type UserPacksArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PackFilter>
  sorting?: Maybe<Array<PackSort>>
}

export type UserFollowersArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<RaveFilter>
  sorting?: Maybe<Array<RaveSort>>
}

export type UserFollowingsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<RaveFilter>
  sorting?: Maybe<Array<RaveSort>>
}

export type UserPaymentsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentFilter>
  sorting?: Maybe<Array<PaymentSort>>
}

export type UserReviewsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<ReviewFilter>
  sorting?: Maybe<Array<ReviewSort>>
}

export enum Authorizer {
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  Local = "LOCAL"
}

export type CursorPaging = {
  /** Paginate before opaque cursor */
  before?: Maybe<Scalars["ConnectionCursor"]>
  /** Paginate after opaque cursor */
  after?: Maybe<Scalars["ConnectionCursor"]>
  /** Paginate first */
  first?: Maybe<Scalars["Int"]>
  /** Paginate last */
  last?: Maybe<Scalars["Int"]>
}

export type JobFilter = {
  and?: Maybe<Array<JobFilter>>
  or?: Maybe<Array<JobFilter>>
  id?: Maybe<IdFilterComparison>
  title?: Maybe<StringFieldComparison>
  expirationDate?: Maybe<TimestampFieldComparison>
  location?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
}

export type IdFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<Scalars["ID"]>
  neq?: Maybe<Scalars["ID"]>
  gt?: Maybe<Scalars["ID"]>
  gte?: Maybe<Scalars["ID"]>
  lt?: Maybe<Scalars["ID"]>
  lte?: Maybe<Scalars["ID"]>
  like?: Maybe<Scalars["ID"]>
  notLike?: Maybe<Scalars["ID"]>
  iLike?: Maybe<Scalars["ID"]>
  notILike?: Maybe<Scalars["ID"]>
  in?: Maybe<Array<Scalars["ID"]>>
  notIn?: Maybe<Array<Scalars["ID"]>>
}

export type StringFieldComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<Scalars["String"]>
  neq?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  like?: Maybe<Scalars["String"]>
  notLike?: Maybe<Scalars["String"]>
  iLike?: Maybe<Scalars["String"]>
  notILike?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  notIn?: Maybe<Array<Scalars["String"]>>
}

export type TimestampFieldComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<Scalars["Timestamp"]>
  neq?: Maybe<Scalars["Timestamp"]>
  gt?: Maybe<Scalars["Timestamp"]>
  gte?: Maybe<Scalars["Timestamp"]>
  lt?: Maybe<Scalars["Timestamp"]>
  lte?: Maybe<Scalars["Timestamp"]>
  in?: Maybe<Array<Scalars["Timestamp"]>>
  notIn?: Maybe<Array<Scalars["Timestamp"]>>
  between?: Maybe<TimestampFieldComparisonBetween>
  notBetween?: Maybe<TimestampFieldComparisonBetween>
}

export type TimestampFieldComparisonBetween = {
  lower: Scalars["Timestamp"]
  upper: Scalars["Timestamp"]
}

export type JobSort = {
  field: JobSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum JobSortFields {
  Id = "id",
  Title = "title",
  ExpirationDate = "expirationDate",
  Location = "location",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  PostedById = "postedById"
}

/** Sort Directions */
export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = "NULLS_FIRST",
  NullsLast = "NULLS_LAST"
}

export type PackFilter = {
  and?: Maybe<Array<PackFilter>>
  or?: Maybe<Array<PackFilter>>
  id?: Maybe<IdFilterComparison>
  name?: Maybe<StringFieldComparison>
  price?: Maybe<FloatFieldComparison>
  type?: Maybe<PacketTypeFilterComparison>
  isLoop?: Maybe<BooleanFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  authorId?: Maybe<IdFilterComparison>
}

export type FloatFieldComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<Scalars["Float"]>
  neq?: Maybe<Scalars["Float"]>
  gt?: Maybe<Scalars["Float"]>
  gte?: Maybe<Scalars["Float"]>
  lt?: Maybe<Scalars["Float"]>
  lte?: Maybe<Scalars["Float"]>
  in?: Maybe<Array<Scalars["Float"]>>
  notIn?: Maybe<Array<Scalars["Float"]>>
  between?: Maybe<FloatFieldComparisonBetween>
  notBetween?: Maybe<FloatFieldComparisonBetween>
}

export type FloatFieldComparisonBetween = {
  lower: Scalars["Float"]
  upper: Scalars["Float"]
}

export type PacketTypeFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<PacketType>
  neq?: Maybe<PacketType>
  gt?: Maybe<PacketType>
  gte?: Maybe<PacketType>
  lt?: Maybe<PacketType>
  lte?: Maybe<PacketType>
  like?: Maybe<PacketType>
  notLike?: Maybe<PacketType>
  iLike?: Maybe<PacketType>
  notILike?: Maybe<PacketType>
  in?: Maybe<Array<PacketType>>
  notIn?: Maybe<Array<PacketType>>
}

export enum PacketType {
  Free = "FREE",
  Paid = "PAID"
}

export type BooleanFieldComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
}

export type PackSort = {
  field: PackSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum PackSortFields {
  Id = "id",
  Name = "name",
  Price = "price",
  Type = "type",
  IsLoop = "isLoop",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  AuthorId = "authorId"
}

export type RaveFilter = {
  and?: Maybe<Array<RaveFilter>>
  or?: Maybe<Array<RaveFilter>>
  id?: Maybe<IdFilterComparison>
  followerId?: Maybe<IntFieldComparison>
  followingId?: Maybe<IntFieldComparison>
}

export type IntFieldComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<Scalars["Int"]>
  neq?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  notIn?: Maybe<Array<Scalars["Int"]>>
  between?: Maybe<IntFieldComparisonBetween>
  notBetween?: Maybe<IntFieldComparisonBetween>
}

export type IntFieldComparisonBetween = {
  lower: Scalars["Int"]
  upper: Scalars["Int"]
}

export type RaveSort = {
  field: RaveSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum RaveSortFields {
  Id = "id",
  FollowerId = "followerId",
  FollowingId = "followingId"
}

export type PaymentFilter = {
  and?: Maybe<Array<PaymentFilter>>
  or?: Maybe<Array<PaymentFilter>>
  id?: Maybe<IdFilterComparison>
  type?: Maybe<PlanTypeFilterComparison>
  price?: Maybe<IntFieldComparison>
  planStartDate?: Maybe<TimestampFieldComparison>
  planEndDate?: Maybe<TimestampFieldComparison>
  paymentMode?: Maybe<PaymentModelFilterComparison>
  isActive?: Maybe<PaymentIsActiveFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  packId?: Maybe<IdFilterComparison>
  paymentPlanId?: Maybe<IdFilterComparison>
  userId?: Maybe<IdFilterComparison>
}

export type PlanTypeFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<PlanType>
  neq?: Maybe<PlanType>
  gt?: Maybe<PlanType>
  gte?: Maybe<PlanType>
  lt?: Maybe<PlanType>
  lte?: Maybe<PlanType>
  like?: Maybe<PlanType>
  notLike?: Maybe<PlanType>
  iLike?: Maybe<PlanType>
  notILike?: Maybe<PlanType>
  in?: Maybe<Array<PlanType>>
  notIn?: Maybe<Array<PlanType>>
}

export enum PlanType {
  Subscription = "subscription",
  Buy = "buy"
}

export type PaymentModelFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<PaymentModel>
  neq?: Maybe<PaymentModel>
  gt?: Maybe<PaymentModel>
  gte?: Maybe<PaymentModel>
  lt?: Maybe<PaymentModel>
  lte?: Maybe<PaymentModel>
  like?: Maybe<PaymentModel>
  notLike?: Maybe<PaymentModel>
  iLike?: Maybe<PaymentModel>
  notILike?: Maybe<PaymentModel>
  in?: Maybe<Array<PaymentModel>>
  notIn?: Maybe<Array<PaymentModel>>
}

export enum PaymentModel {
  PayPal = "PayPal",
  MoPay = "MoPay",
  Gift = "Gift"
}

export type PaymentIsActiveFilterComparison = {
  eq?: Maybe<Scalars["Boolean"]>
}

export type PaymentSort = {
  field: PaymentSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum PaymentSortFields {
  Id = "id",
  Type = "type",
  Price = "price",
  PlanStartDate = "planStartDate",
  PlanEndDate = "planEndDate",
  PaymentMode = "paymentMode",
  IsActive = "isActive",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  PackId = "packId",
  PaymentPlanId = "paymentPlanId",
  UserId = "userId"
}

export type ReviewFilter = {
  and?: Maybe<Array<ReviewFilter>>
  or?: Maybe<Array<ReviewFilter>>
  id?: Maybe<IdFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  userId?: Maybe<IdFilterComparison>
  packId?: Maybe<IdFilterComparison>
}

export type ReviewSort = {
  field: ReviewSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum ReviewSortFields {
  Id = "id",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  UserId = "userId",
  PackId = "packId"
}

export type Paymentplan = {
  __typename?: "paymentplan"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  title: Scalars["String"]
  /** Example field (placeholder) */
  description: Scalars["String"]
  /** Example field (placeholder) */
  amount: Scalars["Float"]
  /** Example field (placeholder) */
  month: Scalars["Int"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  postedById: Scalars["ID"]
  /** Example filed (placeholder) */
  isActive: Scalars["Boolean"]
  postedBy: User
  payments: PaymentplanPaymentsConnection
}

export type PaymentplanPaymentsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentFilter>
  sorting?: Maybe<Array<PaymentSort>>
}

export type Payment = {
  __typename?: "payment"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  type: PlanType
  /** Example filed (placeholder) */
  price: Scalars["Int"]
  /** Example filed (placeholder) */
  planStartDate: Scalars["Timestamp"]
  /** Example filed (placeholder) */
  planEndDate: Scalars["Timestamp"]
  /** Example filed (placeholder) */
  paymentMode: PaymentModel
  /** Example filed (placeholder) */
  confirmationToken?: Maybe<Scalars["String"]>
  /** Example filed (placeholder) */
  isActive: Scalars["Boolean"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  packId: Scalars["ID"]
  paymentPlanId: Scalars["ID"]
  userId: Scalars["ID"]
  pack: Pack
  paymentPlan: Paymentplan
  user: User
}

export type Pack = {
  __typename?: "pack"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  name: Scalars["String"]
  /** Example field (placeholder) */
  price: Scalars["Float"]
  /** Example field (placeholder) */
  description: Scalars["String"]
  /** Example field (placeholder) */
  type: PacketType
  isLoop: Scalars["Boolean"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  authorId: Scalars["ID"]
  author: User
  audio: PackAudioConnection
  payments: PackPaymentsConnection
  reviews: PackReviewsConnection
}

export type PackAudioArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<LoopFilter>
  sorting?: Maybe<Array<LoopSort>>
}

export type PackPaymentsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentFilter>
  sorting?: Maybe<Array<PaymentSort>>
}

export type PackReviewsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentFilter>
  sorting?: Maybe<Array<PaymentSort>>
}

export type LoopFilter = {
  and?: Maybe<Array<LoopFilter>>
  or?: Maybe<Array<LoopFilter>>
  id?: Maybe<IdFilterComparison>
  name?: Maybe<StringFieldComparison>
  genre?: Maybe<StringFieldComparison>
  bpm?: Maybe<IntFieldComparison>
  audioType?: Maybe<AudioTypeFilterComparison>
  key?: Maybe<StringFieldComparison>
  tempo?: Maybe<IntFieldComparison>
  packId?: Maybe<IdFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  pack?: Maybe<LoopFilterpackFilter>
}

export type AudioTypeFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<AudioType>
  neq?: Maybe<AudioType>
  gt?: Maybe<AudioType>
  gte?: Maybe<AudioType>
  lt?: Maybe<AudioType>
  lte?: Maybe<AudioType>
  like?: Maybe<AudioType>
  notLike?: Maybe<AudioType>
  iLike?: Maybe<AudioType>
  notILike?: Maybe<AudioType>
  in?: Maybe<Array<AudioType>>
  notIn?: Maybe<Array<AudioType>>
}

export enum AudioType {
  Oneshot = "oneshot",
  Loop = "loop"
}

export type LoopFilterpackFilter = {
  and?: Maybe<Array<LoopFilterpackFilter>>
  or?: Maybe<Array<LoopFilterpackFilter>>
  id?: Maybe<IdFilterComparison>
  name?: Maybe<StringFieldComparison>
  price?: Maybe<FloatFieldComparison>
  type?: Maybe<PacketTypeFilterComparison>
  isLoop?: Maybe<BooleanFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  authorId?: Maybe<IdFilterComparison>
}

export type LoopSort = {
  field: LoopSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum LoopSortFields {
  Id = "id",
  Name = "name",
  Genre = "genre",
  Bpm = "bpm",
  AudioType = "audioType",
  Key = "key",
  Tempo = "tempo",
  PackId = "packId",
  PostDate = "postDate",
  UpdatedAt = "updatedAt"
}

export type Loop = {
  __typename?: "loop"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  name: Scalars["String"]
  /** Example field (placeholder) */
  genre: Scalars["String"]
  /** Example field (placeholder) */
  bpm: Scalars["Int"]
  /** Example field (placeholder) */
  path: Scalars["String"]
  /** Example field (placeholder) */
  audioType: AudioType
  /** Example field (placeholder) */
  key: Scalars["String"]
  /** Example field (placeholder) */
  tempo: Scalars["Int"]
  packId: Scalars["ID"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  pack: Pack
}

export type Grant = {
  __typename?: "grant"
  /** Example field (placeholder) */
  id: Scalars["ID"]
  /** Example field (placeholder) */
  role: Scalars["String"]
  /** Example field (placeholder) */
  resource: Scalars["String"]
  action: GrantActions
  /**
   * all attributes => ['*'],
   * all attributes except specific fields => ['*', '!id']
   * only selected attributes => ['id', 'name']
   */
  attributes: Scalars["String"]
  /** Example field (placeholder) */
  postDate: Scalars["Timestamp"]
  /** Example field (placeholder) */
  updatedAt: Scalars["Timestamp"]
  postedById: Scalars["ID"]
}

export enum GrantActions {
  CreateAny = "createAny",
  CreateOwn = "createOwn",
  ReadAny = "readAny",
  ReadOwn = "readOwn",
  UpdateAny = "updateAny",
  UpdateOwn = "updateOwn",
  DeleteAny = "deleteAny",
  DeleteOwn = "deleteOwn"
}

export type DeleteManyResponse = {
  __typename?: "DeleteManyResponse"
  /** The number of records deleted. */
  deletedCount: Scalars["Int"]
}

export type LoopDeleteResponse = {
  __typename?: "LoopDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  name?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  genre?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  bpm?: Maybe<Scalars["Int"]>
  /** Example field (placeholder) */
  path?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  audioType?: Maybe<AudioType>
  /** Example field (placeholder) */
  key?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type LoopEdge = {
  __typename?: "loopEdge"
  /** The node containing the loop */
  node: Loop
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars["Boolean"]>
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars["Boolean"]>
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars["ConnectionCursor"]>
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars["ConnectionCursor"]>
}

export type LoopConnection = {
  __typename?: "LoopConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<LoopEdge>
}

export type LoopAggregateGroupBy = {
  __typename?: "loopAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  genre?: Maybe<Scalars["String"]>
  bpm?: Maybe<Scalars["Int"]>
  audioType?: Maybe<AudioType>
  key?: Maybe<Scalars["String"]>
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type LoopCountAggregate = {
  __typename?: "loopCountAggregate"
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  genre?: Maybe<Scalars["Int"]>
  bpm?: Maybe<Scalars["Int"]>
  audioType?: Maybe<Scalars["Int"]>
  key?: Maybe<Scalars["Int"]>
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
}

export type LoopSumAggregate = {
  __typename?: "loopSumAggregate"
  id?: Maybe<Scalars["Float"]>
  bpm?: Maybe<Scalars["Float"]>
  tempo?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
}

export type LoopAvgAggregate = {
  __typename?: "loopAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  bpm?: Maybe<Scalars["Float"]>
  tempo?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
}

export type LoopMinAggregate = {
  __typename?: "loopMinAggregate"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  genre?: Maybe<Scalars["String"]>
  bpm?: Maybe<Scalars["Int"]>
  audioType?: Maybe<AudioType>
  key?: Maybe<Scalars["String"]>
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type LoopMaxAggregate = {
  __typename?: "loopMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  genre?: Maybe<Scalars["String"]>
  bpm?: Maybe<Scalars["Int"]>
  audioType?: Maybe<AudioType>
  key?: Maybe<Scalars["String"]>
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type JobDeleteResponse = {
  __typename?: "JobDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  title?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  description?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  expirationDate?: Maybe<Scalars["Timestamp"]>
  contact?: Maybe<Scalars["String"]>
  location?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type JobEdge = {
  __typename?: "jobEdge"
  /** The node containing the job */
  node: Job
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type JobConnection = {
  __typename?: "JobConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<JobEdge>
}

export type JobAggregateGroupBy = {
  __typename?: "jobAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["Timestamp"]>
  location?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type JobCountAggregate = {
  __typename?: "jobCountAggregate"
  id?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["Int"]>
  expirationDate?: Maybe<Scalars["Int"]>
  location?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  postedById?: Maybe<Scalars["Int"]>
}

export type JobSumAggregate = {
  __typename?: "jobSumAggregate"
  id?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type JobAvgAggregate = {
  __typename?: "jobAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type JobMinAggregate = {
  __typename?: "jobMinAggregate"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["Timestamp"]>
  location?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type JobMaxAggregate = {
  __typename?: "jobMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["Timestamp"]>
  location?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type PackDeleteResponse = {
  __typename?: "PackDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  name?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  price?: Maybe<Scalars["Float"]>
  /** Example field (placeholder) */
  description?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  type?: Maybe<PacketType>
  isLoop?: Maybe<Scalars["Boolean"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  authorId?: Maybe<Scalars["ID"]>
}

export type PackEdge = {
  __typename?: "packEdge"
  /** The node containing the pack */
  node: Pack
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type PackConnection = {
  __typename?: "PackConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PackEdge>
}

export type PackAggregateGroupBy = {
  __typename?: "packAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  price?: Maybe<Scalars["Float"]>
  type?: Maybe<PacketType>
  isLoop?: Maybe<Scalars["Boolean"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  authorId?: Maybe<Scalars["ID"]>
}

export type PackCountAggregate = {
  __typename?: "packCountAggregate"
  id?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  price?: Maybe<Scalars["Int"]>
  type?: Maybe<Scalars["Int"]>
  isLoop?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  authorId?: Maybe<Scalars["Int"]>
}

export type PackSumAggregate = {
  __typename?: "packSumAggregate"
  id?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  authorId?: Maybe<Scalars["Float"]>
}

export type PackAvgAggregate = {
  __typename?: "packAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  authorId?: Maybe<Scalars["Float"]>
}

export type PackMinAggregate = {
  __typename?: "packMinAggregate"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  price?: Maybe<Scalars["Float"]>
  type?: Maybe<PacketType>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  authorId?: Maybe<Scalars["ID"]>
}

export type PackMaxAggregate = {
  __typename?: "packMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  price?: Maybe<Scalars["Float"]>
  type?: Maybe<PacketType>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  authorId?: Maybe<Scalars["ID"]>
}

export type PaymentEdge = {
  __typename?: "paymentEdge"
  /** The node containing the payment */
  node: Payment
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type PackReviewsConnection = {
  __typename?: "PackReviewsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentEdge>
}

export type PackPaymentsConnection = {
  __typename?: "PackPaymentsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentEdge>
}

export type PackAudioConnection = {
  __typename?: "PackAudioConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<LoopEdge>
}

export type PaymentplanDeleteResponse = {
  __typename?: "PaymentplanDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  title?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  description?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  amount?: Maybe<Scalars["Float"]>
  /** Example field (placeholder) */
  month?: Maybe<Scalars["Int"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
  /** Example filed (placeholder) */
  isActive?: Maybe<Scalars["Boolean"]>
}

export type PaymentplanEdge = {
  __typename?: "paymentplanEdge"
  /** The node containing the paymentplan */
  node: Paymentplan
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type PaymentplanConnection = {
  __typename?: "PaymentplanConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentplanEdge>
}

export type PaymentplanAggregateGroupBy = {
  __typename?: "paymentplanAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  amount?: Maybe<Scalars["Float"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
  isActive?: Maybe<Scalars["Boolean"]>
}

export type PaymentplanCountAggregate = {
  __typename?: "paymentplanCountAggregate"
  id?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["Int"]>
  amount?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  postedById?: Maybe<Scalars["Int"]>
  isActive?: Maybe<Scalars["Int"]>
}

export type PaymentplanSumAggregate = {
  __typename?: "paymentplanSumAggregate"
  id?: Maybe<Scalars["Float"]>
  amount?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type PaymentplanAvgAggregate = {
  __typename?: "paymentplanAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  amount?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type PaymentplanMinAggregate = {
  __typename?: "paymentplanMinAggregate"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  amount?: Maybe<Scalars["Float"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type PaymentplanMaxAggregate = {
  __typename?: "paymentplanMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
  amount?: Maybe<Scalars["Float"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type PaymentplanPaymentsConnection = {
  __typename?: "PaymentplanPaymentsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentEdge>
}

export type PaymentDeleteResponse = {
  __typename?: "PaymentDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  type?: Maybe<PlanType>
  /** Example filed (placeholder) */
  price?: Maybe<Scalars["Int"]>
  /** Example filed (placeholder) */
  planStartDate?: Maybe<Scalars["Timestamp"]>
  /** Example filed (placeholder) */
  planEndDate?: Maybe<Scalars["Timestamp"]>
  /** Example filed (placeholder) */
  paymentMode?: Maybe<PaymentModel>
  /** Example filed (placeholder) */
  confirmationToken?: Maybe<Scalars["String"]>
  /** Example filed (placeholder) */
  isActive?: Maybe<Scalars["Boolean"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  packId?: Maybe<Scalars["ID"]>
  paymentPlanId?: Maybe<Scalars["ID"]>
  userId?: Maybe<Scalars["ID"]>
}

export type PaymentConnection = {
  __typename?: "PaymentConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentEdge>
}

export type PaymentAggregateGroupBy = {
  __typename?: "paymentAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  type?: Maybe<PlanType>
  price?: Maybe<Scalars["Int"]>
  planStartDate?: Maybe<Scalars["Timestamp"]>
  planEndDate?: Maybe<Scalars["Timestamp"]>
  paymentMode?: Maybe<PaymentModel>
  isActive?: Maybe<Scalars["Boolean"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  packId?: Maybe<Scalars["ID"]>
  paymentPlanId?: Maybe<Scalars["ID"]>
  userId?: Maybe<Scalars["ID"]>
}

export type PaymentCountAggregate = {
  __typename?: "paymentCountAggregate"
  id?: Maybe<Scalars["Int"]>
  type?: Maybe<Scalars["Int"]>
  price?: Maybe<Scalars["Int"]>
  planStartDate?: Maybe<Scalars["Int"]>
  planEndDate?: Maybe<Scalars["Int"]>
  paymentMode?: Maybe<Scalars["Int"]>
  isActive?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["Int"]>
  paymentPlanId?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["Int"]>
}

export type PaymentSumAggregate = {
  __typename?: "paymentSumAggregate"
  id?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
  paymentPlanId?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["Float"]>
}

export type PaymentAvgAggregate = {
  __typename?: "paymentAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
  paymentPlanId?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["Float"]>
}

export type PaymentMinAggregate = {
  __typename?: "paymentMinAggregate"
  id?: Maybe<Scalars["ID"]>
  type?: Maybe<PlanType>
  price?: Maybe<Scalars["Int"]>
  planStartDate?: Maybe<Scalars["Timestamp"]>
  planEndDate?: Maybe<Scalars["Timestamp"]>
  paymentMode?: Maybe<PaymentModel>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  packId?: Maybe<Scalars["ID"]>
  paymentPlanId?: Maybe<Scalars["ID"]>
  userId?: Maybe<Scalars["ID"]>
}

export type PaymentMaxAggregate = {
  __typename?: "paymentMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  type?: Maybe<PlanType>
  price?: Maybe<Scalars["Int"]>
  planStartDate?: Maybe<Scalars["Timestamp"]>
  planEndDate?: Maybe<Scalars["Timestamp"]>
  paymentMode?: Maybe<PaymentModel>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  packId?: Maybe<Scalars["ID"]>
  paymentPlanId?: Maybe<Scalars["ID"]>
  userId?: Maybe<Scalars["ID"]>
}

export type RaveDeleteResponse = {
  __typename?: "RaveDeleteResponse"
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  followerId?: Maybe<Scalars["Int"]>
  /** Example field (placeholder) */
  followingId?: Maybe<Scalars["Int"]>
}

export type RaveEdge = {
  __typename?: "raveEdge"
  /** The node containing the rave */
  node: Rave
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type RaveConnection = {
  __typename?: "RaveConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<RaveEdge>
}

export type RaveAggregateGroupBy = {
  __typename?: "raveAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  followerId?: Maybe<Scalars["Int"]>
  followingId?: Maybe<Scalars["Int"]>
}

export type RaveCountAggregate = {
  __typename?: "raveCountAggregate"
  id?: Maybe<Scalars["Int"]>
  followerId?: Maybe<Scalars["Int"]>
  followingId?: Maybe<Scalars["Int"]>
}

export type RaveSumAggregate = {
  __typename?: "raveSumAggregate"
  id?: Maybe<Scalars["Float"]>
  followerId?: Maybe<Scalars["Float"]>
  followingId?: Maybe<Scalars["Float"]>
}

export type RaveAvgAggregate = {
  __typename?: "raveAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  followerId?: Maybe<Scalars["Float"]>
  followingId?: Maybe<Scalars["Float"]>
}

export type RaveMinAggregate = {
  __typename?: "raveMinAggregate"
  id?: Maybe<Scalars["ID"]>
  followerId?: Maybe<Scalars["Int"]>
  followingId?: Maybe<Scalars["Int"]>
}

export type RaveMaxAggregate = {
  __typename?: "raveMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  followerId?: Maybe<Scalars["Int"]>
  followingId?: Maybe<Scalars["Int"]>
}

export type UserDeleteResponse = {
  __typename?: "UserDeleteResponse"
  id?: Maybe<Scalars["ID"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  emailVerified?: Maybe<Scalars["Boolean"]>
  image?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
  authorizer?: Maybe<Authorizer>
  role?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type UserEdge = {
  __typename?: "userEdge"
  /** The node containing the user */
  node: User
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type UserConnection = {
  __typename?: "UserConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<UserEdge>
}

export type UserAggregateGroupBy = {
  __typename?: "userAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type UserCountAggregate = {
  __typename?: "userCountAggregate"
  id?: Maybe<Scalars["Int"]>
  email?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
}

export type UserSumAggregate = {
  __typename?: "userSumAggregate"
  id?: Maybe<Scalars["Float"]>
}

export type UserAvgAggregate = {
  __typename?: "userAvgAggregate"
  id?: Maybe<Scalars["Float"]>
}

export type UserMinAggregate = {
  __typename?: "userMinAggregate"
  id?: Maybe<Scalars["ID"]>
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type UserMaxAggregate = {
  __typename?: "userMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  email?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
}

export type ReviewEdge = {
  __typename?: "ReviewEdge"
  /** The node containing the Review */
  node: Review
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type UserReviewsConnection = {
  __typename?: "UserReviewsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<ReviewEdge>
}

export type UserPaymentsConnection = {
  __typename?: "UserPaymentsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PaymentEdge>
}

export type UserFollowingsConnection = {
  __typename?: "UserFollowingsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<RaveEdge>
}

export type UserFollowersConnection = {
  __typename?: "UserFollowersConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<RaveEdge>
}

export type UserPacksConnection = {
  __typename?: "UserPacksConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<PackEdge>
}

export type UserJobsConnection = {
  __typename?: "UserJobsConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<JobEdge>
}

export type ReviewDeleteResponse = {
  __typename?: "ReviewDeleteResponse"
  id?: Maybe<Scalars["ID"]>
  review?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  userId?: Maybe<Scalars["ID"]>
  packId?: Maybe<Scalars["ID"]>
}

export type ReviewConnection = {
  __typename?: "ReviewConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<ReviewEdge>
}

export type ReviewAggregateGroupBy = {
  __typename?: "ReviewAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  userId?: Maybe<Scalars["ID"]>
  packId?: Maybe<Scalars["ID"]>
}

export type ReviewCountAggregate = {
  __typename?: "ReviewCountAggregate"
  id?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  userId?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["Int"]>
}

export type ReviewSumAggregate = {
  __typename?: "ReviewSumAggregate"
  id?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
}

export type ReviewAvgAggregate = {
  __typename?: "ReviewAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  userId?: Maybe<Scalars["Float"]>
  packId?: Maybe<Scalars["Float"]>
}

export type ReviewMinAggregate = {
  __typename?: "ReviewMinAggregate"
  id?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  userId?: Maybe<Scalars["ID"]>
  packId?: Maybe<Scalars["ID"]>
}

export type ReviewMaxAggregate = {
  __typename?: "ReviewMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  userId?: Maybe<Scalars["ID"]>
  packId?: Maybe<Scalars["ID"]>
}

export type GrantDeleteResponse = {
  __typename?: "GrantDeleteResponse"
  /** Example field (placeholder) */
  id?: Maybe<Scalars["ID"]>
  /** Example field (placeholder) */
  role?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  resource?: Maybe<Scalars["String"]>
  action?: Maybe<GrantActions>
  /**
   * all attributes => ['*'],
   * all attributes except specific fields => ['*', '!id']
   * only selected attributes => ['id', 'name']
   */
  attributes?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  postDate?: Maybe<Scalars["Timestamp"]>
  /** Example field (placeholder) */
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type GrantEdge = {
  __typename?: "grantEdge"
  /** The node containing the grant */
  node: Grant
  /** Cursor for this node. */
  cursor: Scalars["ConnectionCursor"]
}

export type GrantConnection = {
  __typename?: "GrantConnection"
  /** Paging information */
  pageInfo: PageInfo
  /** Array of edges. */
  edges: Array<GrantEdge>
}

export type GrantAggregateGroupBy = {
  __typename?: "grantAggregateGroupBy"
  id?: Maybe<Scalars["ID"]>
  role?: Maybe<Scalars["String"]>
  resource?: Maybe<Scalars["String"]>
  action?: Maybe<GrantActions>
  attributes?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type GrantCountAggregate = {
  __typename?: "grantCountAggregate"
  id?: Maybe<Scalars["Int"]>
  role?: Maybe<Scalars["Int"]>
  resource?: Maybe<Scalars["Int"]>
  action?: Maybe<Scalars["Int"]>
  attributes?: Maybe<Scalars["Int"]>
  postDate?: Maybe<Scalars["Int"]>
  updatedAt?: Maybe<Scalars["Int"]>
  postedById?: Maybe<Scalars["Int"]>
}

export type GrantSumAggregate = {
  __typename?: "grantSumAggregate"
  id?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type GrantAvgAggregate = {
  __typename?: "grantAvgAggregate"
  id?: Maybe<Scalars["Float"]>
  postedById?: Maybe<Scalars["Float"]>
}

export type GrantMinAggregate = {
  __typename?: "grantMinAggregate"
  id?: Maybe<Scalars["ID"]>
  role?: Maybe<Scalars["String"]>
  resource?: Maybe<Scalars["String"]>
  action?: Maybe<GrantActions>
  attributes?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type GrantMaxAggregate = {
  __typename?: "grantMaxAggregate"
  id?: Maybe<Scalars["ID"]>
  role?: Maybe<Scalars["String"]>
  resource?: Maybe<Scalars["String"]>
  action?: Maybe<GrantActions>
  attributes?: Maybe<Scalars["String"]>
  postDate?: Maybe<Scalars["Timestamp"]>
  updatedAt?: Maybe<Scalars["Timestamp"]>
  postedById?: Maybe<Scalars["ID"]>
}

export type Query = {
  __typename?: "Query"
  loop?: Maybe<Loop>
  loops: LoopConnection
  job?: Maybe<Job>
  jobs: JobConnection
  pack?: Maybe<Pack>
  packs: PackConnection
  paymentplan?: Maybe<Paymentplan>
  paymentplans: PaymentplanConnection
  payment?: Maybe<Payment>
  payments: PaymentConnection
  rave?: Maybe<Rave>
  raves: RaveConnection
  user?: Maybe<User>
  users: UserConnection
  review?: Maybe<Review>
  reviews: ReviewConnection
  grant?: Maybe<Grant>
  grants: GrantConnection
}

export type QueryLoopArgs = {
  id: Scalars["ID"]
}

export type QueryLoopsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<LoopFilter>
  sorting?: Maybe<Array<LoopSort>>
}

export type QueryJobArgs = {
  id: Scalars["ID"]
}

export type QueryJobsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<JobFilter>
  sorting?: Maybe<Array<JobSort>>
}

export type QueryPackArgs = {
  id: Scalars["ID"]
}

export type QueryPacksArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PackFilter>
  sorting?: Maybe<Array<PackSort>>
}

export type QueryPaymentplanArgs = {
  id: Scalars["ID"]
}

export type QueryPaymentplansArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentplanFilter>
  sorting?: Maybe<Array<PaymentplanSort>>
}

export type QueryPaymentArgs = {
  id: Scalars["ID"]
}

export type QueryPaymentsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<PaymentFilter>
  sorting?: Maybe<Array<PaymentSort>>
}

export type QueryRaveArgs = {
  id: Scalars["ID"]
}

export type QueryRavesArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<RaveFilter>
  sorting?: Maybe<Array<RaveSort>>
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type QueryUsersArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<UserFilter>
  sorting?: Maybe<Array<UserSort>>
}

export type QueryReviewArgs = {
  id: Scalars["ID"]
}

export type QueryReviewsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<ReviewFilter>
  sorting?: Maybe<Array<ReviewSort>>
}

export type QueryGrantArgs = {
  id: Scalars["ID"]
}

export type QueryGrantsArgs = {
  paging?: Maybe<CursorPaging>
  filter?: Maybe<GrantFilter>
  sorting?: Maybe<Array<GrantSort>>
}

export type PaymentplanFilter = {
  and?: Maybe<Array<PaymentplanFilter>>
  or?: Maybe<Array<PaymentplanFilter>>
  id?: Maybe<IdFilterComparison>
  title?: Maybe<StringFieldComparison>
  amount?: Maybe<FloatFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
  isActive?: Maybe<PaymentplanIsActiveFilterComparison>
}

export type PaymentplanIsActiveFilterComparison = {
  eq?: Maybe<Scalars["Boolean"]>
}

export type PaymentplanSort = {
  field: PaymentplanSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum PaymentplanSortFields {
  Id = "id",
  Title = "title",
  Amount = "amount",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  PostedById = "postedById",
  IsActive = "isActive"
}

export type UserFilter = {
  and?: Maybe<Array<UserFilter>>
  or?: Maybe<Array<UserFilter>>
  id?: Maybe<IdFilterComparison>
  email?: Maybe<StringFieldComparison>
  name?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
}

export type UserSort = {
  field: UserSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum UserSortFields {
  Id = "id",
  Email = "email",
  Name = "name",
  PostDate = "postDate",
  UpdatedAt = "updatedAt"
}

export type GrantFilter = {
  and?: Maybe<Array<GrantFilter>>
  or?: Maybe<Array<GrantFilter>>
  id?: Maybe<IdFilterComparison>
  role?: Maybe<StringFieldComparison>
  resource?: Maybe<StringFieldComparison>
  action?: Maybe<GrantActionsFilterComparison>
  attributes?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
}

export type GrantActionsFilterComparison = {
  is?: Maybe<Scalars["Boolean"]>
  isNot?: Maybe<Scalars["Boolean"]>
  eq?: Maybe<GrantActions>
  neq?: Maybe<GrantActions>
  gt?: Maybe<GrantActions>
  gte?: Maybe<GrantActions>
  lt?: Maybe<GrantActions>
  lte?: Maybe<GrantActions>
  like?: Maybe<GrantActions>
  notLike?: Maybe<GrantActions>
  iLike?: Maybe<GrantActions>
  notILike?: Maybe<GrantActions>
  in?: Maybe<Array<GrantActions>>
  notIn?: Maybe<Array<GrantActions>>
}

export type GrantSort = {
  field: GrantSortFields
  direction: SortDirection
  nulls?: Maybe<SortNulls>
}

export enum GrantSortFields {
  Id = "id",
  Role = "role",
  Resource = "resource",
  Action = "action",
  Attributes = "attributes",
  PostDate = "postDate",
  UpdatedAt = "updatedAt",
  PostedById = "postedById"
}

export type Mutation = {
  __typename?: "Mutation"
  setPackOnLoop: Loop
  createOneLoop: Loop
  updateOneLoop: Loop
  deleteOneLoop: LoopDeleteResponse
  deleteManyLoops: DeleteManyResponse
  setPostedByOnJob: Job
  createOneJob: Job
  updateOneJob: Job
  deleteOneJob: JobDeleteResponse
  deleteManyJobs: DeleteManyResponse
  setAuthorOnPack: Pack
  addAudioToPack: Pack
  setAudioOnPack: Pack
  addPaymentsToPack: Pack
  setPaymentsOnPack: Pack
  addReviewsToPack: Pack
  setReviewsOnPack: Pack
  createOnePack: Pack
  updateOnePack: Pack
  deleteOnePack: PackDeleteResponse
  deleteManyPacks: DeleteManyResponse
  setPostedByOnPaymentplan: Paymentplan
  addPaymentsToPaymentplan: Paymentplan
  setPaymentsOnPaymentplan: Paymentplan
  createOnePaymentplan: Paymentplan
  updateOnePaymentplan: Paymentplan
  deleteOnePaymentplan: PaymentplanDeleteResponse
  deleteManyPaymentplans: DeleteManyResponse
  setPackOnPayment: Payment
  setPaymentPlanOnPayment: Payment
  setUserOnPayment: Payment
  createOnePayment: Payment
  updateOnePayment: Payment
  deleteOnePayment: PaymentDeleteResponse
  deleteManyPayments: DeleteManyResponse
  setFollowerOnRave: Rave
  setFollowingOnRave: Rave
  createOneRave: Rave
  updateOneRave: Rave
  deleteOneRave: RaveDeleteResponse
  deleteManyRaves: DeleteManyResponse
  addJobsToUser: User
  setJobsOnUser: User
  addPacksToUser: User
  setPacksOnUser: User
  addFollowersToUser: User
  setFollowersOnUser: User
  addFollowingsToUser: User
  setFollowingsOnUser: User
  addPaymentsToUser: User
  setPaymentsOnUser: User
  addReviewsToUser: User
  setReviewsOnUser: User
  createOneUser: User
  updateOneUser: User
  deleteOneUser: UserDeleteResponse
  deleteManyUsers: DeleteManyResponse
  setUserOnReview: Review
  setPackOnReview: Review
  createOneReview: Review
  updateOneReview: Review
  deleteOneReview: ReviewDeleteResponse
  deleteManyReviews: DeleteManyResponse
  createOneGrant: Grant
  updateOneGrant: Grant
  deleteOneGrant: GrantDeleteResponse
  deleteManyGrants: DeleteManyResponse
}

export type MutationSetPackOnLoopArgs = {
  input: SetPackOnLoopInput
}

export type MutationCreateOneLoopArgs = {
  input: CreateOneLoopInput
}

export type MutationUpdateOneLoopArgs = {
  input: UpdateOneLoopInput
}

export type MutationDeleteOneLoopArgs = {
  input: DeleteOneLoopInput
}

export type MutationDeleteManyLoopsArgs = {
  input: DeleteManyLoopsInput
}

export type MutationSetPostedByOnJobArgs = {
  input: SetPostedByOnJobInput
}

export type MutationCreateOneJobArgs = {
  input: CreateOneJobInput
}

export type MutationUpdateOneJobArgs = {
  input: UpdateOneJobInput
}

export type MutationDeleteOneJobArgs = {
  input: DeleteOneJobInput
}

export type MutationDeleteManyJobsArgs = {
  input: DeleteManyJobsInput
}

export type MutationSetAuthorOnPackArgs = {
  input: SetAuthorOnPackInput
}

export type MutationAddAudioToPackArgs = {
  input: AddAudioToPackInput
}

export type MutationSetAudioOnPackArgs = {
  input: SetAudioOnPackInput
}

export type MutationAddPaymentsToPackArgs = {
  input: AddPaymentsToPackInput
}

export type MutationSetPaymentsOnPackArgs = {
  input: SetPaymentsOnPackInput
}

export type MutationAddReviewsToPackArgs = {
  input: AddReviewsToPackInput
}

export type MutationSetReviewsOnPackArgs = {
  input: SetReviewsOnPackInput
}

export type MutationCreateOnePackArgs = {
  input: CreateOnePackInput
}

export type MutationUpdateOnePackArgs = {
  input: UpdateOnePackInput
}

export type MutationDeleteOnePackArgs = {
  input: DeleteOnePackInput
}

export type MutationDeleteManyPacksArgs = {
  input: DeleteManyPacksInput
}

export type MutationSetPostedByOnPaymentplanArgs = {
  input: SetPostedByOnPaymentplanInput
}

export type MutationAddPaymentsToPaymentplanArgs = {
  input: AddPaymentsToPaymentplanInput
}

export type MutationSetPaymentsOnPaymentplanArgs = {
  input: SetPaymentsOnPaymentplanInput
}

export type MutationCreateOnePaymentplanArgs = {
  input: CreateOnePaymentplanInput
}

export type MutationUpdateOnePaymentplanArgs = {
  input: UpdateOnePaymentplanInput
}

export type MutationDeleteOnePaymentplanArgs = {
  input: DeleteOnePaymentplanInput
}

export type MutationDeleteManyPaymentplansArgs = {
  input: DeleteManyPaymentplansInput
}

export type MutationSetPackOnPaymentArgs = {
  input: SetPackOnPaymentInput
}

export type MutationSetPaymentPlanOnPaymentArgs = {
  input: SetPaymentPlanOnPaymentInput
}

export type MutationSetUserOnPaymentArgs = {
  input: SetUserOnPaymentInput
}

export type MutationCreateOnePaymentArgs = {
  input: CreateOnePaymentInput
}

export type MutationUpdateOnePaymentArgs = {
  input: UpdateOnePaymentInput
}

export type MutationDeleteOnePaymentArgs = {
  input: DeleteOnePaymentInput
}

export type MutationDeleteManyPaymentsArgs = {
  input: DeleteManyPaymentsInput
}

export type MutationSetFollowerOnRaveArgs = {
  input: SetFollowerOnRaveInput
}

export type MutationSetFollowingOnRaveArgs = {
  input: SetFollowingOnRaveInput
}

export type MutationCreateOneRaveArgs = {
  input: CreateOneRaveInput
}

export type MutationUpdateOneRaveArgs = {
  input: UpdateOneRaveInput
}

export type MutationDeleteOneRaveArgs = {
  input: DeleteOneRaveInput
}

export type MutationDeleteManyRavesArgs = {
  input: DeleteManyRavesInput
}

export type MutationAddJobsToUserArgs = {
  input: AddJobsToUserInput
}

export type MutationSetJobsOnUserArgs = {
  input: SetJobsOnUserInput
}

export type MutationAddPacksToUserArgs = {
  input: AddPacksToUserInput
}

export type MutationSetPacksOnUserArgs = {
  input: SetPacksOnUserInput
}

export type MutationAddFollowersToUserArgs = {
  input: AddFollowersToUserInput
}

export type MutationSetFollowersOnUserArgs = {
  input: SetFollowersOnUserInput
}

export type MutationAddFollowingsToUserArgs = {
  input: AddFollowingsToUserInput
}

export type MutationSetFollowingsOnUserArgs = {
  input: SetFollowingsOnUserInput
}

export type MutationAddPaymentsToUserArgs = {
  input: AddPaymentsToUserInput
}

export type MutationSetPaymentsOnUserArgs = {
  input: SetPaymentsOnUserInput
}

export type MutationAddReviewsToUserArgs = {
  input: AddReviewsToUserInput
}

export type MutationSetReviewsOnUserArgs = {
  input: SetReviewsOnUserInput
}

export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput
}

export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput
}

export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput
}

export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput
}

export type MutationSetUserOnReviewArgs = {
  input: SetUserOnReviewInput
}

export type MutationSetPackOnReviewArgs = {
  input: SetPackOnReviewInput
}

export type MutationCreateOneReviewArgs = {
  input: CreateOneReviewInput
}

export type MutationUpdateOneReviewArgs = {
  input: UpdateOneReviewInput
}

export type MutationDeleteOneReviewArgs = {
  input: DeleteOneReviewInput
}

export type MutationDeleteManyReviewsArgs = {
  input: DeleteManyReviewsInput
}

export type MutationCreateOneGrantArgs = {
  input: CreateOneGrantInput
}

export type MutationUpdateOneGrantArgs = {
  input: UpdateOneGrantInput
}

export type MutationDeleteOneGrantArgs = {
  input: DeleteOneGrantInput
}

export type MutationDeleteManyGrantsArgs = {
  input: DeleteManyGrantsInput
}

export type SetPackOnLoopInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type CreateOneLoopInput = {
  /** The record to create */
  loop: AudioInputDto
}

export type AudioInputDto = {
  /** Example field (placeholder) */
  name: Scalars["String"]
  /** Example field (placeholder) */
  genre: Scalars["String"]
  /** Example field (placeholder) */
  bpm: Scalars["Int"]
  /** Example field (placeholder) */
  path: Scalars["String"]
  /** Example field (placeholder) */
  audioType: AudioType
  /** Example field (placeholder) */
  key?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  tempo: Scalars["Int"]
  packId: Scalars["ID"]
}

export type UpdateOneLoopInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: AudioUpdateDto
}

export type AudioUpdateDto = {
  /** Example field (placeholder) */
  name?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  genre?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  bpm?: Maybe<Scalars["Int"]>
  /** Example field (placeholder) */
  path?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  audioType?: Maybe<AudioType>
  /** Example field (placeholder) */
  key?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  tempo?: Maybe<Scalars["Int"]>
  packId?: Maybe<Scalars["ID"]>
}

export type DeleteOneLoopInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyLoopsInput = {
  /** Filter to find records to delete */
  filter: LoopDeleteFilter
}

export type LoopDeleteFilter = {
  and?: Maybe<Array<LoopDeleteFilter>>
  or?: Maybe<Array<LoopDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  name?: Maybe<StringFieldComparison>
  genre?: Maybe<StringFieldComparison>
  bpm?: Maybe<IntFieldComparison>
  audioType?: Maybe<AudioTypeFilterComparison>
  key?: Maybe<StringFieldComparison>
  tempo?: Maybe<IntFieldComparison>
  packId?: Maybe<IdFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
}

export type SetPostedByOnJobInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type CreateOneJobInput = {
  /** The record to create */
  job: JobInputDto
}

export type JobInputDto = {
  /** Example field (placeholder) */
  title: Scalars["String"]
  /** Example field (placeholder) */
  description: Scalars["String"]
  /** Example field (placeholder) */
  expirationDate: Scalars["Timestamp"]
  contact: Scalars["String"]
  location: Scalars["String"]
  postedById: Scalars["ID"]
}

export type UpdateOneJobInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: JobInputDto
}

export type DeleteOneJobInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyJobsInput = {
  /** Filter to find records to delete */
  filter: JobDeleteFilter
}

export type JobDeleteFilter = {
  and?: Maybe<Array<JobDeleteFilter>>
  or?: Maybe<Array<JobDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  title?: Maybe<StringFieldComparison>
  expirationDate?: Maybe<TimestampFieldComparison>
  location?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
}

export type SetAuthorOnPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type AddAudioToPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetAudioOnPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddPaymentsToPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetPaymentsOnPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddReviewsToPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetReviewsOnPackInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type CreateOnePackInput = {
  /** The record to create */
  pack: PackInputDto
}

export type PackInputDto = {
  /** Example field (placeholder) */
  name: Scalars["String"]
  description: Scalars["String"]
  /** Example field (placeholder) */
  price?: Maybe<Scalars["Float"]>
  isLoop?: Maybe<Scalars["Boolean"]>
  /** Example field (placeholder) */
  type: PacketType
  authorId?: Maybe<Scalars["ID"]>
  audio?: Maybe<Array<Maybe<AudioInputDto>>>
}

export type UpdateOnePackInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: PackUpdateDto
}

export type PackUpdateDto = {
  /** Example field (placeholder) */
  name?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  /** Example field (placeholder) */
  price?: Maybe<Scalars["Float"]>
  isLoop?: Maybe<Scalars["Boolean"]>
  /** Example field (placeholder) */
  type?: Maybe<PacketType>
  authorId?: Maybe<Scalars["ID"]>
  audio?: Maybe<Array<Maybe<AudioInputDto>>>
}

export type DeleteOnePackInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyPacksInput = {
  /** Filter to find records to delete */
  filter: PackDeleteFilter
}

export type PackDeleteFilter = {
  and?: Maybe<Array<PackDeleteFilter>>
  or?: Maybe<Array<PackDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  name?: Maybe<StringFieldComparison>
  price?: Maybe<FloatFieldComparison>
  type?: Maybe<PacketTypeFilterComparison>
  isLoop?: Maybe<BooleanFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  authorId?: Maybe<IdFilterComparison>
}

export type SetPostedByOnPaymentplanInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type AddPaymentsToPaymentplanInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetPaymentsOnPaymentplanInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type CreateOnePaymentplanInput = {
  /** The record to create */
  paymentplan: PaymentplanInputDto
}

export type PaymentplanInputDto = {
  /** Example field (placeholder) */
  title: Scalars["String"]
  /** Example field (placeholder) */
  description: Scalars["String"]
  /** Example field (placeholder) */
  amount: Scalars["Float"]
  /** Example field (placeholder) */
  month: Scalars["Int"]
  /** Example filed (placeholder) */
  isActive: Scalars["Boolean"]
  postedById: Scalars["ID"]
}

export type UpdateOnePaymentplanInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: PaymentplanInputDto
}

export type DeleteOnePaymentplanInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyPaymentplansInput = {
  /** Filter to find records to delete */
  filter: PaymentplanDeleteFilter
}

export type PaymentplanDeleteFilter = {
  and?: Maybe<Array<PaymentplanDeleteFilter>>
  or?: Maybe<Array<PaymentplanDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  title?: Maybe<StringFieldComparison>
  amount?: Maybe<FloatFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
  isActive?: Maybe<PaymentplanIsActiveFilterComparison>
}

export type SetPackOnPaymentInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type SetPaymentPlanOnPaymentInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type SetUserOnPaymentInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type CreateOnePaymentInput = {
  /** The record to create */
  payment: PaymentInputDto
}

export type PaymentInputDto = {
  /** Example field (placeholder) */
  type: PlanType
  /** Example filed (placeholder) */
  price: Scalars["Int"]
  /** Example filed (placeholder) */
  planStartDate: Scalars["Timestamp"]
  /** Example filed (placeholder) */
  planEndDate: Scalars["Timestamp"]
  /** possible values are (MoPay) and (PayPal) */
  paymentMode: PaymentModel
  /** Example filed (placeholder) */
  confirmationToken?: Maybe<Scalars["String"]>
  /** Example filed (placeholder) */
  isActive: Scalars["Boolean"]
  packId: Scalars["ID"]
  paymentPlanId: Scalars["ID"]
  userId: Scalars["ID"]
}

export type UpdateOnePaymentInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: PaymentInputDto
}

export type DeleteOnePaymentInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyPaymentsInput = {
  /** Filter to find records to delete */
  filter: PaymentDeleteFilter
}

export type PaymentDeleteFilter = {
  and?: Maybe<Array<PaymentDeleteFilter>>
  or?: Maybe<Array<PaymentDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  type?: Maybe<PlanTypeFilterComparison>
  price?: Maybe<IntFieldComparison>
  planStartDate?: Maybe<TimestampFieldComparison>
  planEndDate?: Maybe<TimestampFieldComparison>
  paymentMode?: Maybe<PaymentModelFilterComparison>
  isActive?: Maybe<PaymentIsActiveFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  packId?: Maybe<IdFilterComparison>
  paymentPlanId?: Maybe<IdFilterComparison>
  userId?: Maybe<IdFilterComparison>
}

export type SetFollowerOnRaveInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type SetFollowingOnRaveInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type CreateOneRaveInput = {
  /** The record to create */
  rave: RaveInputDto
}

export type RaveInputDto = {
  /** Example field (placeholder) */
  followerId: Scalars["Int"]
  /** Example field (placeholder) */
  followingId: Scalars["Int"]
}

export type UpdateOneRaveInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: RaveInputDto
}

export type DeleteOneRaveInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyRavesInput = {
  /** Filter to find records to delete */
  filter: RaveDeleteFilter
}

export type RaveDeleteFilter = {
  and?: Maybe<Array<RaveDeleteFilter>>
  or?: Maybe<Array<RaveDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  followerId?: Maybe<IntFieldComparison>
  followingId?: Maybe<IntFieldComparison>
}

export type AddJobsToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetJobsOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddPacksToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetPacksOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddFollowersToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetFollowersOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddFollowingsToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetFollowingsOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddPaymentsToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetPaymentsOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type AddReviewsToUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type SetReviewsOnUserInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The ids of the relations. */
  relationIds: Array<Scalars["ID"]>
}

export type CreateOneUserInput = {
  /** The record to create */
  user: UserInputDto
}

export type UserInputDto = {
  email: Scalars["String"]
  password: Scalars["String"]
  emailVerified?: Maybe<Scalars["Boolean"]>
  image?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  about?: Maybe<Scalars["String"]>
  role?: Maybe<Scalars["String"]>
}

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: UserUpdateDto
}

export type UserUpdateDto = {
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  emailVerified?: Maybe<Scalars["Boolean"]>
  image?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  about?: Maybe<Scalars["String"]>
  role?: Maybe<Scalars["String"]>
}

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter
}

export type UserDeleteFilter = {
  and?: Maybe<Array<UserDeleteFilter>>
  or?: Maybe<Array<UserDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  email?: Maybe<StringFieldComparison>
  name?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
}

export type SetUserOnReviewInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type SetPackOnReviewInput = {
  /** The id of the record. */
  id: Scalars["ID"]
  /** The id of relation. */
  relationId: Scalars["ID"]
}

export type CreateOneReviewInput = {
  /** The record to create */
  review: ReviewInputDto
}

export type ReviewInputDto = {
  review: Scalars["String"]
  userId: Scalars["ID"]
  packId: Scalars["ID"]
}

export type UpdateOneReviewInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: ReviewInputDto
}

export type DeleteOneReviewInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyReviewsInput = {
  /** Filter to find records to delete */
  filter: ReviewDeleteFilter
}

export type ReviewDeleteFilter = {
  and?: Maybe<Array<ReviewDeleteFilter>>
  or?: Maybe<Array<ReviewDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  userId?: Maybe<IdFilterComparison>
  packId?: Maybe<IdFilterComparison>
}

export type CreateOneGrantInput = {
  /** The record to create */
  grant: GrantDto
}

export type GrantDto = {
  /** Example field (placeholder) */
  role: Scalars["String"]
  /** Example field (placeholder) */
  resource: Scalars["String"]
  action: GrantActions
  /**
   * all attributes => ['*'],
   * all attributes except specific fields => ['*', '!id']
   * only selected attributes => ['id', 'name']
   */
  attributes: Scalars["String"]
  postedById: Scalars["ID"]
}

export type UpdateOneGrantInput = {
  /** The id of the record to update */
  id: Scalars["ID"]
  /** The update to apply. */
  update: GrantDto
}

export type DeleteOneGrantInput = {
  /** The id of the record to delete. */
  id: Scalars["ID"]
}

export type DeleteManyGrantsInput = {
  /** Filter to find records to delete */
  filter: GrantDeleteFilter
}

export type GrantDeleteFilter = {
  and?: Maybe<Array<GrantDeleteFilter>>
  or?: Maybe<Array<GrantDeleteFilter>>
  id?: Maybe<IdFilterComparison>
  role?: Maybe<StringFieldComparison>
  resource?: Maybe<StringFieldComparison>
  action?: Maybe<GrantActionsFilterComparison>
  attributes?: Maybe<StringFieldComparison>
  postDate?: Maybe<TimestampFieldComparison>
  updatedAt?: Maybe<TimestampFieldComparison>
  postedById?: Maybe<IdFilterComparison>
}
