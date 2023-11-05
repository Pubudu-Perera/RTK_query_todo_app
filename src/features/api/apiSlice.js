import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:3500'}),
    tagTypes : ['todos'],
    endpoints : (builder) => ({

        // builder.query() is only for GET Requests
        getTodos : builder.query({
            query : () => '/todos',

            // Sorting the list as LIFO
            transformResponse : res => res.sort((a,b) => b.id - a.id),
            providesTags : ['todos']
        }),

        addTodo : builder.mutation({
            query : (todo) => ({
                url : '/todos',
                method : 'POST',
                body : todo
            }),
            invalidatesTags : ['todos']
        }),

        updateTodo : builder.mutation({
            query : (todo) => ({
                url : `/todos/${todo.id}`,
                method : 'PATCH',
                body : todo
            }),
            invalidatesTags : ['todos']
        }),

        deleteTodo : builder.mutation({
            query : ({id}) => ({
                url : `/todos/${id}`,
                method : 'DELETE',
                body : id
            }),
            invalidatesTags : ['todos']
        })
    })
});

export const {useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation} = apiSlice;