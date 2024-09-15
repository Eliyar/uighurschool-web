import { createContext, useContext } from 'react'

import { FormHookState, useForm } from './_useForm'

interface ContextState {
    form: FormHookState
}

const LocalStateContext = createContext<ContextState>(null!)

// Provider
export function LocalContextProvider({ classObj, children }: any) {
    const form = useForm(classObj)

    return (
        <LocalStateContext.Provider
            value={{
                form,
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
