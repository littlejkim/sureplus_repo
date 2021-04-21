/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMoscatoBetaUser = /* GraphQL */ `
  mutation CreateMoscatoBetaUser(
    $input: CreateMoscatoBetaUserInput!
    $condition: ModelMoscatoBetaUserConditionInput
  ) {
    createMoscatoBetaUser(input: $input, condition: $condition) {
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
export const updateMoscatoBetaUser = /* GraphQL */ `
  mutation UpdateMoscatoBetaUser(
    $input: UpdateMoscatoBetaUserInput!
    $condition: ModelMoscatoBetaUserConditionInput
  ) {
    updateMoscatoBetaUser(input: $input, condition: $condition) {
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
export const deleteMoscatoBetaUser = /* GraphQL */ `
  mutation DeleteMoscatoBetaUser(
    $input: DeleteMoscatoBetaUserInput!
    $condition: ModelMoscatoBetaUserConditionInput
  ) {
    deleteMoscatoBetaUser(input: $input, condition: $condition) {
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
export const createUserDevice = /* GraphQL */ `
  mutation CreateUserDevice(
    $input: CreateUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    createUserDevice(input: $input, condition: $condition) {
      id
      phoneNumber
      isVerified
      nickname
      createdAt
      updatedAt
    }
  }
`;
export const updateUserDevice = /* GraphQL */ `
  mutation UpdateUserDevice(
    $input: UpdateUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    updateUserDevice(input: $input, condition: $condition) {
      id
      phoneNumber
      isVerified
      nickname
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserDevice = /* GraphQL */ `
  mutation DeleteUserDevice(
    $input: DeleteUserDeviceInput!
    $condition: ModelUserDeviceConditionInput
  ) {
    deleteUserDevice(input: $input, condition: $condition) {
      id
      phoneNumber
      isVerified
      nickname
      createdAt
      updatedAt
    }
  }
`;
