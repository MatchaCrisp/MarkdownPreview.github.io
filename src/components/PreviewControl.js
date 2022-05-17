// controls sizing and rearrangement of previewer and editor window
const PreviewControl=props=>{
    const icon=props.bState?<i class="fas fa-compress-arrows-alt"></i>:<i class="fas fa-expand-arrows-alt"></i>;
  return (
    <div id="prevCh">
      <button id="prevBut" onClick={props.prevCh}>{icon}</button>
    </div>
  )
}

export default PreviewControl;