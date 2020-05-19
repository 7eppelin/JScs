import Prism from 'prismjs';
import { Node } from 'slate'

// integrating prismjs with slate

// this is going to get attached to Editable in ContentEditor


export const decorate = ([ node, path ]) => {
    if (node.type !== 'code-block') return []

    const code = Node.string(node)
    const ranges = [];
    const tokens = Prism.tokenize(code, Prism.languages.javascript);
    let start = 0;

    for (const token of tokens) {
        const length = getTokenLength(token);
        const end = start + length;

        if (typeof token !== 'string') {
            ranges.push({
                token: token.type,
                anchor: { path, offset: start },
                focus: { path, offset: end }
            })
        }

        start = end;
    }
    return ranges;
}

const getTokenLength = token => {
    if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getTokenLength(t), 0)
      }
}