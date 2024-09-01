import 'map.prototype.tojson'

import { configureStore, EnhancedStore } from '@reduxjs/toolkit'

import { reducer } from './reducer'

export const storeService = (() => {
    let store: EnhancedStore

    const getStore = (): EnhancedStore => {
        return store
    }

    const createStore = () => {
        store = configureStore({
            reducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),
        })
        return store
    }

    const dispatch = (action: any) => {
        store.dispatch(action)
    }

    return {
        getStore,
        createStore,
        dispatch,
    }
})()
