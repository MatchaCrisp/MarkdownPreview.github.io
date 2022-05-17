// markdown editor area
const Editor = props => {
    return (
        <textarea id="editor" onChange={props.markCh} value={props.markky} />
    )
}

export default Editor;