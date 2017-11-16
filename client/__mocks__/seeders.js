export const userValidation = jest.fn().mockReturnValue(Promise.resolve({
  details: [
    {
      userId: 'A7332TqlocVLBlIxX9r91vGjyVY2',
      displayName: 'West'
    }]
}));
export const newProperty = {
  newUser: 'West',
  groupId: '-KyybV9vHkNxABB5dnSm',
  userId: userValidation('West')
};

export const nextProps = {
  newMember: [{
    displayName: 'Ebuka'
  }],
  groupId: '-KyybV9vHkNxABB5dnSm',
};

export const event = {
  target: {
    email: 'user@email.com'
  }
};
