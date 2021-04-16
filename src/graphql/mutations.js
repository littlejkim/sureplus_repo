/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMoscatoUser = /* GraphQL */ `
  mutation CreateMoscatoUser(
    $input: CreateMoscatoUserInput!
    $condition: ModelMoscatoUserConditionInput
  ) {
    createMoscatoUser(input: $input, condition: $condition) {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      nickName
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
export const updateMoscatoUser = /* GraphQL */ `
  mutation UpdateMoscatoUser(
    $input: UpdateMoscatoUserInput!
    $condition: ModelMoscatoUserConditionInput
  ) {
    updateMoscatoUser(input: $input, condition: $condition) {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      nickName
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
export const deleteMoscatoUser = /* GraphQL */ `
  mutation DeleteMoscatoUser(
    $input: DeleteMoscatoUserInput!
    $condition: ModelMoscatoUserConditionInput
  ) {
    deleteMoscatoUser(input: $input, condition: $condition) {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      nickName
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
