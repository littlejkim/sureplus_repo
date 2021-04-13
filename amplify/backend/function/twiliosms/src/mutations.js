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

module.exports = {
  createUserDevice,
  onCreateUserDevice,
  listUserDevices,
  onUpdateUserDevice,
};
