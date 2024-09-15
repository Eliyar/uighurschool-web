/* eslint-disable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Field {
    id?: string
    value: FieldValue
    error: FieldError
}

export type FieldValue =
    | TextFieldValue
    | FileFieldValue
    | NumberFieldValue
    | BooleanFieldValue
    | DateFieldValue

export type FieldError = string | null

export const initialFieldValue: FieldValue = null
export const initialFieldError: FieldError = null
export const initialField: Field = {
    value: initialFieldValue,
    error: initialFieldError,
}

export interface TextField extends Field {}
export interface FileField extends Field {}
export interface NumberField extends Field {}
export interface DateField extends Field {}
export interface BooleanField extends Field {}

export type TextFieldValue = string | null
export type FileFieldValue = File | null
export type NumberFieldValue = number | null
export type DateFieldValue = Date | null
export type BooleanFieldValue = boolean | null
