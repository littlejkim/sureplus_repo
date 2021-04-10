const createUserDevice = /* GraphQL */ `
  mutation CreateUserDevice(
    $input: CreateUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    createUserDevice(input: $input, condition: $condition) {
      deviceId
      phoneNumber
    }
  }
`;

const onCreateUserDevice = /* GraphQL */ `
  subscription OnCreateUserDevice {
    onCreateUserDevice {
      deviceId
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
        deviceId
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
      deviceId
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
