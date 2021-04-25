const createUserDevice = /* GraphQL */ `
  mutation CreateUserDevice(
    $input: CreateUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    createUserDevice(input: $input, condition: $condition) {
      id
      phoneNumber
    }
  }
`;

const onCreateUserDevice = /* GraphQL */ `
  subscription OnCreateUserDevice {
    onCreateUserDevice {
      id
      phoneNumber
    }
  }
`;

const listUserDevices = /* GraphQL */ `
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
      }
      nextToken
    }
  }
`;

const onUpdateUserDevice = /* GraphQL */ `
  subscription OnUpdateUserDevice {
    onUpdateUserDevice {
      id
      phoneNumber
      isVerified
    }
  }
`;

const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $userName: String
    $sortDirection: ModelSortDirection
    $filter: ModelMoscatoUserFilterInput
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
      }
      nextToken
    }
  }
`;

const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelMoscatoUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const userByPhone = /* GraphQL */ `
  query UserByPhone(
    $phoneNumber: String
    $sortDirection: ModelSortDirection
    $filter: ModelMoscatoUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByPhone(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        deviceId
        phoneNumber
        userName
        lastName
        firstName
      }
      nextToken
    }
  }
`;

const userByDevice = /* GraphQL */ `
  query UserByDevice(
    $deviceId: String
    $sortDirection: ModelSortDirection
    $filter: ModelMoscatoUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByDevice(
      deviceId: $deviceId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        deviceId
        phoneNumber
        userName
        lastName
        firstName
      }
      nextToken
    }
  }
`;

module.exports = {
  createUserDevice,
  onCreateUserDevice,
  listUserDevices,
  onUpdateUserDevice,
  userByUsername,
  userByEmail,
  userByDevice,
  userByPhone,
};
