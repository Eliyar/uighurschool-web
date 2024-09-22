import StarterKit from '@tiptap/starter-kit'
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor,
    type RichTextEditorRef,
} from 'mui-tiptap'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface Props {
    text: string
    onChange: (text: string, html: string) => void
}

export const Editor = forwardRef(({ text, onChange }: Props, ref: any) => {
    const rteRef = useRef<RichTextEditorRef>(null)

    useImperativeHandle(ref, () => ({
        getValues: () => {
            return {
                text: rteRef.current?.editor?.getText(),
                html: rteRef.current?.editor?.getHTML(),
            }
        },
    }))

    return (
        <RichTextEditor
            ref={rteRef}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            extensions={[StarterKit]}
            content={text}
            renderControls={() => (
                <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                </MenuControlsContainer>
            )}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onUpdate={({ editor }: any) => {
                const text = editor.getText()
                const html = editor.getHTML()
                onChange(text, html)
            }}
        />
    )
})

Editor.displayName = 'Editor'
