module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        field: 'debited_account_id',
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Accounts',
          key: 'id',
        },
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'credited_account_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Accounts',
          key: 'id',
        },
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: Date.now(),
        field: 'created_at',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Transactions');
  },
};
