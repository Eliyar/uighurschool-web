import { ButtonBase, styled, SxProps, Theme } from '@mui/material'

interface Props {
    className?: string
    sx?: SxProps<Theme>
    onClick?(): void
}

const Styles = styled('img')`
    width: 50px;
    height: auto;
`

export const Logo = ({ sx, onClick }: Props) => {
    return (
        <ButtonBase sx={{ borderRadius: '13px' }}>
            <Styles
                src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
                alt="Logo"
                onClick={() => {
                    onClick?.()
                }}
                sx={{ ...sx, cursor: onClick ? 'pointer' : 'default' }}
            />
        </ButtonBase>
    )
}
