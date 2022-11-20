import React, { useContext } from 'react';
import Header from '../components/header';
import MasterProvider from '../context';
import TransactionForms from '../components/transactionForm';
import TransactionList from '../components/transactionTable';

function AccountPage() {
  const master = useContext(MasterProvider);
  const { user } = master;
  const { id, username, userAccount } = user;

  return (
    !username
      ? <p>Carregando...</p>
      : (
        <section>
          <Header
            name={username}
            balance={userAccount.balance}
          />

          <TransactionForms userId={id} />

          <TransactionList userId={id} />
        </section>
      )
  );
}

export default AccountPage;
