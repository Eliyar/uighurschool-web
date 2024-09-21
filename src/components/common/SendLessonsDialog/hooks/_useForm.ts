import { useCallback, useReducer } from 'react'

import {
    FieldError,
    FieldValue,
    initialField,
    TextField,
} from '../../../../lib/field'
import { validationService } from '../../../../services/validation.service'
import { ActionType, reducer } from './reducer'

export interface FormFields {
    email: TextField
    subject: TextField
    message: TextField
}

export const initialForm: FormFields = {
    email: initialField,
    subject: initialField,
    message: initialField,
}

export type FormFieldKeys = keyof FormFields

export interface FormHookState {
    form: FormFields
    updateField(fieldKey: FormFieldKeys, fieldValue: FieldValue): void
    validateField(fieldKey: FormFieldKeys): boolean
    submit(callback: () => void): void
    resetForm(): void
}

export const useForm = (): FormHookState => {
    const [form, dispatch] = useReducer(reducer, initialForm)

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
                case 'email': {
                    if (!value) {
                        updateFieldError(fieldKey, 'This field is required')
                        return false
                    }
                    if (!validationService.isEmail(value as string)) {
                        updateFieldError(fieldKey, 'Invalid email address')
                        return false
                    }
                    return true
                }

                case 'subject':
                case 'message': {
                    if (!value) {
                        updateFieldError(fieldKey, 'This field is required')
                        return false
                    }
                    return true
                }

                default: {
                    return true
                }
            }
        },
        [form, updateFieldError]
    )

    const validateForm = useCallback(() => {
        const isValid = Object.keys(form).every((fieldKey) => {
            return validateField(fieldKey as FormFieldKeys)
        })
        return isValid
    }, [form, validateField])

    const submit = useCallback(
        async (callback: () => void) => {
            if (!validateForm()) {
                return
            }

            // TODO: Implement send lessons logic here

            callback()
        },
        [validateForm]
    )

    const resetForm = useCallback(() => {
        dispatch({
            type: ActionType.RESET_FORM,
        })
    }, [])

    return {
        form,
        updateField,
        validateField,
        submit,
        resetForm,
    }
}
