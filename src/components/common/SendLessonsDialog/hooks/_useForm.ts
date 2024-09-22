import { useCallback, useReducer } from 'react'

import {
    FieldError,
    FieldValue,
    initialField,
    TextField,
} from '../../../../lib/field'
import { Student } from '../../../../services/models/Student.model'
import { ActionType, reducer } from './reducer'

export interface FormFields {
    subject: TextField
    message: TextField
    students: Student[]
}

export const initialForm: FormFields = {
    subject: initialField,
    message: initialField,
    students: [],
}

export type FormFieldKeys = keyof Omit<FormFields, 'students'>

export interface FormHookState {
    form: FormFields
    updateField(fieldKey: FormFieldKeys, fieldValue: FieldValue): void
    setStudents(students: Student[]): void
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

    const setStudents = useCallback((students: Student[]) => {
        dispatch({
            type: ActionType.SET_STUDENTS,
            payload: { students },
        })
    }, [])

    const validateField = useCallback(
        (fieldKey: FormFieldKeys) => {
            const value = form[fieldKey].value

            switch (fieldKey) {
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
            if (fieldKey === 'students') {
                return form.students.length > 0
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

            // TODO: Implement send lessons logic here
            const students = form.students
            const subject = form.subject.value as string
            const message = form.message.value as string

            console.log({
                students,
                subject,
                message,
            })

            callback()
        },
        [validateForm, form]
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
        setStudents,
        submit,
        resetForm,
    }
}
