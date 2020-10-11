let responses = [];

module.exports = {
  get: jest.fn()
    .mockImplementation((href) => {
      const resp = responses.shift();
      if (resp instanceof Error) {
        return Promise.reject(resp);
      }
      return Promise.resolve(resp);
    }),
    __setResponses: (arr) => {
      responses = arr;
    },
};
