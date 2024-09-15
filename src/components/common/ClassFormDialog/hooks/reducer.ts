import { produce } from 'immer'

import { FieldError, FieldValue } from '../../../../lib/field'
import { Class } from '../../../../services/models/Class.model'
import { FormFieldKeys, FormFields, initialForm } from './_useForm'

export enum ActionType {
    SET_CLASS = 'set_class',
    UPDATE_FIELD = 'update_field',
    UPDATE_FIELD_ERROR = 'update_field_error',
    RESET_FORM = 'reset_form',
}

export type Action =
    | {
          type: ActionType.SET_CLASS
          payload: {
              classObj: Class | null
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
            case ActionType.SET_CLASS: {
                const classObj: Class = action.payload.classObj
                draft.classObj = classObj
                if (classObj) {
                    draft.name.value = classObj.name
                }
                break
            }

            case ActionType.UPDATE_FIELD: {
                const { fieldKey, fieldValue } = action.payload
                draft[fieldKey as FormFieldKeys].value = fieldValue

                Object.keys(draft).forEach((key) => {
                    if (key === 'classObj') {
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
