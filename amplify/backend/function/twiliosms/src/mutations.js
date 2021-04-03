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
  subscription OnCreateUserDevice($owner: String) {
    onCreateUserDevice(owner: $owner) {
      deviceId
      phoneNumber
    }
  }
`;

module.exports = {
  createUserDevice,
  onCreateUserDevice,
};
