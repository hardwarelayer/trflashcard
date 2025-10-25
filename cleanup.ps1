# Cleanup script for Phase 6.1
Write-Host "Cleaning up test files and empty directories..."

# Remove empty directories
Remove-Item "src\app\[locale]\hello" -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\[locale]\simple-dashboard" -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\[locale]\test-dashboard" -Force -ErrorAction SilentlyContinue
Remove-Item "src\app\login" -Force -ErrorAction SilentlyContinue

Write-Host "Cleanup completed!"
