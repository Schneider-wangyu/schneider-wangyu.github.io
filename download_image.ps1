$t = Get-Date -Format 'yyyyMMddHHmm'
$dest = 'C:\Users\Administrator\Documents\schneider-blog\source\images\schneider-news-' + $t + '.jpg'
$url = 'https://images.unsplash.com/photo-1518770660439-4636190af475'
Invoke-WebRequest -Uri $url -OutFile $dest -UserAgent "Mozilla/5.0"
Write-Output $dest