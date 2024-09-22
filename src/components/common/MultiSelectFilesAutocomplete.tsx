import {
    Autocomplete,
    Chip,
    ListItem,
    ListItemIcon,
    Stack,
    styled,
    SxProps,
    TextField,
    Theme,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { useMemo, useState } from 'react'

import { DATE_FORMAT } from '../../constants'
import { useFiles } from '../../hooks/useFiles'
import { FieldError } from '../../lib/field'
import { FileModel } from '../../services/models/File.model'

interface Props {
    label?: string
    placeholder?: string
    files: FileModel[]
    error?: FieldError
    sx?: SxProps<Theme>
    onChange(files: FileModel[]): void
    onBlur?(): void
}

export const MultiSelectFilesAutocomplete = ({
    label,
    placeholder,
    files,
    error,
    sx,
    onChange,
    onBlur,
}: Props) => {
    const { options, optionsSelected } = useView(files)
    const [inputValue, setInputValue] = useState<string>('')

    return (
        <Autocomplete
            id="multiselect-files-autocomplete"
            noOptionsText="No files exist"
            options={options}
            value={optionsSelected}
            inputValue={inputValue}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, selected) => {
                const selectedFiles =
                    selected?.map((s) => s.extendedProps as FileModel) ?? []

                const uniqueSelectedFiles =
                    selectedFiles.filter(
                        (file, index) =>
                            selectedFiles.findIndex((i) => i.id === file.id) ===
                            index
                    ) ?? []

                onChange(uniqueSelectedFiles)
            }}
            onBlur={() => onBlur?.()}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={(params) => (
                <TextFieldStyles
                    {...params}
                    size="small"
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {/* {option.label} */}
                    <FileItem file={option.extendedProps as FileModel} />
                </li>
            )}
            multiple={true}
            sx={{ ...sx }}
        />
    )
}

const TextFieldStyles = styled(TextField)`
    input {
        font-size: 14px;
        font-weight: 500;
    }
`

const useView = (selected: FileModel[]) => {
    const { files } = useFiles()

    const options = useMemo((): AutocompleteOption[] => {
        const _options: AutocompleteOption[] = []

        _options.push(...makeOptionsFromFiles(files))

        return _options
    }, [files])

    const optionsSelected: AutocompleteOption[] = useMemo(
        () =>
            options.filter((option) =>
                selected.some((s) => s.id === option.id)
            ),
        [options, selected]
    )

    const optionsFiltered = useMemo(() => {
        return options.filter(
            (option) => !optionsSelected.some((s) => s.id === option.id)
        )
    }, [options, optionsSelected])

    return { options: optionsFiltered, optionsSelected }
}

export interface AutocompleteOption {
    id: string
    value: string
    label: string
    extendedProps?: FileModel
}

const makeOptionsFromFiles = (files: FileModel[]): AutocompleteOption[] => {
    return (
        files
            .flatMap((file) => [file, ...(file.subFiles || [])])
            ?.map((file) => ({
                id: file.id,
                value: file.id,
                label: `${file.name}`,
                extendedProps: file,
            })) ?? []
    )
}

const FileItem = ({ file }: { file: FileModel }) => {
    return (
        <ListItem sx={{ p: 0 }}>
            <Stack direction="row" alignItems="flex-start" gap={2}>
                {file.tag && (
                    <ListItemIcon>
                        <Chip
                            label={file.tag}
                            variant="outlined"
                            color={
                                file.tag === 'lesson' ? 'primary' : 'warning'
                            }
                            size="small"
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 500,
                            }}
                        />
                    </ListItemIcon>
                )}
                <Stack>
                    <Typography
                        className="truncate-row-1"
                        variant="body2"
                        fontWeight={500}
                    >
                        {file.name}
                    </Typography>
                    <Typography
                        className="truncate-row-2"
                        variant="body2"
                        color="secondary"
                    >
                        {moment(file.createdAt).format(DATE_FORMAT)}
                    </Typography>
                </Stack>
            </Stack>
        </ListItem>
    )
}
