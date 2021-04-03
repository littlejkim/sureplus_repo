/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMoscatoUser = /* GraphQL */ `
  subscription OnCreateMoscatoUser {
    onCreateMoscatoUser {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      plaidToken {
        bankName
        token
      }
      updatedAt
      createdAt
    }
  }
`;
export const onUpdateMoscatoUser = /* GraphQL */ `
  subscription OnUpdateMoscatoUser {
    onUpdateMoscatoUser {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      plaidToken {
        bankName
        token
      }
      updatedAt
      createdAt
    }
  }
`;
export const onDeleteMoscatoUser = /* GraphQL */ `
  subscription OnDeleteMoscatoUser {
    onDeleteMoscatoUser {
      id
      phoneNumber
      firstName
      lastName
      deviceId
      plaidToken {
        bankName
        token
      }
      updatedAt
      createdAt
    }
  }
`;
export const onCreateUserDevice = /* GraphQL */ `
  subscription OnCreateUserDevice($owner: String) {
    onCreateUserDevice(owner: $owner) {
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
export const onUpdateUserDevice = /* GraphQL */ `
  subscription OnUpdateUserDevice($owner: String) {
    onUpdateUserDevice(owner: $owner) {
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
export const onDeleteUserDevice = /* GraphQL */ `
  subscription OnDeleteUserDevice($owner: String) {
    onDeleteUserDevice(owner: $owner) {
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
