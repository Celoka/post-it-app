global.$ = jest.fn((id) => {
  if (id.indexOf('Modal') > -1) {
    return {
      modal: () => { }
    };
  }
  return {};
});
