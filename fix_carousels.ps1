$path = 'd:\PROYECTO PETER NOV 2025\PAGINA WEB TALLER\Proyecto_TRAVE_GT\index.html'

try {
    $lines = Get-Content $path -Encoding UTF8
    
    $servicios = $lines[545..589]
    $marcas = $lines[635..652]
    $promos = $lines[683..740]
    
    $newLines = @()
    $newLines += $lines[0..544]
    $newLines += $servicios
    $newLines += $servicios
    $newLines += $lines[590..634]
    $newLines += $marcas
    $newLines += $marcas
    $newLines += $lines[653..682]
    $newLines += $promos
    $newLines += $promos
    $newLines += $promos
    $newLines += $promos
    $newLines += $lines[741..($lines.Length-1)]
    
    $newLines | Set-Content $path -Encoding UTF8
    Write-Output "Successfully updated $path"
} catch {
    Write-Error "Failed to update file: $_"
}
