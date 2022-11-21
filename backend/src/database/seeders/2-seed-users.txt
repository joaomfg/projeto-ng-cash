module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'joao',
          password: '$2a$08$kQmdPU0xFgR4Lkk0ocRtFez3/MIe6w6G2hGOLRLrtwws4lj1pUtBq', // 12345678
          account_id: 1,
        },
        {
          id: 2,
          username: 'mateus',
          password: '$2a$08$kQmdPU0xFgR4Lkk0ocRtFez3/MIe6w6G2hGOLRLrtwws4lj1pUtBq', // 12345678
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
