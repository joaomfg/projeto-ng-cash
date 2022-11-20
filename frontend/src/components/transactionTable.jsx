import React, { useEffect, useState, useContext } from 'react';
import MasterProvider from '../context';

export default function TransactionList() {
  const master = useContext(MasterProvider);
  const { transactions, getUserAccount } = master;

  const [debitUser, setDebitUser] = useState('');
  const [creditUser, setCreditUser] = useState('');

  useEffect(() => {
    transactions.forEach(async (t) => {
      const debit = await getUserAccount(t.debitedAccountId);
      setDebitUser(debit.username);

      const credit = await getUserAccount(t.creditedAccountId);
      setCreditUser(credit.username);
    });
  }, []);

  return (
    <section>
      <h2>Lista de usuários</h2>

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
                <td>{debitUser}</td>
                <td>{creditUser}</td>
                <td>{t.value}</td>
                <td>{t.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
