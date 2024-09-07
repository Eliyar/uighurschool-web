import { useCallback, useReducer } from 'react'

interface State {
    status: 'loading' | 'loaded' | 'error' | undefined
    errorData: any
    responseData: any
    requestId?: number | string
    successCallback?: (...args: any) => any
    errorCallback?: (...args: any) => any
}

const initialState: State = {
    status: undefined,
    errorData: null,
    responseData: null,
    requestId: undefined,
    successCallback: undefined,
    errorCallback: undefined,
}

enum ACTION {
    SEND,
    RESPONSE,
    ERROR,
    RESET,
}

interface Action {
    type: ACTION
    payload: {
        responseData?: any
        errorData?: any
        requestId?: number | string
        successCallback?: (...args: any) => any
        errorCallback?: (...args: any) => any
    }
}

const reducer = (
    state: State,
    {
        type,
        payload: {
            responseData,
            errorData,
            requestId,
            successCallback,
            errorCallback,
        },
    }: Action
): State => {
    switch (type) {
        case ACTION.SEND:
            return {
                ...initialState,
                status: 'loading',
                requestId,
            }

        case ACTION.RESPONSE:
            return {
                ...state,
                status: 'loaded',
                responseData,
                errorData: null,
                requestId,
                successCallback,
            }

        case ACTION.ERROR:
            return {
                ...state,
                status: 'error',
                responseData: null,
                errorData,
                requestId,
                errorCallback,
            }

        case ACTION.RESET:
        default:
            return initialState
    }
}

export const useHttp = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const sendRequest = useCallback(
        async (
            requestFunc: () => Promise<any>,
            requestId?: number | string,
            successCallback?: (...args: any) => any,
            errorCallback?: (...args: any) => any
        ): Promise<any> => {
            dispatch({
                type: ACTION.SEND,
                payload: {
                    requestId,
                },
            })

            return requestFunc()
                .then((responseData: any) => {
                    dispatch({
                        type: ACTION.RESPONSE,
                        payload: {
                            responseData,
                            requestId,
                            successCallback,
                        },
                    })
                    return responseData
                })
                .catch((errorData: any) => {
                    dispatch({
                        type: ACTION.ERROR,
                        payload: {
                            errorData,
                            requestId,
                            errorCallback,
                        },
                    })
                    return Promise.reject(errorData)
                })
        },
        []
    )

    return {
        isLoading: state.status === 'loading',
        hasLoaded: state.status === 'loaded' || state.status === 'error',
        responseData: state.responseData,
        errorData: state.errorData,
        requestId: state.requestId,
        successCallback: state.successCallback,
        errorCallback: state.errorCallback,
        sendRequest,
    }
}
