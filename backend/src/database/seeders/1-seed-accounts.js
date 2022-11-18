module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          id: 1,
          balance: 100.00,
        },
        {
          id: 2,
          balance: 350.50,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
