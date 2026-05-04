[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

$imgUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
$imgPath = "C:\Users\Administrator\Documents\schneider-blog\source\images\edge-tech-202605041235.jpg"

try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    $wc.DownloadFile($imgUrl, $imgPath)
    $wc.Dispose()
    if ((Test-Path $imgPath) -and ((Get-Item $imgPath).Length -gt 5000)) {
        Write-Host ("OK:" + (Get-Item $imgPath).Length)
    } else {
        Write-Host "SMALL"
    }
} catch {
    $errMsg = $_.Exception.Message
    Write-Host ("ERR:" + $errMsg)
}