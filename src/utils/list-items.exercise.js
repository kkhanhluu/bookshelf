import {useQuery, useMutation, useQueryClient} from 'react-query'
import {client} from 'utils/api-client'

export function useListItems(user) {
  const listItemsQuery = useQuery('list-items', () =>
    client('list-items', {token: user.token}).then(res => res.listItems),
  )
  return listItemsQuery.data ?? []
}

export function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems?.find(item => item.bookId === bookId) ?? null
}

const defaultMutationOptions = queryClient => {
  return {
    onSettled: () => {
      queryClient.invalidateQueries('list-items')
    },
  }
}

export function useUpdateListItem(user) {
  const queryClient = useQueryClient()
  return useMutation(
    data =>
      client(`list-items/${data.id}`, {method: 'PUT', data, token: user.token}),
    defaultMutationOptions(queryClient),
  )
}

export function useRemoveListItem(user) {
  const queryClient = useQueryClient()
  return useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    defaultMutationOptions(queryClient),
  )
}

export function useCreateListItem(user) {
  const queryClient = useQueryClient()
  return useMutation(
    data => client(`list-items/`, {method: 'POST', data, token: user.token}),
    defaultMutationOptions(queryClient),
  )
}
