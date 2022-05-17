// internal
// components
import EditorWin from './EditorWin';
import PreviewWin from './PreviewWin';

// container for both editor window and preview window
const Display=props=>{
    return (
        <div id="display" className={!props.scrState?'horiDisplay':'vertiDisplay'}>
            <EditorWin markCh={props.markCh}
                       editCh={props.editCh} 
                       aState={props.aState} 
                       bState={props.bState} 
                       scrState={props.scrState}
                       markky={props.markky}/>
            <PreviewWin prevCh={props.prevCh} 
                        aState={props.aState} 
                        bState={props.bState} 
                        scrState={props.scrState}
                        markky={props.markky}/>
        </div>
    )
}

export default Display;