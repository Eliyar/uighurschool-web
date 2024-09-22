import { produce } from 'immer'

import { FieldError, FieldValue } from '../../../../lib/field'
import { FileModel } from '../../../../services/models/File.model'
import { Student } from '../../../../services/models/Student.model'
import { FormFieldKeys, FormFields, initialForm } from './_useForm'

export enum ActionType {
    UPDATE_FIELD = 'update_field',
    UPDATE_FIELD_ERROR = 'update_field_error',
    SET_STUDENTS = 'set_students',
    SET_FILES = 'set_files',
    RESET_FORM = 'reset_form',
}

export type Action =
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
          type: ActionType.SET_STUDENTS
          payload: {
              students: Student[]
          }
      }
    | {
          type: ActionType.SET_FILES
          payload: {
              files: FileModel[]
          }
      }
    | {
          type: ActionType.RESET_FORM
      }

export const reducer = (form: FormFields, action: Action): FormFields => {
    return produce(form, (draft) => {
        switch (action.type) {
            case ActionType.UPDATE_FIELD: {
                const { fieldKey, fieldValue } = action.payload
                draft[fieldKey].value = fieldValue
                draft[fieldKey].error = null
                break
            }

            case ActionType.UPDATE_FIELD_ERROR: {
                const { fieldKey, errorValue } = action.payload
                draft[fieldKey].error = errorValue
                break
            }

            case ActionType.SET_STUDENTS: {
                const { students } = action.payload
                draft.students = students
                break
            }

            case ActionType.SET_FILES: {
                const { files } = action.payload
                draft.files = files
                break
            }

            case ActionType.RESET_FORM: {
                return initialForm
            }
        }
    })
}
