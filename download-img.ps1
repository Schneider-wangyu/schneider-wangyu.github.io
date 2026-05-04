$timestamp = "202605041235"
$imgUrl = "https://source.unsplash.com/1200x630/?industrial,automation,technology"
$imgPath = "C:\Users\Administrator\Documents\schneider-blog\source\images\edge-tech-$timestamp.jpg"
try {
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
    $resp = Invoke-WebRequest -Uri $imgUrl -OutFile $imgPath -TimeoutSec 20 -UseBasicParsing
    if ((Test-Path $imgPath) -and ((Get-Item $imgPath).Length -gt 5000)) {
        Write-Host "IMAGE_OK"
    } else {
        Write-Host "IMAGE_TOO_SMALL"
    }
} catch {
    $errMsg = $_.Exception.Message
    Write-Host "IMAGE_ERR: $errMsg"
}