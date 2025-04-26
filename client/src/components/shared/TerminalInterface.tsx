import { useState, useEffect, useRef } from "react";

interface CommandResponse {
  [key: string]: string;
}

interface TerminalInterfaceProps {
  initialCommand?: string;
  commandResponses: CommandResponse;
}

export default function TerminalInterface({ initialCommand, commandResponses }: TerminalInterfaceProps) {
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Process initial command if provided
    if (initialCommand && commandResponses[initialCommand]) {
      handleCommand(initialCommand);
    }
  }, [initialCommand, commandResponses]);

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response = "Command not recognized. Type 'help' for available commands.";
    
    if (trimmedCmd === "clear") {
      setHistory([]);
      setCurrentCommand("");
      return;
    }
    
    if (commandResponses[trimmedCmd]) {
      response = commandResponses[trimmedCmd];
    }
    
    setHistory(prev => [...prev, { command: cmd, response }]);
    setCurrentCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="terminal-container p-4 font-mono text-sm" 
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="flex items-center mb-3">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <span className="ml-3 text-muted-foreground text-xs">terminal@unique:~</span>
      </div>
      
      <div className="terminal-text text-primary">
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="mb-1">$ <span className="text-foreground">{item.command}</span></p>
            <div className="text-muted-foreground whitespace-pre-line">{item.response}</div>
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent border-none outline-none text-foreground w-full"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
}
