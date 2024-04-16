export const convertToPlainText = (htmlString: string) => {
  // Create a new DOMParser instance
  const parser = new DOMParser();

  // Parse the HTML string into a DOM tree
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Traverse the DOM tree and extract the text content
  const textContent = getTextContent(doc.body);

  return textContent;
};

export const getTextContent = (node: any) => {
  if (node.nodeType === Node.TEXT_NODE) {
    // If the node is a text node, return its text content
    return node.textContent;
  } else if (node.nodeName === 'BR') {
    // If the node is a <br> element, return a newline character
    return '\n';
  } else {
    // If the node is an element node, traverse its children
    let textContent = '';

    for (let child of node.childNodes) {
      textContent += getTextContent(child);
    }

    return textContent;
  }
};
