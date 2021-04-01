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

module.exports = {
  createUserDevice,
};
