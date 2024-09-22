/* eslint-disable @typescript-eslint/no-empty-object-type */

import { FileModel } from '../services/models/File.model'
import { Student } from '../services/models/Student.model'

export interface Field<T extends FieldValue = FieldValue> {
    id?: string
    value: T
    error: FieldError
}

export type FieldValue =
    | TextFieldValue
    | FilesFieldValue
    | NumberFieldValue
    | BooleanFieldValue
    | DateFieldValue
    | StudentsFieldValue

export type FieldError = string | null

export const initialFieldValue: FieldValue = null
export const initialFieldError: FieldError = null
export const initialField: Field = {
    value: initialFieldValue,
    error: initialFieldError,
}

export interface TextField extends Field<TextFieldValue> {}
export interface FilesField extends Field<FilesFieldValue> {}
export interface NumberField extends Field<NumberFieldValue> {}
export interface DateField extends Field<DateFieldValue> {}
export interface BooleanField extends Field<BooleanFieldValue> {}
export interface StudentsField extends Field<StudentsFieldValue> {}

export type TextFieldValue = string | null
export type FilesFieldValue = FileModel[] | null
export type NumberFieldValue = number | null
export type DateFieldValue = Date | null
export type BooleanFieldValue = boolean | null
export type StudentsFieldValue = Student[] | null
