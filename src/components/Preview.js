// external
// dom sanitizer
import DOMPurify from 'dompurify';
// markdown converter
import marked from 'marked'; 

// markdown converter settings
marked.setOptions({
    pedantic: false,
    gfm: true,
    breaks: true

});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

// given markdown, renders it into safe html
const Preview = props => {
    const sanitizeNCreate = () => {
        return {
            __html: DOMPurify.sanitize(marked(props.markky, renderer))
        }
    }
    return (
        <div id="preview" dangerouslySetInnerHTML={sanitizeNCreate()} />

    )
}

export default Preview;