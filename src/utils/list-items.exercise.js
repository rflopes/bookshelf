import { queryCache, useMutation, useQuery } from 'react-query';
import { client } from './api-client.exercise';

function useListItems(user) {
  const { data } = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', { token: user.token }).then(data => data.listItems),
  });

  return data ?? [];
}

function useListItem(bookId, user) {
  const listItems = useListItems(user);
  return listItems.find(item => item.bookId === bookId) ?? null;
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
};

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    { ...defaultMutationOptions, ...options },
  );
}

function useCreateListItem(user, options) {
  return useMutation(
    ({ bookId }) =>
      client('list-items', { data: { bookId }, token: user.token }),
    { ...defaultMutationOptions, ...options },
  );
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: 'DELETE', token: user.token }),
    { ...defaultMutationOptions, ...options },
  );
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useCreateListItem,
  useRemoveListItem,
};
