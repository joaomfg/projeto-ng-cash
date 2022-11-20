import React, { useEffect, useState, useContext } from 'react';
import MasterProvider from '../context';
import Filters from './filters';

export default function TransactionList() {
  const master = useContext(MasterProvider);
  const { transactions, getUserAccount, user } = master;

  const [debitUser, setDebitUser] = useState({});
  const [creditUser, setCreditUser] = useState({});

  useEffect(() => {
    transactions.forEach(async (t) => {
      const debit = await getUserAccount(t.debitedAccountId);
      setDebitUser(debit);

      const credit = await getUserAccount(t.creditedAccountId);
      setCreditUser(credit);
    });
  }, [transactions]);

  return (
    <section>
      <h2>Suas transações</h2>

      <Filters />

      <table>
        <thead>
          <tr>
            <th>De:</th>
            <th>Para:</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0
            && transactions.map((t) => (
              <tr key={t.id}>
                <td>
                  {debitUser.id === user.id ? 'Você' : debitUser.username}
                </td>
                <td>
                  {creditUser.id === user.id ? 'Você' : creditUser.username}
                </td>
                <td>{t.value}</td>
                <td>{`${t.createdAt.split('T')[0]}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
