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

module.exports = {
  createUserDevice,
  onCreateUserDevice,
  listUserDevices,
  onUpdateUserDevice,
  userByUsername,
};
