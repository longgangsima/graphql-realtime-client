import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_USER } from './graphql/mutations/ADD_USER';
import { GET_USERS } from './graphql/queries/GET_USERS';
import { USER_ADDED } from './graphql/queries/USER_ADDED';
import { AddUserInput, AddUserResponse, GetUsersResponse, User, UserAddedSubscriptionResponse } from './types/graphql';

export default function App() {
  const { data, loading, error, refetch } = useQuery<GetUsersResponse>(GET_USERS);
  const [addUser] = useMutation<AddUserResponse, AddUserInput>(ADD_USER);
  const { data: subData } = useSubscription<UserAddedSubscriptionResponse>(USER_ADDED);

  const [name, setName] = useState('');

  useEffect(() => {
    refetch();
  }, [subData]);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!name.trim()) return;
    addUser({ variables: { name } });
    setName('');
  };
  const handleOnChange = (e: any) => {
    setName(e.target.value);
  };

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <ul className="space-y-1">
        {data?.users.map((user: User) => (
          <li key={user.id} className="text-lg">
            {user.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit} className="flex space-x-2">
        <input className="border p-2 flex-1" placeholder="New user name" onChange={handleOnChange} value={name} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
