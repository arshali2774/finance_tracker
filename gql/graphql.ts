/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  add_wishlist_item_to_expenses?: Maybe<Scalars['UUID']['output']>;
  /** Deletes zero or more records from the `archive` collection */
  deleteFromarchiveCollection: ArchiveDeleteResponse;
  /** Deletes zero or more records from the `categories` collection */
  deleteFromcategoriesCollection: CategoriesDeleteResponse;
  /** Deletes zero or more records from the `daily_expenses` collection */
  deleteFromdaily_expensesCollection: Daily_ExpensesDeleteResponse;
  /** Deletes zero or more records from the `emis` collection */
  deleteFromemisCollection: EmisDeleteResponse;
  /** Deletes zero or more records from the `monthly_records` collection */
  deleteFrommonthly_recordsCollection: Monthly_RecordsDeleteResponse;
  /** Deletes zero or more records from the `payment_logs` collection */
  deleteFrompayment_logsCollection: Payment_LogsDeleteResponse;
  /** Deletes zero or more records from the `savings` collection */
  deleteFromsavingsCollection: SavingsDeleteResponse;
  /** Deletes zero or more records from the `subscriptions` collection */
  deleteFromsubscriptionsCollection: SubscriptionsDeleteResponse;
  /** Deletes zero or more records from the `wishlist` collection */
  deleteFromwishlistCollection: WishlistDeleteResponse;
  /** Adds one or more `archive` records to the collection */
  insertIntoarchiveCollection?: Maybe<ArchiveInsertResponse>;
  /** Adds one or more `categories` records to the collection */
  insertIntocategoriesCollection?: Maybe<CategoriesInsertResponse>;
  /** Adds one or more `daily_expenses` records to the collection */
  insertIntodaily_expensesCollection?: Maybe<Daily_ExpensesInsertResponse>;
  /** Adds one or more `emis` records to the collection */
  insertIntoemisCollection?: Maybe<EmisInsertResponse>;
  /** Adds one or more `monthly_records` records to the collection */
  insertIntomonthly_recordsCollection?: Maybe<Monthly_RecordsInsertResponse>;
  /** Adds one or more `payment_logs` records to the collection */
  insertIntopayment_logsCollection?: Maybe<Payment_LogsInsertResponse>;
  /** Adds one or more `savings` records to the collection */
  insertIntosavingsCollection?: Maybe<SavingsInsertResponse>;
  /** Adds one or more `subscriptions` records to the collection */
  insertIntosubscriptionsCollection?: Maybe<SubscriptionsInsertResponse>;
  /** Adds one or more `wishlist` records to the collection */
  insertIntowishlistCollection?: Maybe<WishlistInsertResponse>;
  /** Updates zero or more records in the `archive` collection */
  updatearchiveCollection: ArchiveUpdateResponse;
  /** Updates zero or more records in the `categories` collection */
  updatecategoriesCollection: CategoriesUpdateResponse;
  /** Updates zero or more records in the `daily_expenses` collection */
  updatedaily_expensesCollection: Daily_ExpensesUpdateResponse;
  /** Updates zero or more records in the `emis` collection */
  updateemisCollection: EmisUpdateResponse;
  /** Updates zero or more records in the `monthly_records` collection */
  updatemonthly_recordsCollection: Monthly_RecordsUpdateResponse;
  /** Updates zero or more records in the `payment_logs` collection */
  updatepayment_logsCollection: Payment_LogsUpdateResponse;
  /** Updates zero or more records in the `savings` collection */
  updatesavingsCollection: SavingsUpdateResponse;
  /** Updates zero or more records in the `subscriptions` collection */
  updatesubscriptionsCollection: SubscriptionsUpdateResponse;
  /** Updates zero or more records in the `wishlist` collection */
  updatewishlistCollection: WishlistUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationAdd_Wishlist_Item_To_ExpensesArgs = {
  p_expense_date?: InputMaybe<Scalars['Date']['input']>;
  p_wishlist_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationDeleteFromarchiveCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ArchiveFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromcategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoriesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromdaily_ExpensesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Daily_ExpensesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromemisCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EmisFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrommonthly_RecordsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Monthly_RecordsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrompayment_LogsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Payment_LogsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromsavingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SavingsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromsubscriptionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SubscriptionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromwishlistCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<WishlistFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoarchiveCollectionArgs = {
  objects: Array<ArchiveInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntocategoriesCollectionArgs = {
  objects: Array<CategoriesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntodaily_ExpensesCollectionArgs = {
  objects: Array<Daily_ExpensesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoemisCollectionArgs = {
  objects: Array<EmisInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntomonthly_RecordsCollectionArgs = {
  objects: Array<Monthly_RecordsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntopayment_LogsCollectionArgs = {
  objects: Array<Payment_LogsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntosavingsCollectionArgs = {
  objects: Array<SavingsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntosubscriptionsCollectionArgs = {
  objects: Array<SubscriptionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntowishlistCollectionArgs = {
  objects: Array<WishlistInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatearchiveCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ArchiveFilter>;
  set: ArchiveUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatecategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoriesFilter>;
  set: CategoriesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatedaily_ExpensesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Daily_ExpensesFilter>;
  set: Daily_ExpensesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateemisCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EmisFilter>;
  set: EmisUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatemonthly_RecordsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Monthly_RecordsFilter>;
  set: Monthly_RecordsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatepayment_LogsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Payment_LogsFilter>;
  set: Payment_LogsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatesavingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SavingsFilter>;
  set: SavingsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatesubscriptionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SubscriptionsFilter>;
  set: SubscriptionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatewishlistCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<WishlistFilter>;
  set: WishlistUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `archive` */
  archiveCollection?: Maybe<ArchiveConnection>;
  /** A pagable collection of type `categories` */
  categoriesCollection?: Maybe<CategoriesConnection>;
  current_dummy_user_id?: Maybe<Scalars['UUID']['output']>;
  /** A pagable collection of type `daily_expenses` */
  daily_expensesCollection?: Maybe<Daily_ExpensesConnection>;
  /** A pagable collection of type `emis` */
  emisCollection?: Maybe<EmisConnection>;
  /** A pagable collection of type `monthly_records` */
  monthly_recordsCollection?: Maybe<Monthly_RecordsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `payment_logs` */
  payment_logsCollection?: Maybe<Payment_LogsConnection>;
  /** A pagable collection of type `savings` */
  savingsCollection?: Maybe<SavingsConnection>;
  /** A pagable collection of type `subscriptions` */
  subscriptionsCollection?: Maybe<SubscriptionsConnection>;
  /** A pagable collection of type `wishlist` */
  wishlistCollection?: Maybe<WishlistConnection>;
};


/** The root type for querying data */
export type QueryArchiveCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ArchiveFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ArchiveOrderBy>>;
};


/** The root type for querying data */
export type QueryCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CategoriesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/** The root type for querying data */
export type QueryDaily_ExpensesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Daily_ExpensesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Daily_ExpensesOrderBy>>;
};


/** The root type for querying data */
export type QueryEmisCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<EmisFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EmisOrderBy>>;
};


/** The root type for querying data */
export type QueryMonthly_RecordsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Monthly_RecordsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Monthly_RecordsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryPayment_LogsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Payment_LogsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Payment_LogsOrderBy>>;
};


/** The root type for querying data */
export type QuerySavingsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<SavingsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SavingsOrderBy>>;
};


/** The root type for querying data */
export type QuerySubscriptionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<SubscriptionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
};


/** The root type for querying data */
export type QueryWishlistCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<WishlistFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WishlistOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Archive = Node & {
  __typename?: 'archive';
  archived_at: Scalars['Datetime']['output'];
  entity_data: Scalars['JSON']['output'];
  entity_id: Scalars['UUID']['output'];
  entity_type: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  reason: Scalars['String']['output'];
  user_id: Scalars['UUID']['output'];
};

export type ArchiveConnection = {
  __typename?: 'archiveConnection';
  edges: Array<ArchiveEdge>;
  pageInfo: PageInfo;
};

export type ArchiveDeleteResponse = {
  __typename?: 'archiveDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Archive>;
};

export type ArchiveEdge = {
  __typename?: 'archiveEdge';
  cursor: Scalars['String']['output'];
  node: Archive;
};

export type ArchiveFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ArchiveFilter>>;
  archived_at?: InputMaybe<DatetimeFilter>;
  entity_id?: InputMaybe<UuidFilter>;
  entity_type?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ArchiveFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ArchiveFilter>>;
  reason?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type ArchiveInsertInput = {
  archived_at?: InputMaybe<Scalars['Datetime']['input']>;
  entity_data?: InputMaybe<Scalars['JSON']['input']>;
  entity_id?: InputMaybe<Scalars['UUID']['input']>;
  entity_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type ArchiveInsertResponse = {
  __typename?: 'archiveInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Archive>;
};

export type ArchiveOrderBy = {
  archived_at?: InputMaybe<OrderByDirection>;
  entity_id?: InputMaybe<OrderByDirection>;
  entity_type?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  reason?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type ArchiveUpdateInput = {
  archived_at?: InputMaybe<Scalars['Datetime']['input']>;
  entity_data?: InputMaybe<Scalars['JSON']['input']>;
  entity_id?: InputMaybe<Scalars['UUID']['input']>;
  entity_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type ArchiveUpdateResponse = {
  __typename?: 'archiveUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Archive>;
};

export type Categories = Node & {
  __typename?: 'categories';
  color?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  daily_expensesCollection?: Maybe<Daily_ExpensesConnection>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  is_system: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
  wishlistCollection?: Maybe<WishlistConnection>;
};


export type CategoriesDaily_ExpensesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Daily_ExpensesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Daily_ExpensesOrderBy>>;
};


export type CategoriesWishlistCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<WishlistFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WishlistOrderBy>>;
};

export type CategoriesConnection = {
  __typename?: 'categoriesConnection';
  edges: Array<CategoriesEdge>;
  pageInfo: PageInfo;
};

export type CategoriesDeleteResponse = {
  __typename?: 'categoriesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type CategoriesEdge = {
  __typename?: 'categoriesEdge';
  cursor: Scalars['String']['output'];
  node: Categories;
};

export type CategoriesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<CategoriesFilter>>;
  color?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  icon?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  is_system?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<CategoriesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<CategoriesFilter>>;
  type?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type CategoriesInsertInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_system?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type CategoriesInsertResponse = {
  __typename?: 'categoriesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type CategoriesOrderBy = {
  color?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  icon?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_system?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type CategoriesUpdateInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_system?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type CategoriesUpdateResponse = {
  __typename?: 'categoriesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type Daily_Expenses = Node & {
  __typename?: 'daily_expenses';
  amount: Scalars['BigFloat']['output'];
  categories?: Maybe<Categories>;
  category_id?: Maybe<Scalars['UUID']['output']>;
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expense_date: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_id: Scalars['UUID']['output'];
  wishlist?: Maybe<Wishlist>;
  wishlistCollection?: Maybe<WishlistConnection>;
  wishlist_id?: Maybe<Scalars['UUID']['output']>;
  year_month: Scalars['Date']['output'];
};


export type Daily_ExpensesWishlistCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<WishlistFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WishlistOrderBy>>;
};

export type Daily_ExpensesConnection = {
  __typename?: 'daily_expensesConnection';
  edges: Array<Daily_ExpensesEdge>;
  pageInfo: PageInfo;
};

export type Daily_ExpensesDeleteResponse = {
  __typename?: 'daily_expensesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Daily_Expenses>;
};

export type Daily_ExpensesEdge = {
  __typename?: 'daily_expensesEdge';
  cursor: Scalars['String']['output'];
  node: Daily_Expenses;
};

export type Daily_ExpensesFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Daily_ExpensesFilter>>;
  category_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  expense_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Daily_ExpensesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Daily_ExpensesFilter>>;
  user_id?: InputMaybe<UuidFilter>;
  wishlist_id?: InputMaybe<UuidFilter>;
  year_month?: InputMaybe<DateFilter>;
};

export type Daily_ExpensesInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  category_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expense_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  wishlist_id?: InputMaybe<Scalars['UUID']['input']>;
  year_month?: InputMaybe<Scalars['Date']['input']>;
};

export type Daily_ExpensesInsertResponse = {
  __typename?: 'daily_expensesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Daily_Expenses>;
};

export type Daily_ExpensesOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  category_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  expense_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  wishlist_id?: InputMaybe<OrderByDirection>;
  year_month?: InputMaybe<OrderByDirection>;
};

export type Daily_ExpensesUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  category_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expense_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  wishlist_id?: InputMaybe<Scalars['UUID']['input']>;
  year_month?: InputMaybe<Scalars['Date']['input']>;
};

