import { styled } from '@mui/material'

const Styles = styled('iframe')`
    width: 100%;
    height: 90vh;
    border: none;
`

export const Iframe = ({ src }: { src: string }) => {
    const url = `${src}#view=FitH`
    return <Styles src={url} />
}

// const url = `https://docs.google.com/viewer?url=${encodeURIComponent(
//     src
// )}&embedded=true`
