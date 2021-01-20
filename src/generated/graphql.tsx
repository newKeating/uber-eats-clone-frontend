import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type DishChoice = {
  __typename?: 'DishChoice';
  name: Scalars['String'];
  extra?: Maybe<Scalars['Int']>;
};

export type DishOption = {
  __typename?: 'DishOption';
  name: Scalars['String'];
  choices?: Maybe<Array<DishChoice>>;
  extra?: Maybe<Scalars['Int']>;
};

export type Dish = {
  __typename?: 'Dish';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['Int'];
  photo?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  restaurant: Restaurant;
  options?: Maybe<Array<DishOption>>;
};


export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  name: Scalars['String'];
  choice?: Maybe<Scalars['String']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  dish: Dish;
  options?: Maybe<Array<OrderItemOption>>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  restaurant?: Maybe<Restaurant>;
  items: Array<OrderItem>;
  total?: Maybe<Scalars['Float']>;
  status: OrderStatus;
};

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  coverImg?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  restaurants: Array<Restaurant>;
  restaurantCount: Scalars['Int'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  coverImg: Scalars['String'];
  address: Scalars['String'];
  category?: Maybe<Category>;
  owner: User;
  menu: Array<Dish>;
  orders: Array<Order>;
  isPromoted: Scalars['Boolean'];
  promotedUntil?: Maybe<Scalars['DateTime']>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  transactionId: Scalars['String'];
  user: User;
  restaurant: Restaurant;
  restaurantId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  verified: Scalars['Boolean'];
  restaurants: Array<Restaurant>;
  orders: Array<Order>;
  rides: Array<Order>;
  payments: Array<Payment>;
};

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery'
}

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProfileOutput = {
  __typename?: 'EditProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantOutput = {
  __typename?: 'CreateRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteRestaurantOutput = {
  __typename?: 'DeleteRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditRestaurantOutput = {
  __typename?: 'EditRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type AllCategoriesOutput = {
  __typename?: 'AllCategoriesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  categories?: Maybe<Array<Category>>;
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  category?: Maybe<Category>;
};

export type RestaurantsOutput = {
  __typename?: 'RestaurantsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Restaurant>>;
};

export type RestaurantOutput = {
  __typename?: 'RestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Restaurant>;
};

export type SearchRestaurantOutput = {
  __typename?: 'SearchRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
};

export type CreateDishOutput = {
  __typename?: 'CreateDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditDishOutput = {
  __typename?: 'EditDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDishOutput = {
  __typename?: 'DeleteDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditOrderOutput = {
  __typename?: 'EditOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrderOutput = {
  __typename?: 'GetOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  order?: Maybe<Order>;
};

export type GetOrdersOutput = {
  __typename?: 'GetOrdersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orders?: Maybe<Array<Order>>;
};

export type TakeOrderOutput = {
  __typename?: 'TakeOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePaymentOutput = {
  __typename?: 'CreatePaymentOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetPaymentsOutput = {
  __typename?: 'GetPaymentsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments?: Maybe<Array<Payment>>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  userProfile: UserProfileOutput;
  restaurants: RestaurantsOutput;
  restaurant: RestaurantOutput;
  searchRestaurant: SearchRestaurantOutput;
  allCategories: AllCategoriesOutput;
  category: CategoryOutput;
  getOrders: GetOrdersOutput;
  getOrder: GetOrderOutput;
  getPayments: GetPaymentsOutput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Float'];
};


export type QueryRestaurantsArgs = {
  input: RestaurantsInput;
};


export type QueryRestaurantArgs = {
  input: RestaurantInput;
};


export type QuerySearchRestaurantArgs = {
  input: SearchRestaurantInput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};

export type RestaurantsInput = {
  page?: Maybe<Scalars['Int']>;
};

export type RestaurantInput = {
  restaurantId: Scalars['Int'];
};

export type SearchRestaurantInput = {
  page?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};

export type CategoryInput = {
  page?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
};

export type GetOrdersInput = {
  status?: Maybe<OrderStatus>;
};

export type GetOrderInput = {
  id: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  login: LoginOutput;
  editProfile: EditProfileOutput;
  verifyEmail: VerifyEmailOutput;
  createRestaurant: CreateRestaurantOutput;
  editRestaurant: EditRestaurantOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  createDish: CreateDishOutput;
  editDish: EditDishOutput;
  deleteDish: DeleteDishOutput;
  createOrder: CreateOrderOutput;
  editOrder: EditOrderOutput;
  takeOrder: TakeOrderOutput;
  createPayment: CreatePaymentOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationEditRestaurantArgs = {
  input: EditRestaurantInput;
};


export type MutationDeleteRestaurantArgs = {
  input: DeleteRestaurantInput;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EditProfileInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type CreateRestaurantInput = {
  name: Scalars['String'];
  coverImg: Scalars['String'];
  address: Scalars['String'];
  categoryName: Scalars['String'];
};

export type EditRestaurantInput = {
  name?: Maybe<Scalars['String']>;
  coverImg?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
};

export type DeleteRestaurantInput = {
  restaurantId: Scalars['Float'];
};

export type CreateDishInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  description: Scalars['String'];
  options?: Maybe<Array<DishOptionInputType>>;
  restaurantId: Scalars['Int'];
};

export type DishOptionInputType = {
  name: Scalars['String'];
  choices?: Maybe<Array<DishChoiceInputType>>;
  extra?: Maybe<Scalars['Int']>;
};

export type DishChoiceInputType = {
  name: Scalars['String'];
  extra?: Maybe<Scalars['Int']>;
};

export type EditDishInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  options?: Maybe<Array<DishOptionInputType>>;
  dishId: Scalars['Int'];
};

export type DeleteDishInput = {
  dishId: Scalars['Int'];
};

export type CreateOrderInput = {
  restaurantId: Scalars['Int'];
  items: Array<CreateOrderItemInput>;
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int'];
  options?: Maybe<Array<OrderItemOptionInputType>>;
};

export type OrderItemOptionInputType = {
  name: Scalars['String'];
  choice?: Maybe<Scalars['String']>;
};

export type EditOrderInput = {
  id: Scalars['Float'];
  status: OrderStatus;
};

export type TakeOrderInput = {
  id: Scalars['Float'];
};

export type CreatePaymentInput = {
  transactionId: Scalars['String'];
  restaurantId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  pendingOrders: Order;
  cookedOrders: Order;
  orderUpdates: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type OrderUpdatesInput = {
  id: Scalars['Float'];
};

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'CreateAccountOutput' }
    & Pick<CreateAccountOutput, 'ok' | 'error'>
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginOutput' }
    & Pick<LoginOutput, 'token' | 'ok' | 'error'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);


export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    ok
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;