export type Daily_ExpensesUpdateResponse = {
  __typename?: 'daily_expensesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Daily_Expenses>;
};

export type Emis = Node & {
  __typename?: 'emis';
  bank?: Maybe<Scalars['String']['output']>;
  billing_day?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Datetime']['output'];
  down_payment?: Maybe<Scalars['BigFloat']['output']>;
  emi_amount: Scalars['BigFloat']['output'];
  end_date: Scalars['Date']['output'];
  id: Scalars['UUID']['output'];
  last_paid_on?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  next_due_date?: Maybe<Scalars['Date']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  payments_made: Scalars['Int']['output'];
  start_date: Scalars['Date']['output'];
  status: Scalars['String']['output'];
  total_amount?: Maybe<Scalars['BigFloat']['output']>;
  total_payments?: Maybe<Scalars['Int']['output']>;
  user_id: Scalars['UUID']['output'];
};

export type EmisConnection = {
  __typename?: 'emisConnection';
  edges: Array<EmisEdge>;
  pageInfo: PageInfo;
};

export type EmisDeleteResponse = {
  __typename?: 'emisDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Emis>;
};

export type EmisEdge = {
  __typename?: 'emisEdge';
  cursor: Scalars['String']['output'];
  node: Emis;
};

export type EmisFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<EmisFilter>>;
  bank?: InputMaybe<StringFilter>;
  billing_day?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  down_payment?: InputMaybe<BigFloatFilter>;
  emi_amount?: InputMaybe<BigFloatFilter>;
  end_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<UuidFilter>;
  last_paid_on?: InputMaybe<DateFilter>;
  name?: InputMaybe<StringFilter>;
  next_due_date?: InputMaybe<DateFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<EmisFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<EmisFilter>>;
  payments_made?: InputMaybe<IntFilter>;
  start_date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  total_amount?: InputMaybe<BigFloatFilter>;
  total_payments?: InputMaybe<IntFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type EmisInsertInput = {
  bank?: InputMaybe<Scalars['String']['input']>;
  billing_day?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  down_payment?: InputMaybe<Scalars['BigFloat']['input']>;
  emi_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_paid_on?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_due_date?: InputMaybe<Scalars['Date']['input']>;
  payments_made?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  total_payments?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type EmisInsertResponse = {
  __typename?: 'emisInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Emis>;
};

export type EmisOrderBy = {
  bank?: InputMaybe<OrderByDirection>;
  billing_day?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  down_payment?: InputMaybe<OrderByDirection>;
  emi_amount?: InputMaybe<OrderByDirection>;
  end_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  last_paid_on?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  next_due_date?: InputMaybe<OrderByDirection>;
  payments_made?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  total_amount?: InputMaybe<OrderByDirection>;
  total_payments?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type EmisUpdateInput = {
  bank?: InputMaybe<Scalars['String']['input']>;
  billing_day?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  down_payment?: InputMaybe<Scalars['BigFloat']['input']>;
  emi_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_paid_on?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_due_date?: InputMaybe<Scalars['Date']['input']>;
  payments_made?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  total_payments?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type EmisUpdateResponse = {
  __typename?: 'emisUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Emis>;
};

export type Monthly_Records = Node & {
  __typename?: 'monthly_records';
  created_at: Scalars['Datetime']['output'];
  disposable_income?: Maybe<Scalars['BigFloat']['output']>;
  fixed_expense_details?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  remaining_balance?: Maybe<Scalars['BigFloat']['output']>;
  salary_amount?: Maybe<Scalars['BigFloat']['output']>;
  salary_credited_date?: Maybe<Scalars['Date']['output']>;
  savings_amount?: Maybe<Scalars['BigFloat']['output']>;
  total_fixed_expenses?: Maybe<Scalars['BigFloat']['output']>;
  user_id: Scalars['UUID']['output'];
  year_month: Scalars['Date']['output'];
};

export type Monthly_RecordsConnection = {
  __typename?: 'monthly_recordsConnection';
  edges: Array<Monthly_RecordsEdge>;
  pageInfo: PageInfo;
};

export type Monthly_RecordsDeleteResponse = {
  __typename?: 'monthly_recordsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Monthly_Records>;
};

export type Monthly_RecordsEdge = {
  __typename?: 'monthly_recordsEdge';
  cursor: Scalars['String']['output'];
  node: Monthly_Records;
};

export type Monthly_RecordsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Monthly_RecordsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  disposable_income?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Monthly_RecordsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Monthly_RecordsFilter>>;
  remaining_balance?: InputMaybe<BigFloatFilter>;
  salary_amount?: InputMaybe<BigFloatFilter>;
  salary_credited_date?: InputMaybe<DateFilter>;
  savings_amount?: InputMaybe<BigFloatFilter>;
  total_fixed_expenses?: InputMaybe<BigFloatFilter>;
  user_id?: InputMaybe<UuidFilter>;
  year_month?: InputMaybe<DateFilter>;
};

export type Monthly_RecordsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  disposable_income?: InputMaybe<Scalars['BigFloat']['input']>;
  fixed_expense_details?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  remaining_balance?: InputMaybe<Scalars['BigFloat']['input']>;
  salary_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  salary_credited_date?: InputMaybe<Scalars['Date']['input']>;
  savings_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  total_fixed_expenses?: InputMaybe<Scalars['BigFloat']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  year_month?: InputMaybe<Scalars['Date']['input']>;
};

export type Monthly_RecordsInsertResponse = {
  __typename?: 'monthly_recordsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Monthly_Records>;
};

export type Monthly_RecordsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  disposable_income?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  remaining_balance?: InputMaybe<OrderByDirection>;
  salary_amount?: InputMaybe<OrderByDirection>;
  salary_credited_date?: InputMaybe<OrderByDirection>;
  savings_amount?: InputMaybe<OrderByDirection>;
  total_fixed_expenses?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  year_month?: InputMaybe<OrderByDirection>;
};

