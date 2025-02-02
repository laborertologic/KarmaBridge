# INFO: To include startup scripts for convenience
#boot.PS1

# TODO boot and startup scripts
$NAME='KarmaBridge'

Write-Host "==== booting up $NAME....====" #general info

if (bun.exe)
{
    Write-Host "Using bun runtime...."
    Set-Location -Path './packages/server'
    bun dev
    Set-Location -Path '../'
    bun start
}
else
{
    Write-Host "No bun runtime found...."
}