import { useEffect, useState } from 'react';
import Markdoc from '@markdoc/markdoc';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [htmlText, setHtmlText] = useState(null);

  useEffect(() => {
    async function readText() {
      if (selectedFile) {
        const text = await selectedFile.text();

        const ast = Markdoc.parse(text);
        const content = Markdoc.transform(ast);
        const html = Markdoc.renderers.html(content);

        setHtmlText(html);
      }
    }

    readText();
  }, [selectedFile]);

  return (
    <div>
      <p className="app">HELLO</p>
      <input
        type="file"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
    </div>
  );
}

export default App;
