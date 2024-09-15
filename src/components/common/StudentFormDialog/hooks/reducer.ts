import { produce } from 'immer'

import { FieldError, FieldValue } from '../../../../lib/field'
import { Student } from '../../../../services/models/Student.model'
import { FormFieldKeys, FormFields, initialForm } from './_useForm'

export enum ActionType {
    SET_STUDENT = 'set_student',
    UPDATE_FIELD = 'update_field',
    UPDATE_FIELD_ERROR = 'update_field_error',
    RESET_FORM = 'reset_form',
}

export type Action =
    | {
          type: ActionType.SET_STUDENT
          payload: {
              student: Student | null
          }
      }
    | {
          type: ActionType.UPDATE_FIELD
          payload: {
              fieldKey: FormFieldKeys
              fieldValue: FieldValue
          }
      }
    | {
          type: ActionType.UPDATE_FIELD_ERROR
          payload: {
              fieldKey: FormFieldKeys
              errorValue: FieldError
          }
      }
    | {
          type: ActionType.RESET_FORM
      }

export const reducer = (form: FormFields, action: any): FormFields => {
    return produce(form, (draft) => {
        switch (action.type) {
            case ActionType.SET_STUDENT: {
                const student: Student = action.payload.student
                draft.student = student
                draft.name.value = student.name
                draft.email.value = student.email
                draft.uighurName.value = student.uighurName ?? ''
                break
            }

            case ActionType.UPDATE_FIELD: {
                const { fieldKey, fieldValue } = action.payload
                draft[fieldKey as FormFieldKeys].value = fieldValue

                Object.keys(draft).forEach((key) => {
                    if (key === 'student') {
                        return
                    }
                    draft[key as FormFieldKeys].error = null
                })

                break
            }

            case ActionType.UPDATE_FIELD_ERROR: {
                const { fieldKey, errorValue } = action.payload
                draft[fieldKey as FormFieldKeys].error = errorValue
                break
            }

            case ActionType.RESET_FORM: {
                return initialForm
            }
        }
    })
}
