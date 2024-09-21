import { styled, SxProps, Theme } from '@mui/material'

interface Props {
    className?: string
    sx?: SxProps<Theme>
}

const Styles = styled('img')`
    width: 50px;
    height: auto;
`

export const Logo = ({ sx }: Props) => {
    return (
        <Styles
            sx={{ ...sx }}
            src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
            alt="Logo"
        />
    )
}
