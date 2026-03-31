$url = "https://my.spline.design/followcirclescopycopy-p44qUlqA2Dt8Njt8g2qPFsGj-jQ8/"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
if ($response.Content -match 'https://prod\.spline\.design/[A-Za-z0-9-]+/scene\.splinecode') {
    Write-Host $matches[0]
} else {
    Write-Host 'No match found.'
}
