import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import DOMPurify from 'dompurify';
import marked from 'marked';

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  // INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
  };
  

const App=()=>{
    const [markky,setMarkky] =useState('<h1>welcome</h1>');
    const [editState, setEditState]=useState(0);
    const [screenState, setScreenState]=useState('hori');

    const handleMark=e=>{
        setMarkky(e.target.value);
    }

    const handleSizeChange=srcc=>{

            setEditState(srcc);
    }

    const handleModeChange=val=>{
        setScreenState(val);
    }
    return (
        <div id="appWrap">
            <ModeSwapper handleClick={handleModeChange} />
            <EditorWindow 
                handleSz={handleSizeChange} 
                handleChange={handleMark}
                aState={editState} 
                bState={screenState} 
                markd={markky} />
            <PrevWindow 
                handleSz={handleSizeChange} 
                aState={editState} 
                bState={screenState} 
                markd={markky} />
        </div>
    )
}

const ModeSwapper=props=>{
    console.log('mode',props);
    return (
        <div id="modeSwap">
            <button id="hori" onClick={props.handleClick} >Horizontal</button>
            <button id="verti" onClick={props.handleClick} >Vertical</button>
        </div>
    )
}

const EditorWindow=props=>{
    console.log('edit',props);
    return (
        <div id="edit">
            <div id="editMaxi" >
                <button id="editMax" onClick={props.handleSz} >MaxEdit</button>
            </div>
            <textarea id="inp" onChange={props.handleChange} value={props.markd} />
        </div>

    )
}

const PrevWindow=props=>{
    console.log('prev',props);
    return (
        <div id="prev">
            <div id="prevMaxi" >
                <button id="prevMax" onClick={props.handleSz} >MaxPrev</button>
            </div>
            <div id="out" dangerouslySetInnerHTML={{
        __html: marked(DOMPurify.sanitize(props.markd, {USE_PROFILES: {html: true}}), { renderer: renderer })
      }}/>
        </div>

    )
}
ReactDOM.render(<App />, document.getElementById('root'));