export type Monthly_RecordsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  disposable_income?: InputMaybe<Scalars['BigFloat']['input']>;
  fixed_expense_details?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  remaining_balance?: InputMaybe<Scalars['BigFloat']['input']>;
  salary_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  salary_credited_date?: InputMaybe<Scalars['Date']['input']>;
  savings_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  total_fixed_expenses?: InputMaybe<Scalars['BigFloat']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  year_month?: InputMaybe<Scalars['Date']['input']>;
};

export type Monthly_RecordsUpdateResponse = {
  __typename?: 'monthly_recordsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Monthly_Records>;
};

export type Payment_Logs = Node & {
  __typename?: 'payment_logs';
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  occurred_on: Scalars['Date']['output'];
  ref_id: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  user_id: Scalars['UUID']['output'];
};

export type Payment_LogsConnection = {
  __typename?: 'payment_logsConnection';
  edges: Array<Payment_LogsEdge>;
  pageInfo: PageInfo;
};

export type Payment_LogsDeleteResponse = {
  __typename?: 'payment_logsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Payment_Logs>;
};

export type Payment_LogsEdge = {
  __typename?: 'payment_logsEdge';
  cursor: Scalars['String']['output'];
  node: Payment_Logs;
};

export type Payment_LogsFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Payment_LogsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Payment_LogsFilter>;
  occurred_on?: InputMaybe<DateFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Payment_LogsFilter>>;
  ref_id?: InputMaybe<UuidFilter>;
  type?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Payment_LogsInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  occurred_on?: InputMaybe<Scalars['Date']['input']>;
  ref_id?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Payment_LogsInsertResponse = {
  __typename?: 'payment_logsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Payment_Logs>;
};

export type Payment_LogsOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  occurred_on?: InputMaybe<OrderByDirection>;
  ref_id?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Payment_LogsUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  occurred_on?: InputMaybe<Scalars['Date']['input']>;
  ref_id?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Payment_LogsUpdateResponse = {
  __typename?: 'payment_logsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Payment_Logs>;
};

