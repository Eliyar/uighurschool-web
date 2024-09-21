import { produce } from 'immer'

import { FieldError, FieldValue } from '../../../../lib/field'
import { FormFieldKeys, FormFields, initialForm } from './_useForm'

export enum ActionType {
    UPDATE_FIELD = 'update_field',
    UPDATE_FIELD_ERROR = 'update_field_error',
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

            case ActionType.RESET_FORM: {
                return initialForm
            }
        }
    })
}
