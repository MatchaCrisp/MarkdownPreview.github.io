// controls sizing and rearrangement of previewer and editor window
const EditorControl=props=>{
    const icon=props.aState?<i class="fas fa-compress-arrows-alt"></i>:<i class="fas fa-expand-arrows-alt"></i>;
    return (
      <div id="editCh">
        <button id="editBut" onClick={props.editCh}>{icon}</button>
      </div>
    )
}

export default EditorControl;