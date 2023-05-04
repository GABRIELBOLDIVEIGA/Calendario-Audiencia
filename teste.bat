@echo off
start cmd /k "npx serve -s build"
timeout /t 8 /nobreak
start cmd /k "cd Robot && node Robot.js"