module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'joao',
          password: '12345678',
          account_id: 1,
        },
        {
          id: 2,
          username: 'mateus',
          password: '12345678',
          account_id: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