export type Savings = Node & {
  __typename?: 'savings';
  created_at: Scalars['Datetime']['output'];
  destination_bank?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['Date']['output']>;
  id: Scalars['UUID']['output'];
  last_transferred_on?: Maybe<Scalars['Date']['output']>;
  monthly_amount: Scalars['BigFloat']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  pause_requested_on?: Maybe<Scalars['Date']['output']>;
  resume_requested_on?: Maybe<Scalars['Date']['output']>;
  source_bank?: Maybe<Scalars['String']['output']>;
  start_date: Scalars['Date']['output'];
  status: Scalars['String']['output'];
  target_months?: Maybe<Scalars['Int']['output']>;
  transfers_made: Scalars['Int']['output'];
  user_id: Scalars['UUID']['output'];
};

export type SavingsConnection = {
  __typename?: 'savingsConnection';
  edges: Array<SavingsEdge>;
  pageInfo: PageInfo;
};

export type SavingsDeleteResponse = {
  __typename?: 'savingsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Savings>;
};

export type SavingsEdge = {
  __typename?: 'savingsEdge';
  cursor: Scalars['String']['output'];
  node: Savings;
};

export type SavingsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<SavingsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  destination_bank?: InputMaybe<StringFilter>;
  end_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<UuidFilter>;
  last_transferred_on?: InputMaybe<DateFilter>;
  monthly_amount?: InputMaybe<BigFloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<SavingsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<SavingsFilter>>;
  pause_requested_on?: InputMaybe<DateFilter>;
  resume_requested_on?: InputMaybe<DateFilter>;
  source_bank?: InputMaybe<StringFilter>;
  start_date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  target_months?: InputMaybe<IntFilter>;
  transfers_made?: InputMaybe<IntFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type SavingsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  destination_bank?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_transferred_on?: InputMaybe<Scalars['Date']['input']>;
  monthly_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pause_requested_on?: InputMaybe<Scalars['Date']['input']>;
  resume_requested_on?: InputMaybe<Scalars['Date']['input']>;
  source_bank?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  target_months?: InputMaybe<Scalars['Int']['input']>;
  transfers_made?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type SavingsInsertResponse = {
  __typename?: 'savingsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Savings>;
};

export type SavingsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  destination_bank?: InputMaybe<OrderByDirection>;
  end_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  last_transferred_on?: InputMaybe<OrderByDirection>;
  monthly_amount?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  pause_requested_on?: InputMaybe<OrderByDirection>;
  resume_requested_on?: InputMaybe<OrderByDirection>;
  source_bank?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  target_months?: InputMaybe<OrderByDirection>;
  transfers_made?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type SavingsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  destination_bank?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_transferred_on?: InputMaybe<Scalars['Date']['input']>;
  monthly_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pause_requested_on?: InputMaybe<Scalars['Date']['input']>;
  resume_requested_on?: InputMaybe<Scalars['Date']['input']>;
  source_bank?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  target_months?: InputMaybe<Scalars['Int']['input']>;
  transfers_made?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type SavingsUpdateResponse = {
  __typename?: 'savingsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Savings>;
};

export type Subscriptions = Node & {
  __typename?: 'subscriptions';
  amount: Scalars['BigFloat']['output'];
  bank?: Maybe<Scalars['String']['output']>;
  billing_day?: Maybe<Scalars['Int']['output']>;
  cadence: Scalars['String']['output'];
  created_at: Scalars['Datetime']['output'];
  end_date?: Maybe<Scalars['Date']['output']>;
  id: Scalars['UUID']['output'];
  last_paid_on?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  next_due_date?: Maybe<Scalars['Date']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  start_date: Scalars['Date']['output'];
  status: Scalars['String']['output'];
  user_id: Scalars['UUID']['output'];
};

export type SubscriptionsConnection = {
  __typename?: 'subscriptionsConnection';
  edges: Array<SubscriptionsEdge>;
  pageInfo: PageInfo;
};

export type SubscriptionsDeleteResponse = {
  __typename?: 'subscriptionsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type SubscriptionsEdge = {
  __typename?: 'subscriptionsEdge';
  cursor: Scalars['String']['output'];
  node: Subscriptions;
};

export type SubscriptionsFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<SubscriptionsFilter>>;
  bank?: InputMaybe<StringFilter>;
  billing_day?: InputMaybe<IntFilter>;
  cadence?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  end_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<UuidFilter>;
  last_paid_on?: InputMaybe<DateFilter>;
  name?: InputMaybe<StringFilter>;
  next_due_date?: InputMaybe<DateFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<SubscriptionsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<SubscriptionsFilter>>;
  start_date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type SubscriptionsInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  bank?: InputMaybe<Scalars['String']['input']>;
  billing_day?: InputMaybe<Scalars['Int']['input']>;
  cadence?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_paid_on?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_due_date?: InputMaybe<Scalars['Date']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type SubscriptionsInsertResponse = {
  __typename?: 'subscriptionsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type SubscriptionsOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  bank?: InputMaybe<OrderByDirection>;
  billing_day?: InputMaybe<OrderByDirection>;
  cadence?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  end_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  last_paid_on?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  next_due_date?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type SubscriptionsUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  bank?: InputMaybe<Scalars['String']['input']>;
  billing_day?: InputMaybe<Scalars['Int']['input']>;
  cadence?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  last_paid_on?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_due_date?: InputMaybe<Scalars['Date']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type SubscriptionsUpdateResponse = {
  __typename?: 'subscriptionsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Subscriptions>;
};

export type Wishlist = Node & {
  __typename?: 'wishlist';
  categories?: Maybe<Categories>;
  category_id?: Maybe<Scalars['UUID']['output']>;
  created_at: Scalars['Datetime']['output'];
  daily_expenses?: Maybe<Daily_Expenses>;
  daily_expensesCollection?: Maybe<Daily_ExpensesConnection>;
  estimated_amount?: Maybe<Scalars['BigFloat']['output']>;
  expense_id?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  is_purchased: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  priority: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['UUID']['output'];
};


export type WishlistDaily_ExpensesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Daily_ExpensesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Daily_ExpensesOrderBy>>;
};

export type WishlistConnection = {
  __typename?: 'wishlistConnection';
  edges: Array<WishlistEdge>;
  pageInfo: PageInfo;
};

export type WishlistDeleteResponse = {
  __typename?: 'wishlistDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Wishlist>;
};

export type WishlistEdge = {
  __typename?: 'wishlistEdge';
  cursor: Scalars['String']['output'];
  node: Wishlist;
};

