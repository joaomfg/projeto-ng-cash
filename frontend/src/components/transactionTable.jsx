import React, { useContext, useEffect, useState } from 'react';
import MasterProvider from '../context';
import Filters from './filters';

export default function TransactionList() {
  const master = useContext(MasterProvider);
  const { transactions, getUserAccount } = master;

  const [usersD, setUsersD] = useState([]);
  const [usersC, setUsersC] = useState([]);

  useEffect(() => {
    transactions.map(async (t) => {
      const debitUser = await getUserAccount(t.debitedAccountId);
      const creditUser = await getUserAccount(t.creditedAccountId);

      setUsersD([...usersD, debitUser.username]);
      setUsersC([...usersC, creditUser.username]);
    });
  }, [transactions]);

  return (
    <section className="table-container">
      <h2 className="title">Suas transações</h2>

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
            && transactions.map((t, i) => (
              <tr key={t.id}>
                <td>
                  {usersD[i]}
                </td>
                <td>
                  {usersC[i]}
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
