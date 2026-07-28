[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$img = Invoke-WebRequest -Uri 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800' -UseBasicParsing
[System.IO.File]::WriteAllBytes('C:\Users\Administrator\Documents\schneider-blog\source\images\edge-tech-202606021051.jpg', $img.Content)
Write-Host "Download completed"