export type WishlistFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<WishlistFilter>>;
  category_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  estimated_amount?: InputMaybe<BigFloatFilter>;
  expense_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  is_purchased?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<WishlistFilter>;
  notes?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<WishlistFilter>>;
  priority?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type WishlistInsertInput = {
  category_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  estimated_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  expense_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_purchased?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type WishlistInsertResponse = {
  __typename?: 'wishlistInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Wishlist>;
};

export type WishlistOrderBy = {
  category_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  estimated_amount?: InputMaybe<OrderByDirection>;
  expense_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_purchased?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  priority?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type WishlistUpdateInput = {
  category_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  estimated_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  expense_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  is_purchased?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type WishlistUpdateResponse = {
  __typename?: 'wishlistUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Wishlist>;
};

export type GetArchiveQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetArchiveQuery = { __typename: 'Query', archiveCollection?: { __typename: 'archiveConnection', edges: Array<{ __typename: 'archiveEdge', node: { __typename: 'archive', id: string, entity_type: string, entity_id: string, entity_data: Record<string, unknown>, reason: string, archived_at: string } }> } | null };

export type GetCategoriesManageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetCategoriesManageQuery = { __typename: 'Query', categoriesCollection?: { __typename: 'categoriesConnection', edges: Array<{ __typename: 'categoriesEdge', node: { __typename: 'categories', id: string, name: string, type: string, is_system: boolean } }> } | null };

export type InsertCategoryMutationVariables = Exact<{
  input: CategoriesInsertInput;
}>;


export type InsertCategoryMutation = { __typename: 'Mutation', insertIntocategoriesCollection?: { __typename: 'categoriesInsertResponse', records: Array<{ __typename: 'categories', id: string, name: string }> } | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: CategoriesUpdateInput;
}>;


export type UpdateCategoryMutation = { __typename: 'Mutation', updatecategoriesCollection: { __typename: 'categoriesUpdateResponse', records: Array<{ __typename: 'categories', id: string }> } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteCategoryMutation = { __typename: 'Mutation', deleteFromcategoriesCollection: { __typename: 'categoriesDeleteResponse', records: Array<{ __typename: 'categories', id: string }> } };

export type GetDashboardQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  yearMonth: Scalars['Date']['input'];
}>;


export type GetDashboardQuery = { __typename: 'Query', categoriesCollection?: { __typename: 'categoriesConnection', edges: Array<{ __typename: 'categoriesEdge', node: { __typename: 'categories', id: string, name: string, type: string, is_system: boolean } }> } | null, monthly_recordsCollection?: { __typename: 'monthly_recordsConnection', edges: Array<{ __typename: 'monthly_recordsEdge', node: { __typename: 'monthly_records', id: string, year_month: string, salary_amount?: any | null, savings_amount?: any | null, total_fixed_expenses?: any | null, fixed_expense_details?: Record<string, unknown> | null, disposable_income?: any | null, remaining_balance?: any | null } }> } | null, daily_expensesCollection?: { __typename: 'daily_expensesConnection', edges: Array<{ __typename: 'daily_expensesEdge', node: { __typename: 'daily_expenses', id: string, amount: any, expense_date: string, category_id?: string | null, description?: string | null } }> } | null, subscriptionsCollection?: { __typename: 'subscriptionsConnection', edges: Array<{ __typename: 'subscriptionsEdge', node: { __typename: 'subscriptions', id: string, name: string, amount: any, cadence: string, start_date: string, billing_day?: number | null, next_due_date?: string | null, last_paid_on?: string | null, end_date?: string | null, status: string } }> } | null, emisCollection?: { __typename: 'emisConnection', edges: Array<{ __typename: 'emisEdge', node: { __typename: 'emis', id: string, name: string, emi_amount: any, start_date: string, billing_day?: number | null, next_due_date?: string | null, last_paid_on?: string | null, end_date: string, total_payments?: number | null, payments_made: number, status: string } }> } | null, savingsCollection?: { __typename: 'savingsConnection', edges: Array<{ __typename: 'savingsEdge', node: { __typename: 'savings', id: string, name: string, monthly_amount: any, start_date: string } }> } | null };

export type InsertMonthlyRecordMutationVariables = Exact<{
  input: Monthly_RecordsInsertInput;
}>;


export type InsertMonthlyRecordMutation = { __typename: 'Mutation', insertIntomonthly_recordsCollection?: { __typename: 'monthly_recordsInsertResponse', records: Array<{ __typename: 'monthly_records', id: string, year_month: string }> } | null };

export type UpdateMonthlyRecordMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  yearMonth: Scalars['Date']['input'];
  set: Monthly_RecordsUpdateInput;
}>;


export type UpdateMonthlyRecordMutation = { __typename: 'Mutation', updatemonthly_recordsCollection: { __typename: 'monthly_recordsUpdateResponse', records: Array<{ __typename: 'monthly_records', id: string, year_month: string }> } };

export type GetEmisPageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetEmisPageQuery = { __typename: 'Query', emisCollection?: { __typename: 'emisConnection', edges: Array<{ __typename: 'emisEdge', node: { __typename: 'emis', id: string, name: string, emi_amount: any, total_amount?: any | null, down_payment?: any | null, total_payments?: number | null, payments_made: number, start_date: string, end_date: string, billing_day?: number | null, next_due_date?: string | null, last_paid_on?: string | null, bank?: string | null, status: string, created_at: string } }> } | null };

export type InsertEmiPageMutationVariables = Exact<{
  input: EmisInsertInput;
}>;


export type InsertEmiPageMutation = { __typename: 'Mutation', insertIntoemisCollection?: { __typename: 'emisInsertResponse', records: Array<{ __typename: 'emis', id: string, name: string, status: string, next_due_date?: string | null, last_paid_on?: string | null, created_at: string }> } | null };

export type UpdateEmiPageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: EmisUpdateInput;
}>;


export type UpdateEmiPageMutation = { __typename: 'Mutation', updateemisCollection: { __typename: 'emisUpdateResponse', records: Array<{ __typename: 'emis', id: string, status: string, next_due_date?: string | null, last_paid_on?: string | null }> } };

export type DeleteEmiPageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteEmiPageMutation = { __typename: 'Mutation', deleteFromemisCollection: { __typename: 'emisDeleteResponse', records: Array<{ __typename: 'emis', id: string }> } };

export type InsertArchiveEmiMutationVariables = Exact<{
  input: ArchiveInsertInput;
}>;


export type InsertArchiveEmiMutation = { __typename: 'Mutation', insertIntoarchiveCollection?: { __typename: 'archiveInsertResponse', records: Array<{ __typename: 'archive', id: string }> } | null };

export type GetDailyExpensesPageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  yearMonth: Scalars['Date']['input'];
}>;


