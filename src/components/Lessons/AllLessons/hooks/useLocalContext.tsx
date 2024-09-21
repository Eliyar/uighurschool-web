import React, { createContext, useContext } from 'react'

import { FilesHookState, useFiles } from './useFiles'
import { FiltersHookState, useFilters } from './useFilters'

interface ContextState {
    filters: FiltersHookState
    files: FilesHookState
}

const LocalStateContext = createContext<ContextState>(null!)

// Provider
export function LocalContextProvider({ children }: any) {
    const filters = useFilters()
    const files = useFiles(filters)

    return (
        <LocalStateContext.Provider
            value={{
                filters,
                files,
            }}
        >
            {children}
        </LocalStateContext.Provider>
    )
}

// Consumer
export function useLocalContext() {
    return useContext(LocalStateContext)
}
