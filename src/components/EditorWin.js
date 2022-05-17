// internal
// components
import Editor from './Editor';
import EditorControl from './EditorControl';

// container for markdown editor area, and sizing control
const EditorWin=props=>{
    let szing;
    if (props.scrState){
        if (props.aState) szing='vertiMaxEdit';
        else if (props.bState) szing='vertiMinEdit';
        else szing='vertiEdit';
    }
    else {
        if (props.aState) szing='horiMaxEdit';
        else if (props.bState) szing='horiMinEdit';
        else szing='horiEdit';
    }
    return (
        <div id="editWin" className={szing}>
            <EditorControl aState={props.aState} editCh={props.editCh}/>
            <Editor markCh={props.markCh} markky={props.markky}/>

        </div>

    )
}

export default EditorWin;