export type GetDailyExpensesPageQuery = { __typename: 'Query', categoriesCollection?: { __typename: 'categoriesConnection', edges: Array<{ __typename: 'categoriesEdge', node: { __typename: 'categories', id: string, name: string, type: string, is_system: boolean } }> } | null, daily_expensesCollection?: { __typename: 'daily_expensesConnection', edges: Array<{ __typename: 'daily_expensesEdge', node: { __typename: 'daily_expenses', id: string, expense_date: string, amount: any, category_id?: string | null, description?: string | null, created_at: string } }> } | null, monthly_recordsCollection?: { __typename: 'monthly_recordsConnection', edges: Array<{ __typename: 'monthly_recordsEdge', node: { __typename: 'monthly_records', id: string, disposable_income?: any | null, remaining_balance?: any | null } }> } | null };

export type InsertDailyExpensePageMutationVariables = Exact<{
  input: Daily_ExpensesInsertInput;
}>;


export type InsertDailyExpensePageMutation = { __typename: 'Mutation', insertIntodaily_expensesCollection?: { __typename: 'daily_expensesInsertResponse', records: Array<{ __typename: 'daily_expenses', id: string, expense_date: string }> } | null };

export type UpdateDailyExpensePageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: Daily_ExpensesUpdateInput;
}>;


export type UpdateDailyExpensePageMutation = { __typename: 'Mutation', updatedaily_expensesCollection: { __typename: 'daily_expensesUpdateResponse', records: Array<{ __typename: 'daily_expenses', id: string }> } };

export type DeleteDailyExpensePageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteDailyExpensePageMutation = { __typename: 'Mutation', deleteFromdaily_expensesCollection: { __typename: 'daily_expensesDeleteResponse', records: Array<{ __typename: 'daily_expenses', id: string }> } };

export type InsertMonthForExpensesMutationVariables = Exact<{
  input: Monthly_RecordsInsertInput;
}>;


export type InsertMonthForExpensesMutation = { __typename: 'Mutation', insertIntomonthly_recordsCollection?: { __typename: 'monthly_recordsInsertResponse', records: Array<{ __typename: 'monthly_records', id: string, remaining_balance?: any | null }> } | null };

export type GetPaymentLogsPageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  start: Scalars['Date']['input'];
  end: Scalars['Date']['input'];
}>;


export type GetPaymentLogsPageQuery = { __typename: 'Query', payment_logsCollection?: { __typename: 'payment_logsConnection', edges: Array<{ __typename: 'payment_logsEdge', node: { __typename: 'payment_logs', id: string, type: string, ref_id: string, amount: any, occurred_on: string, meta?: Record<string, unknown> | null } }> } | null, daily_expensesCollection?: { __typename: 'daily_expensesConnection', edges: Array<{ __typename: 'daily_expensesEdge', node: { __typename: 'daily_expenses', id: string, description?: string | null, amount: any, expense_date: string } }> } | null };

export type GetSavingsQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetSavingsQuery = { __typename: 'Query', savingsCollection?: { __typename: 'savingsConnection', edges: Array<{ __typename: 'savingsEdge', node: { __typename: 'savings', id: string, name: string, monthly_amount: any, source_bank?: string | null, destination_bank?: string | null, status: string, start_date: string, end_date?: string | null, target_months?: number | null, transfers_made: number, last_transferred_on?: string | null, pause_requested_on?: string | null, resume_requested_on?: string | null, created_at: string } }> } | null };

export type InsertSavingsPageMutationVariables = Exact<{
  input: SavingsInsertInput;
}>;


export type InsertSavingsPageMutation = { __typename: 'Mutation', insertIntosavingsCollection?: { __typename: 'savingsInsertResponse', records: Array<{ __typename: 'savings', id: string, name: string, status: string, created_at: string }> } | null };

export type UpdateSavingsMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: SavingsUpdateInput;
}>;


export type UpdateSavingsMutation = { __typename: 'Mutation', updatesavingsCollection: { __typename: 'savingsUpdateResponse', records: Array<{ __typename: 'savings', id: string }> } };

export type DeleteSavingsMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteSavingsMutation = { __typename: 'Mutation', deleteFromsavingsCollection: { __typename: 'savingsDeleteResponse', records: Array<{ __typename: 'savings', id: string }> } };

export type InsertArchiveSavingsMutationVariables = Exact<{
  input: ArchiveInsertInput;
}>;


export type InsertArchiveSavingsMutation = { __typename: 'Mutation', insertIntoarchiveCollection?: { __typename: 'archiveInsertResponse', records: Array<{ __typename: 'archive', id: string }> } | null };

export type GetSnapshotsQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetSnapshotsQuery = { __typename: 'Query', monthly_recordsCollection?: { __typename: 'monthly_recordsConnection', edges: Array<{ __typename: 'monthly_recordsEdge', node: { __typename: 'monthly_records', id: string, year_month: string, created_at: string, salary_amount?: any | null, total_fixed_expenses?: any | null, disposable_income?: any | null, remaining_balance?: any | null } }> } | null };

export type GetSubscriptionsPageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetSubscriptionsPageQuery = { __typename: 'Query', subscriptionsCollection?: { __typename: 'subscriptionsConnection', edges: Array<{ __typename: 'subscriptionsEdge', node: { __typename: 'subscriptions', id: string, name: string, amount: any, cadence: string, billing_day?: number | null, start_date: string, next_due_date?: string | null, last_paid_on?: string | null, end_date?: string | null, bank?: string | null, status: string, created_at: string } }> } | null };

export type InsertSubscriptionPageMutationVariables = Exact<{
  input: SubscriptionsInsertInput;
}>;


export type InsertSubscriptionPageMutation = { __typename: 'Mutation', insertIntosubscriptionsCollection?: { __typename: 'subscriptionsInsertResponse', records: Array<{ __typename: 'subscriptions', id: string, name: string, status: string, next_due_date?: string | null, last_paid_on?: string | null, end_date?: string | null, created_at: string }> } | null };

export type UpdateSubscriptionPageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: SubscriptionsUpdateInput;
}>;


export type UpdateSubscriptionPageMutation = { __typename: 'Mutation', updatesubscriptionsCollection: { __typename: 'subscriptionsUpdateResponse', records: Array<{ __typename: 'subscriptions', id: string, status: string, next_due_date?: string | null, last_paid_on?: string | null, end_date?: string | null }> } };

export type DeleteSubscriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteSubscriptionMutation = { __typename: 'Mutation', deleteFromsubscriptionsCollection: { __typename: 'subscriptionsDeleteResponse', records: Array<{ __typename: 'subscriptions', id: string }> } };

export type InsertArchiveSubscriptionMutationVariables = Exact<{
  input: ArchiveInsertInput;
}>;


export type InsertArchiveSubscriptionMutation = { __typename: 'Mutation', insertIntoarchiveCollection?: { __typename: 'archiveInsertResponse', records: Array<{ __typename: 'archive', id: string }> } | null };

