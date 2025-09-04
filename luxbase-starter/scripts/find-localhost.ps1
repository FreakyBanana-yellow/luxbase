# scripts/find-localhost.ps1
Get-ChildItem -Path . -Recurse -File |
  Select-String -Pattern 'localhost:4321','http://localhost','127.0.0.1' -SimpleMatch |
  Select-Object Path, LineNumber, Line
