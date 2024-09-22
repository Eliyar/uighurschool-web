import { useCallback, useReducer } from 'react'

import { sendLessons } from '../../../../controllers/send-lessons'
import { useHttp } from '../../../../hooks/useHttp'
import {
    FieldError,
    FieldValue,
    FilesField,
    FilesFieldValue,
    initialField,
    StudentsField,
    StudentsFieldValue,
    TextField,
} from '../../../../lib/field'
import { FileModel } from '../../../../services/models/File.model'
import { Student } from '../../../../services/models/Student.model'
import { ActionType, reducer } from './reducer'

export interface FormFields {
    subject: TextField
    message: TextField
    students: StudentsField
    files: FilesField
}

export const initialForm: FormFields = {
    subject: { ...initialField, value: '' },
    message: { ...initialField, value: '' },
    students: { ...initialField, value: [] },
    files: { ...initialField, value: [] },
}

export type FormFieldKeys = keyof FormFields

export interface FormHookState {
    form: FormFields
    isLoading: boolean
    updateField(
        fieldKey: FormFieldKeys,
        fieldValue: FieldValue | StudentsFieldValue | FilesFieldValue
    ): void
    setStudents(students: Student[]): void
    setFiles(files: FileModel[]): void
    validateField(fieldKey: FormFieldKeys): boolean
    submit(callback: () => void): void
    resetForm(): void
}

export const useForm = (): FormHookState => {
    const [form, dispatch] = useReducer(reducer, initialForm)
    const { sendRequest, isLoading } = useHttp()

    const updateField = useCallback(
        (
            fieldKey: FormFieldKeys,
            fieldValue: FieldValue | StudentsFieldValue | FilesFieldValue
        ) => {
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

    const setFiles = useCallback((files: FileModel[]) => {
        dispatch({
            type: ActionType.SET_FILES,
            payload: { files },
        })
    }, [])

    const validateField = useCallback(
        (fieldKey: FormFieldKeys) => {
            const field = form[fieldKey]
            let isValid = true
            let errorMessage = ''

            switch (fieldKey) {
                case 'subject':
                case 'message':
                    if (!field.value) {
                        isValid = false
                        errorMessage = 'This field is required'
                    }
                    break
                case 'students':
                    if (!field.value || field.value.length === 0) {
                        isValid = false
                        errorMessage = 'At least one student must be selected'
                    }
                    break
                case 'files':
                    if (!field.value || field.value.length === 0) {
                        isValid = false
                        errorMessage = 'At least one file must be selected'
                    }
                    break
            }

            if (!isValid) {
                updateFieldError(fieldKey, errorMessage)
            }

            return isValid
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
            const students = form.students.value as Student[]
            const subject = form.subject.value as string
            const message = form.message.value as string
            const files = form.files.value as FileModel[]

            console.log({
                students,
                subject,
                message,
            })

            return sendRequest(
                sendLessons.bind(null, {
                    students,
                    subject,
                    message,
                    files,
                })
            ).then(() => {
                callback()
            })
        },
        [validateForm, form, sendRequest]
    )

    const resetForm = useCallback(() => {
        dispatch({
            type: ActionType.RESET_FORM,
        })
    }, [])

    return {
        form,
        isLoading,
        updateField,
        validateField,
        setStudents,
        setFiles,
        submit,
        resetForm,
    }
}
