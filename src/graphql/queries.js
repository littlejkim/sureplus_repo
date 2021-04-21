/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoscatoBetaUser = /* GraphQL */ `
  query GetMoscatoBetaUser($id: ID!) {
    getMoscatoBetaUser(id: $id) {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      userName
      passCode
      plaidToken {
        bankName
        token
      }
      updatedAt
      createdAt
    }
  }
`;
export const listMoscatoBetaUsers = /* GraphQL */ `
  query ListMoscatoBetaUsers(
    $filter: ModelMoscatoBetaUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoscatoBetaUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        firstName
        lastName
        deviceId
        userName
        passCode
        plaidToken {
          bankName
          token
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUserDevice = /* GraphQL */ `
  query GetUserDevice($id: ID!) {
    getUserDevice(id: $id) {
      id
      phoneNumber
      isVerified
      nickname
      createdAt
      updatedAt
    }
  }
`;
export const listUserDevices = /* GraphQL */ `
  query ListUserDevices(
    $filter: ModelUserDeviceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDevices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phoneNumber
        isVerified
        nickname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $userName: String
    $sortDirection: ModelSortDirection
    $filter: ModelMoscatoBetaUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      userName: $userName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        firstName
        lastName
        deviceId
        userName
        passCode
        plaidToken {
          bankName
          token
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
