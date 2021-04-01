export const createUserDevice = /* GraphQL */ `
  mutation CreateUserDevice(
    $input: CreateUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    createUserDevice(input: $input, condition: $condition) {
      id
      deviceId
      phoneNumber
      userId
      isVerified
      createdAt
      updatedAt
      owner
    }
  }
`;

module.exports = {
  createUserDevice,
};
