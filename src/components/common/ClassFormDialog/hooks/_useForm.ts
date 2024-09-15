import { useCallback, useEffect, useReducer } from 'react'

import { createClass } from '../../../../controllers/create-class'
import { updateClass } from '../../../../controllers/update-class'
import { useClasses } from '../../../../hooks/useClasses'
import {
    FieldError,
    FieldValue,
    initialField,
    TextField,
} from '../../../../lib/field'
import { Class } from '../../../../services/models/Class.model'
import { ActionType, reducer } from './reducer'

export interface FormFields {
    name: TextField
    classObj: Class | null
}

export const initialForm: FormFields = {
    name: initialField,
    classObj: null,
}

export type FormFieldKeys = keyof Omit<FormFields, 'classObj'>

export interface FormHookState {
    form: FormFields
    updateField(fieldKey: FormFieldKeys, fieldValue: FieldValue): void
    validateField(fieldKey: FormFieldKeys): boolean
    setClass(classObj: Class | null): void
    submit(callback: () => void): void
    resetForm(): void
}

export const useForm = (classObj: Class | undefined): FormHookState => {
    const { getBySimilarName } = useClasses()
    const [form, dispatch] = useReducer(reducer, initialForm)

    const isUpdating = !!classObj

    const setClass = useCallback((classObj: Class | null) => {
        dispatch({
            type: ActionType.SET_CLASS,
            payload: {
                classObj,
            },
        })
    }, [])

    const updateField = useCallback(
        (fieldKey: FormFieldKeys, fieldValue: FieldValue) => {
            dispatch({
                type: ActionType.UPDATE_FIELD,
                payload: {
                    fieldKey,
                    fieldValue,
                },
            })
        },
        []
    )

    const updateFieldError = useCallback(
        (fieldKey: FormFieldKeys, fieldError: FieldError) => {
            dispatch({
                type: ActionType.UPDATE_FIELD_ERROR,
                payload: {
                    fieldKey,
                    errorValue: fieldError,
                },
            })
        },
        []
    )

    const validateField = useCallback(
        (fieldKey: FormFieldKeys) => {
            const value = form[fieldKey].value

            switch (fieldKey) {
                case 'name': {
                    if (!value) {
                        updateFieldError(fieldKey, 'Invalid field')
                        return false
                    }

                    const classes = getBySimilarName(value as string)
                    if (classes?.length > 0) {
                        updateFieldError(fieldKey, 'Class already exists')
                        return false
                    }

                    return true
                }

                default: {
                    return true
                }
            }
        },
        [form, updateFieldError, getBySimilarName]
    )

    const validateForm = useCallback(() => {
        const isValid = Object.keys(form).every((fieldKey) => {
            if (fieldKey === 'classObj') {
                return true
            }
            return validateField(fieldKey as FormFieldKeys)
        })
        return isValid
    }, [form, validateField])

    const submit = useCallback(
        async (callback: () => void) => {
            if (!validateForm()) {
                return
            }

            if (isUpdating) {
                const updates = toUpdates(form)
                try {
                    await updateClass(classObj.id, updates)
                } catch (error) {
                    console.error(error)
                }
            } else {
                const newClass = toClass(form)
                try {
                    await createClass(newClass)
                } catch (error) {
                    console.error(error)
                }
            }

            // TODO: display toast

            callback()
        },
        [isUpdating, classObj, form, validateForm]
    )

    const resetForm = useCallback(() => {
        dispatch({
            type: ActionType.RESET_FORM,
        })
    }, [])

    useEffect(() => {
        setClass(classObj ?? null)
    }, [classObj, setClass])

    return {
        form,
        updateField,
        validateField,
        setClass,
        submit,
        resetForm,
    }
}

const toClass = (form: FormFields): Class => {
    const name = form.name.value as string

    const classObj = new Class(name)
    return classObj
}

const toUpdates = (form: FormFields): Partial<Class> => {
    const name = form.name.value as string
    return {
        name,
    }
}