export type GetCategoriesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetCategoriesQuery = { __typename: 'Query', categoriesCollection?: { __typename: 'categoriesConnection', edges: Array<{ __typename: 'categoriesEdge', node: { __typename: 'categories', id: string, name: string, type: string, is_system: boolean } }> } | null };

export type GetWishlistPageQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetWishlistPageQuery = { __typename: 'Query', categoriesCollection?: { __typename: 'categoriesConnection', edges: Array<{ __typename: 'categoriesEdge', node: { __typename: 'categories', id: string, name: string, type: string, is_system: boolean } }> } | null, wishlistCollection?: { __typename: 'wishlistConnection', edges: Array<{ __typename: 'wishlistEdge', node: { __typename: 'wishlist', id: string, name: string, estimated_amount?: any | null, category_id?: string | null, priority: string, url?: string | null, notes?: string | null, is_purchased: boolean, expense_id?: string | null, created_at: string } }> } | null };

export type InsertWishlistMutationVariables = Exact<{
  input: WishlistInsertInput;
}>;


export type InsertWishlistMutation = { __typename: 'Mutation', insertIntowishlistCollection?: { __typename: 'wishlistInsertResponse', records: Array<{ __typename: 'wishlist', id: string }> } | null };

export type UpdateWishlistMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
  set: WishlistUpdateInput;
}>;


export type UpdateWishlistMutation = { __typename: 'Mutation', updatewishlistCollection: { __typename: 'wishlistUpdateResponse', records: Array<{ __typename: 'wishlist', id: string }> } };

export type DeleteWishlistMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type DeleteWishlistMutation = { __typename: 'Mutation', deleteFromwishlistCollection: { __typename: 'wishlistDeleteResponse', records: Array<{ __typename: 'wishlist', id: string }> } };

export type InsertDailyExpenseDocMutationVariables = Exact<{
  input: Daily_ExpensesInsertInput;
}>;


export type InsertDailyExpenseDocMutation = { __typename: 'Mutation', insertIntodaily_expensesCollection?: { __typename: 'daily_expensesInsertResponse', records: Array<{ __typename: 'daily_expenses', id: string, expense_date: string }> } | null };

export type InsertEmiMutationVariables = Exact<{
  input: EmisInsertInput;
}>;


export type InsertEmiMutation = { __typename: 'Mutation', insertIntoemisCollection?: { __typename: 'emisInsertResponse', records: Array<{ __typename: 'emis', id: string, name: string, status: string, created_at: string }> } | null };

export type InsertSavingsMutationVariables = Exact<{
  input: SavingsInsertInput;
}>;


export type InsertSavingsMutation = { __typename: 'Mutation', insertIntosavingsCollection?: { __typename: 'savingsInsertResponse', records: Array<{ __typename: 'savings', id: string, name: string, status: string, created_at: string }> } | null };

export type InsertSubscriptionMutationVariables = Exact<{
  input: SubscriptionsInsertInput;
}>;


export type InsertSubscriptionMutation = { __typename: 'Mutation', insertIntosubscriptionsCollection?: { __typename: 'subscriptionsInsertResponse', records: Array<{ __typename: 'subscriptions', id: string, name: string, status: string, created_at: string }> } | null };

export type GetDailyExpensesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  yearMonth: Scalars['Date']['input'];
}>;


export type GetDailyExpensesQuery = { __typename: 'Query', daily_expensesCollection?: { __typename: 'daily_expensesConnection', edges: Array<{ __typename: 'daily_expensesEdge', node: { __typename: 'daily_expenses', id: string, expense_date: string, amount: any, category_id?: string | null, description?: string | null, created_at: string } }> } | null };

export type GetEmisQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetEmisQuery = { __typename: 'Query', emisCollection?: { __typename: 'emisConnection', edges: Array<{ __typename: 'emisEdge', node: { __typename: 'emis', id: string, name: string, emi_amount: any, total_amount?: any | null, down_payment?: any | null, start_date: string, end_date: string, billing_day?: number | null, next_due_date?: string | null, bank?: string | null, status: string, created_at: string } }> } | null };

export type GetMonthlyRecordQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  yearMonth: Scalars['Date']['input'];
}>;


export type GetMonthlyRecordQuery = { __typename: 'Query', monthly_recordsCollection?: { __typename: 'monthly_recordsConnection', edges: Array<{ __typename: 'monthly_recordsEdge', node: { __typename: 'monthly_records', id: string, year_month: string, salary_amount?: any | null, savings_amount?: any | null, total_fixed_expenses?: any | null, disposable_income?: any | null, remaining_balance?: any | null, created_at: string } }> } | null };

export type GetSubscriptionsQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type GetSubscriptionsQuery = { __typename: 'Query', subscriptionsCollection?: { __typename: 'subscriptionsConnection', edges: Array<{ __typename: 'subscriptionsEdge', node: { __typename: 'subscriptions', id: string, name: string, amount: any, cadence: string, billing_day?: number | null, start_date: string, next_due_date?: string | null, bank?: string | null, status: string, created_at: string } }> } | null };


