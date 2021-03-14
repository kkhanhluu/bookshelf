import {useClient} from 'context/auth-context'
import {useMutation, useQuery, useQueryClient} from 'react-query'

function useListItems() {
  const bookQueryConfig = {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  }
  const client = useClient()
  const queryClient = useQueryClient()
  const {data} = useQuery({
    queryKey: 'list-items',
    queryFn: () => client(`list-items`).then(data => data.listItems),
    onSuccess: async listItems => {
      for (const listItem of listItems) {
        const {book} = listItem
        queryClient.setQueryData(
          ['book', {bookId: book.id}],
          book,
          bookQueryConfig,
        )
      }
    },
  })
  return data ?? []
}

function useListItem(bookId) {
  const listItems = useListItems()
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

function useUpdateListItem(options) {
  const queryClient = useQueryClient()
  const client = useClient()
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
      }),
    {
      onMutate(newItem) {
        const previousItems = queryClient.getQueryData('list-items')

        queryClient.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })

        return () => queryClient.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...options,
      onSettled: () => queryClient.invalidateQueries('list-items'),
    },
  )
}

function useRemoveListItem(options) {
  const queryClient = useQueryClient()
  const client = useClient()
  return useMutation(({id}) => client(`list-items/${id}`, {method: 'DELETE'}), {
    onMutate(removedItem) {
      const previousItems = queryClient.getQueryData('list-items')

      queryClient.setQueryData('list-items', old => {
        return old.filter(item => item.id !== removedItem.id)
      })

      return () => queryClient.setQueryData('list-items', previousItems)
    },
    ...defaultMutationOptions,
    ...options,
    onSettled: () => queryClient.invalidateQueries('list-items'),
  })
}

function useCreateListItem(options) {
  const queryClient = useQueryClient()
  const client = useClient()
  return useMutation(({bookId}) => client(`list-items`, {data: {bookId}}), {
    ...defaultMutationOptions,
    ...options,
    onSettled: () => queryClient.invalidateQueries('list-items'),
  })
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
