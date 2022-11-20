module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert(
        'transactions',
        [
          {
            id: 1,
            debited_account_id: 1,
            credited_account_id: 2,
            value: 10.20,
            created_at: '2022-10-06T10:10:10Z',
          },
        ],
        {},
      );
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('transactions', null, {});
    },
  };
  