export const GetArchiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArchive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"archiveCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"archived_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entity_type"}},{"kind":"Field","name":{"kind":"Name","value":"entity_id"}},{"kind":"Field","name":{"kind":"Name","value":"entity_data"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"archived_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetArchiveQuery, GetArchiveQueryVariables>;
export const GetCategoriesManageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoriesManage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"is_system"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesManageQuery, GetCategoriesManageQueryVariables>;
export const InsertCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"categoriesInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntocategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<InsertCategoryMutation, InsertCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"categoriesUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatecategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromcategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"is_system"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"monthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year_month"}},{"kind":"Field","name":{"kind":"Name","value":"salary_amount"}},{"kind":"Field","name":{"kind":"Name","value":"savings_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_fixed_expenses"}},{"kind":"Field","name":{"kind":"Name","value":"fixed_expense_details"}},{"kind":"Field","name":{"kind":"Name","value":"disposable_income"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_balance"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"daily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"expense_date"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"cadence"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"emisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emi_amount"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"total_payments"}},{"kind":"Field","name":{"kind":"Name","value":"payments_made"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"savingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"active","block":false},{"kind":"StringValue","value":"pausing","block":false}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"monthly_amount"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const InsertMonthlyRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMonthlyRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"monthly_recordsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntomonthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year_month"}}]}}]}}]}}]} as unknown as DocumentNode<InsertMonthlyRecordMutation, InsertMonthlyRecordMutationVariables>;
export const UpdateMonthlyRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMonthlyRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"monthly_recordsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatemonthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year_month"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMonthlyRecordMutation, UpdateMonthlyRecordMutationVariables>;
export const GetEmisPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmisPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"emisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"end_date"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emi_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_amount"}},{"kind":"Field","name":{"kind":"Name","value":"down_payment"}},{"kind":"Field","name":{"kind":"Name","value":"total_payments"}},{"kind":"Field","name":{"kind":"Name","value":"payments_made"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEmisPageQuery, GetEmisPageQueryVariables>;
export const InsertEmiPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertEmiPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"emisInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntoemisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertEmiPageMutation, InsertEmiPageMutationVariables>;
export const UpdateEmiPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEmiPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"emisUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateemisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateEmiPageMutation, UpdateEmiPageMutationVariables>;
export const DeleteEmiPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEmiPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromemisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteEmiPageMutation, DeleteEmiPageMutationVariables>;
export const InsertArchiveEmiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertArchiveEmi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"archiveInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntoarchiveCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertArchiveEmiMutation, InsertArchiveEmiMutationVariables>;
export const GetDailyExpensesPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDailyExpensesPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"is_system"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"daily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"expense_date"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"monthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"disposable_income"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_balance"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDailyExpensesPageQuery, GetDailyExpensesPageQueryVariables>;
export const InsertDailyExpensePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertDailyExpensePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"daily_expensesInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntodaily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}}]}}]}}]}}]} as unknown as DocumentNode<InsertDailyExpensePageMutation, InsertDailyExpensePageMutationVariables>;
export const UpdateDailyExpensePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDailyExpensePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"daily_expensesUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatedaily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDailyExpensePageMutation, UpdateDailyExpensePageMutationVariables>;
export const DeleteDailyExpensePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDailyExpensePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromdaily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteDailyExpensePageMutation, DeleteDailyExpensePageMutationVariables>;
export const InsertMonthForExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMonthForExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"monthly_recordsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntomonthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_balance"}}]}}]}}]}}]} as unknown as DocumentNode<InsertMonthForExpensesMutation, InsertMonthForExpensesMutationVariables>;
export const GetPaymentLogsPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaymentLogsPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"payment_logsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"occurred_on"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"occurred_on"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"ref_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"occurred_on"}},{"kind":"Field","name":{"kind":"Name","value":"meta"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"daily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"expense_date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"expense_date"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPaymentLogsPageQuery, GetPaymentLogsPageQueryVariables>;
export const GetSavingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSavings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"savingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"monthly_amount"}},{"kind":"Field","name":{"kind":"Name","value":"source_bank"}},{"kind":"Field","name":{"kind":"Name","value":"destination_bank"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"target_months"}},{"kind":"Field","name":{"kind":"Name","value":"transfers_made"}},{"kind":"Field","name":{"kind":"Name","value":"last_transferred_on"}},{"kind":"Field","name":{"kind":"Name","value":"pause_requested_on"}},{"kind":"Field","name":{"kind":"Name","value":"resume_requested_on"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSavingsQuery, GetSavingsQueryVariables>;
export const InsertSavingsPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertSavingsPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"savingsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntosavingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertSavingsPageMutation, InsertSavingsPageMutationVariables>;
export const UpdateSavingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSavings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"savingsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatesavingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSavingsMutation, UpdateSavingsMutationVariables>;
export const DeleteSavingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSavings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromsavingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSavingsMutation, DeleteSavingsMutationVariables>;
export const InsertArchiveSavingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertArchiveSavings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"archiveInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntoarchiveCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertArchiveSavingsMutation, InsertArchiveSavingsMutationVariables>;
export const GetSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"monthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year_month"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"salary_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_fixed_expenses"}},{"kind":"Field","name":{"kind":"Name","value":"disposable_income"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_balance"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSnapshotsQuery, GetSnapshotsQueryVariables>;
export const GetSubscriptionsPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubscriptionsPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"cadence"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubscriptionsPageQuery, GetSubscriptionsPageQueryVariables>;
export const InsertSubscriptionPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertSubscriptionPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"subscriptionsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntosubscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertSubscriptionPageMutation, InsertSubscriptionPageMutationVariables>;
export const UpdateSubscriptionPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscriptionPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"subscriptionsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatesubscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"last_paid_on"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionPageMutation, UpdateSubscriptionPageMutationVariables>;
export const DeleteSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromsubscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;
export const InsertArchiveSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertArchiveSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"archiveInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntoarchiveCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertArchiveSubscriptionMutation, InsertArchiveSubscriptionMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"is_system"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetWishlistPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWishlistPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_system"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"is_system"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wishlistCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_amount"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"is_purchased"}},{"kind":"Field","name":{"kind":"Name","value":"expense_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWishlistPageQuery, GetWishlistPageQueryVariables>;
export const InsertWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"wishlistInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntowishlistCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertWishlistMutation, InsertWishlistMutationVariables>;
export const UpdateWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"set"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"wishlistUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updatewishlistCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"set"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWishlistMutation, UpdateWishlistMutationVariables>;
export const DeleteWishlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWishlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteFromwishlistCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWishlistMutation, DeleteWishlistMutationVariables>;
export const InsertDailyExpenseDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertDailyExpenseDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"daily_expensesInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntodaily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}}]}}]}}]}}]} as unknown as DocumentNode<InsertDailyExpenseDocMutation, InsertDailyExpenseDocMutationVariables>;
export const InsertEmiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertEmi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"emisInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntoemisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertEmiMutation, InsertEmiMutationVariables>;
export const InsertSavingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertSavings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"savingsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntosavingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertSavingsMutation, InsertSavingsMutationVariables>;
export const InsertSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"subscriptionsInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"insertIntosubscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"input"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<InsertSubscriptionMutation, InsertSubscriptionMutationVariables>;
export const GetDailyExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDailyExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"daily_expensesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"expense_date"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expense_date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDailyExpensesQuery, GetDailyExpensesQueryVariables>;
export const GetEmisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmis"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"emisCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"end_date"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emi_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_amount"}},{"kind":"Field","name":{"kind":"Name","value":"down_payment"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"end_date"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEmisQuery, GetEmisQueryVariables>;
export const GetMonthlyRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMonthlyRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"monthly_recordsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"year_month"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"yearMonth"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year_month"}},{"kind":"Field","name":{"kind":"Name","value":"salary_amount"}},{"kind":"Field","name":{"kind":"Name","value":"savings_amount"}},{"kind":"Field","name":{"kind":"Name","value":"total_fixed_expenses"}},{"kind":"Field","name":{"kind":"Name","value":"disposable_income"}},{"kind":"Field","name":{"kind":"Name","value":"remaining_balance"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMonthlyRecordQuery, GetMonthlyRecordQueryVariables>;
export const GetSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AscNullsLast"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"DescNullsLast"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"cadence"}},{"kind":"Field","name":{"kind":"Name","value":"billing_day"}},{"kind":"Field","name":{"kind":"Name","value":"start_date"}},{"kind":"Field","name":{"kind":"Name","value":"next_due_date"}},{"kind":"Field","name":{"kind":"Name","value":"bank"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>;