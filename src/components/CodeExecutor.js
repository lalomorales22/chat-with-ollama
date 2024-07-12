import React, { useState } from 'react';
import { executeCode } from '../services/codeExecutionService';

function CodeExecutor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  const handleExecute = async () => {
    try {
      const result = await executeCode(code, language);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="code-executor">
      <h3>Code Executor</h3>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="ruby">Ruby</option>
      </select>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
      />
      <button onClick={handleExecute}>Execute Code</button>
      <pre>{output}</pre>
    </div>
  );
}

export default CodeExecutor;