import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import DOMPurify from 'dompurify';
import marked from 'marked';

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  
  // INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
  };
  

const App=()=>{
    const [markky,setMarkky] =useState(placeholder);
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
            <Display handleSizeChange={handleSizeChange}
                    handleMark={handleMark}
                    editState={editState}
                    screenState={screenState}
                    markky={markky}/>
        </div>
    )
}

const Display=props=>{
    return (
        <div id="display">
            <EditorWindow 
                handleSz={props.handleSizeChange} 
                handleChange={props.handleMark}
                aState={props.editState} 
                bState={props.screenState} 
                markd={props.markky} />
            <PrevWindow 
                handleSz={props.handleSizeChange} 
                aState={props.editState} 
                bState={props.screenState} 
                markd={props.markky} />
        </div>
    )
}
const ModeSwapper=props=>{
    console.log('mode',props);
    return (
        <div id="modeSwap">
            <button id="hori" onClick={props.handleClick} ><img src="../src/img/row.png" /></button>
            <button id="verti" onClick={props.handleClick} ><img src="../src/img/col.png" /></button>
        </div>
    )
}

const EditorWindow=props=>{
    console.log('edit',props);
    return (
        <div id="edit">
            <div id="editMaxi" >
                <button id="editMax" onClick={props.handleSz} ><i class="fas fa-expand-arrows-alt"></i></button>
            </div>
            <textarea id="editor" onChange={props.handleChange} value={props.markd} />
        </div>

    )
}

const PrevWindow=props=>{
    console.log('prev',props);
    return (
        <div id="prev">
            <div id="prevMaxi" >
                <button id="prevMax" onClick={props.handleSz} ><i class="fas fa-expand-arrows-alt"></i></button>
            </div>
            <div id="preview" dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(props.markd, { renderer: renderer }), {USE_PROFILES: {html: true}})
      }}/>
        </div>

    )
}

const placeholder = `# Welcome!

This is a previewer of GitHub flavored markdown.

## Here you can:

### render some cool markdown like 
    * **bold** text
    * _italic_ text
    * or even have text ~~crossed out~~

### Or if you have code to display, 
stick them between two backticks: \`<div></div>\`
Or if the code is multi-line how about between sets of 3 backticks?

\`\`\`
const exampleFunction=()=>{
    const coding='fun';
    if (coding==='fun') return true;
}
\`\`\`

>Quote some random guy on the internet?

Or

[Link](https://www.freecodecamp.com) to your favourite website?

Read up on what you can do here at [GitHub](https://guides.github.com/features/mastering-markdown/) and really go crazy!

![YAY](https://upload.wikimedia.org/wikipedia/en/3/33/Patrick_Star.svg)
`;
ReactDOM.render(<App />, document.getElementById('root'));
