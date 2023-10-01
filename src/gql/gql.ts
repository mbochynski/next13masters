/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetList {\n  categories {\n    slug\n    name\n  }\n}": types.CategoriesGetListDocument,
    "query CollectionsGetList {\n  collections {\n    name\n    slug\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetList($count: Int!, $offset: Int) {\n  products(first: $count, skip: $offset) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListByCategorySlug($count: Int!, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $count\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListByCategorySlugDocument,
    "query ProductsGetListByCollectionSlug($count: Int!, $offset: Int, $collectionSlug: String!) {\n  products(\n    first: $count\n    skip: $offset\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListByCollectionSlugDocument,
    "query ProductsGetListByName($count: Int, $name: String!) {\n  products(first: $count, where: {name_contains: $name}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListByNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    slug\n    name\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($count: Int!, $offset: Int) {\n  products(first: $count, skip: $offset) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCategorySlug($count: Int!, $offset: Int, $categorySlug: String!) {\n  products(\n    first: $count\n    skip: $offset\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCollectionSlug($count: Int!, $offset: Int, $collectionSlug: String!) {\n  products(\n    first: $count\n    skip: $offset\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByName($count: Int, $name: String!) {\n  products(first: $count, where: {name_contains: $name}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListByNameDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
