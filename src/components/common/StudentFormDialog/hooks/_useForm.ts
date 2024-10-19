import { useCallback, useReducer } from 'react'

import { createStudent } from '../../../../controllers/create-student'
import {
    FieldError,
    FieldValue,
    initialField,
    TextField,
} from '../../../../lib/field'
import { Class } from '../../../../services/models/Class.model'
import { Student } from '../../../../services/models/Student.model'
import { validationService } from '../../../../services/validation.service'
import { Toast } from '../../Toast'
import { ActionType, reducer } from './reducer'

export interface FormFields {
    name: TextField
    uighurName: TextField
    email: TextField
    student: Student | null
}

export const initialForm: FormFields = {
    name: initialField as TextField,
    uighurName: initialField as TextField,
    email: initialField as TextField,
    student: null,
}

export type FormFieldKeys = keyof Omit<FormFields, 'student'>

export interface FormHookState {
    form: FormFields
    updateField(fieldKey: FormFieldKeys, fieldValue: FieldValue): void
    validateField(fieldKey: FormFieldKeys): boolean
    setStudent(student: Student | null): void
    submit(callback: () => void): void
    resetForm(): void
}

export const useForm = (
    student: Student | undefined,
    classObj: Class
): FormHookState => {
    const [form, dispatch] = useReducer(reducer, initialForm)

    const isUpdating = !!student

    const setStudent = useCallback((student: Student | null) => {
        dispatch({
            type: ActionType.SET_STUDENT,
            payload: {
                student,
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
                        updateFieldError(fieldKey, 'This field is required')
                        return false
                    }
                    return true
                }

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

                default: {
                    return true
                }
            }
        },
        [form, updateFieldError]
    )

    const validateForm = useCallback(() => {
        const isValid = Object.keys(form).every((fieldKey) => {
            if (fieldKey === 'student') {
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
                // Update student
            } else {
                const newStudent = toStudent(form)
                try {
                    await createStudent(newStudent, classObj)
                } catch (error) {
                    console.error(error)
                }
            }

            Toast.success('Student created')

            callback()
        },
        [isUpdating, form, validateForm, classObj]
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
        setStudent,
        submit,
        resetForm,
    }
}

const toStudent = (form: FormFields): Student => {
    const name = form.name.value as string
    const uighurName = form.uighurName.value as string
    const email = form.email.value as string

    const student = new Student(name, uighurName, email)
    return student
}
