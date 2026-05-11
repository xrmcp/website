export interface TerminalCommand {
  prefix: string
  text: string
}

export const terminalCommands: TerminalCommand[] = [
  { text: 'brew tap xrmcp/homebrew-tap', prefix: '$' },
  { text: 'brew install xrmcp', prefix: '$' },
  { text: 'sudo dpkg -i xrmcp_<version>_amd64.deb', prefix: '$' },
  { text: 'scoop bucket add xrmcp https://github.com/xrmcp/homebrew-tap', prefix: '$' },
  { text: 'scoop install xrmcp', prefix: '$' },
  { text: 'xrmcp server start -t http -p 8000', prefix: '$' },
  { text: 'xrmcp tool search jira', prefix: '$' },
  { text: 'xrmcp tool install jira/get_jira_ticket', prefix: '$' },
  { text: 'xrmcp tool install ./my-tool.xrmcp.json', prefix: '$' },
  { text: 'Connect your AI agent to the runtime', prefix: '#' },
]
