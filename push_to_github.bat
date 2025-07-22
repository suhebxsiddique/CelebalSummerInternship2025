@echo off
echo Starting GitHub push with backdated commit...
powershell -ExecutionPolicy Bypass -File "push_to_github.ps1"
pause 