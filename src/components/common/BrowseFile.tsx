import { CloudUpload } from '@mui/icons-material'
import { Button, styled } from '@mui/material'

interface Props {
    onChange(files: File[]): void
}

export const BrowseFile = ({ onChange }: Props) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
        >
            <span>Browse file</span>
            <HiddenInput
                type="file"
                accept="application/pdf"
                multiple
                onChange={(event: any) => {
                    const files = Array.from(
                        event?.target?.files ?? []
                    ) as File[]
                    onChange(files)
                }}
            />
        </Button>
    )
}

const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})
