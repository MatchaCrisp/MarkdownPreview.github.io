// internal
// components
import Preview from './Preview';
import PreviewControl from './PreviewControl';
// container for markdown previewer and sizing control
const PreviewWin=props=>{
    let szing;
    if (props.scrState){
        if (props.bState) szing='vertiMaxPrev';
        else if (props.aState) szing='vertiMinPrev';
        else szing='vertiPrev';
    }
    else {
        if (props.bState) szing='horiMaxPrev';
        else if (props.aState) szing='horiMinPrev';
        else szing='horiPrev';
    }
    return (
        <div id="prevWin" className={szing}>
            <PreviewControl prevCh={props.prevCh} bState={props.bState}/>
            <Preview markky={props.markky}/>
        </div>

    )
}

export default PreviewWin;