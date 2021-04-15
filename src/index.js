import React, { useState,useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import DOMPurify from 'dompurify';
import marked from 'marked';

marked.setOptions({
    pedantic: false,
    gfm: true,
    breaks: true

  });
  
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
  };
  

const App=()=>{
    const [markky,setMarkky] =useState(placeholder);
    //left side (editor)
    const [aMaxState, setAMaxState]=React.useState(false);
    //right side (preview)
    const [bMaxState, setBMaxState]=React.useState(false);
    //true=default layout, 
    //false=side by side
    const [screenState, setScreenState]=useState(true);
    //a=true edit is max icon is min
    //b must be false prev is min icon is max
  
    //b=true prev is max icon is min
    //a must be false edit is min icon is max
    //!a&&b both take up half of screen 
    const handleMark=e=>{
        setMarkky(e.target.value);
    }

    const handleEditCh=()=>{
        setAMaxState(!aMaxState);
        if (!aMaxState) setBMaxState(false);
    }
    const handlePrevCh=()=>{
        setBMaxState(!bMaxState);
        if (!bMaxState) setAMaxState(false);
    }

    const handleScrCh=()=>{
        setScreenState(!screenState);
      }
    return (
        <div id="app">
            <ScrCtrl scrCh={handleScrCh} 
                     scrS={screenState} />
            <Display editCh={handleEditCh} 
                     prevCh={handlePrevCh}
                     markCh={handleMark} 
                     aState={aMaxState} 
                     bState={bMaxState} 
                     scrState={screenState}
                     markky={markky}/>
        </div>
    )
}

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
const ScrCtrl=props=>{
    const icon=props.scrS?<i class="fas fa-arrows-alt-h"></i>:<i class="fas fa-arrows-alt-v"></i>;
    return (
        <div id="scrCh">
            <button id="scrBut" onClick={props.scrCh}>{icon}</button>

        </div>
    )
}

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
const EditorControl=props=>{
    const icon=props.aState?<i class="fas fa-compress-arrows-alt"></i>:<i class="fas fa-expand-arrows-alt"></i>;
    return (
      <div id="editCh">
        <button id="editBut" onClick={props.editCh}>{icon}</button>
      </div>
    )
}
const Editor=props=>{
    return (
        <textarea id="editor" onChange={props.markCh} value={props.markky} />
    )
  }
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
const PreviewControl=props=>{
    const icon=props.bState?<i class="fas fa-compress-arrows-alt"></i>:<i class="fas fa-expand-arrows-alt"></i>;
  return (
    <div id="prevCh">
      <button id="prevBut" onClick={props.prevCh}>{icon}</button>
    </div>
  )
}
const Preview=props=>{
    const sanitizeNCreate=()=>{
        return {
            __html:DOMPurify.sanitize(marked(props.markky, renderer))
        }
    }
    return (
      <div id="preview" dangerouslySetInnerHTML={sanitizeNCreate()} />

    )
  }
const placeholder = `# Welcome!

This is a previewer of GitHub flavored markdown.
  
## Markdown
What is **markdown** you ask?

Good question! Markdown is a plain text formatting syntax, created with the belief that writing for the internet should not clutter your words with lots and lots of HTML tags.

When writing markdown, instead of tags like &lt;em>&lt;/em> you can use simple symbols such as *, _, or ~ to tell the browser the text style you want to apply.

Okay, but what is **markdown flavor**? Is that like ice cream flavors?

YES! It is! and Github flavor taste just like chocolate caramel with a hint of vanilla. But it is also a specification that tells the browser how to process the special symbols.

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

### How about:
>Quoting some random guy on the internet?

Afterall, we all know that:

>No one on the internet lies, and therefore we should trust everything everyone says on the internet implicitly.    <div style="text-align: right"> -Gengis Khan</div>

Or

[Link](https://www.freecodecamp.com) to your favourite website?

Read up on what you can do here at [GitHub](https://guides.github.com/features/mastering-markdown/) and really go crazy!

![YAY](https://upload.wikimedia.org/wikipedia/en/3/33/Patrick_Star.svg)
`;
ReactDOM.render(<App />, document.getElementById('root'));
