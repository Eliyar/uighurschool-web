import { styled } from '@mui/material'

const Styles = styled('iframe')`
    width: 100%;
    height: 100%;
    border: none;
`

export const Iframe = ({ src }: { src: string }) => {
    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        src
    )}&embedded=true`
    return <Styles src={googleDocsUrl} />
}
