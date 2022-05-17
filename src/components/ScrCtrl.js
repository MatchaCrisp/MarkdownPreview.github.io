// internal
// icons
import col from '../img/col.png';
import row from '../img/row.png';

// rearrangement (column or row) control
const ScrCtrl=props=>{
    const icon=props.scrS?<img className="buttIcon" alt="icon that depicts row arrangement of editor and previewer" src={row} />:<img className="buttIcon" alt="icon that depicts column arrangement of editor and previewer" src={col} />;
    return (
        <div id="scrCh">
            <button id="scrBut" onClick={props.scrCh}>{icon}</button>

        </div>
    )
}

export default ScrCtrl;