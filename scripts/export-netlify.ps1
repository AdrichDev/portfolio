$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$destination = [IO.Path]::GetFullPath((Join-Path $root 'exports\portfolio-netlify'))
$archive = [IO.Path]::GetFullPath((Join-Path $root 'exports\portfolio-netlify.zip'))
$out = Join-Path $root 'out'
# Resolve and constrain every generated target before replacing prior exports.
if ($destination -ne (Join-Path $root 'exports\portfolio-netlify') -or $archive -ne (Join-Path $root 'exports\portfolio-netlify.zip')) {
  throw 'Export target escaped the repository.'
}
$previous = $env:PORTFOLIO_STATIC_EXPORT
Push-Location $root
try {
  $env:PORTFOLIO_STATIC_EXPORT = '1'
  & pnpm build
  if ($LASTEXITCODE -ne 0) { throw 'Static Next.js build failed.' }
  if (!(Test-Path -LiteralPath (Join-Path $out 'index.html'))) { throw 'The build did not produce index.html.' }
  if (Test-Path -LiteralPath $destination) { Remove-Item -LiteralPath $destination -Recurse -Force }
  New-Item -ItemType Directory -Path $destination -Force | Out-Null
  Get-ChildItem -LiteralPath $out -Force | Copy-Item -Destination $destination -Recurse -Force
  if (Test-Path -LiteralPath $archive) { Remove-Item -LiteralPath $archive -Force }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  Add-Type -AssemblyName System.IO.Compression
  $archiveStream = [IO.File]::Create($archive)
  $writer = [IO.Compression.ZipArchive]::new($archiveStream, [IO.Compression.ZipArchiveMode]::Create, $false)
  try {
    foreach ($file in (Get-ChildItem -LiteralPath $destination -Recurse -File)) {
      # ZIP paths use forward slashes, including under Windows PowerShell/.NET Framework.
      $relative = $file.FullName.Substring($destination.Length + 1).Replace('\', '/')
      $entry = $writer.CreateEntry($relative, [IO.Compression.CompressionLevel]::Optimal)
      $inputStream = $file.OpenRead()
      $outputStream = $entry.Open()
      try { $inputStream.CopyTo($outputStream) }
      finally { $inputStream.Dispose(); $outputStream.Dispose() }
    }
  } finally { $writer.Dispose(); $archiveStream.Dispose() }
  $zip = [IO.Compression.ZipFile]::OpenRead($archive)
  try {
    if (!$zip.GetEntry('index.html')) { throw 'ZIP must contain index.html at its root.' }
    Write-Output ('Export ready: {0} files, {1} bytes' -f $zip.Entries.Count, (Get-Item -LiteralPath $archive).Length)
  } finally { $zip.Dispose() }
  Write-Output $destination
  Write-Output $archive
} finally {
  $env:PORTFOLIO_STATIC_EXPORT = $previous
  Pop-Location
}
