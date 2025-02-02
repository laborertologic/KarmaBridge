# gen secrets
#secrets.PS1
# Set key size (e.g., 2048 bits)
$keySize = 2048
mkdir '.\packages\server\secrets'
$FOLDER = '.\packages\server\secrets'
if (!$FOLDER)
{
    mkdir '.\packages\server\secrets'
}

# Create an RSA instance and generate a new key pair
$rsa = [System.Security.Cryptography.RSA]::Create($keySize)

# Export the RSA keys in DER (binary) format
$privateKeyBytes = $rsa.ExportRSAPrivateKey()  # PKCS#1 DER format
$publicKeyBytes = $rsa.ExportRSAPublicKey()   # X.509 SubjectPublicKeyInfo DER format

# Convert the byte arrays to Base64 strings, inserting line breaks for readability
function Convert-ToPemString
{
    param(
        [byte[]]$Bytes,
        [int]$LineLength = 64
    )
    $base64 = [Convert]::ToBase64String($Bytes)
    return ($base64 -split "(.{$LineLength})" | Where-Object { $_ -match "\S" }) -join "`n"
}

$privateKeyBase64 = Convert-ToPemString -Bytes $privateKeyBytes
$publicKeyBase64 = Convert-ToPemString -Bytes $publicKeyBytes

# Create PEM-formatted strings
$privateKeyPem = @"
-----BEGIN RSA PRIVATE KEY-----
$privateKeyBase64
-----END RSA PRIVATE KEY-----
"@

$publicKeyPem = @"
-----BEGIN RSA PUBLIC KEY-----
$publicKeyBase64
-----END RSA PUBLIC KEY-----
"@

# Define output file paths
$privateKeyPath = "$FOLDER\private_key.pem"
$publicKeyPath = "$FOLDER\public_key.pem"

# Write the keys to files
Set-Content -Path $privateKeyPath -Value $privateKeyPem -Encoding ascii
Set-Content -Path $publicKeyPath -Value $publicKeyPem -Encoding ascii

Write-Host "RSA key pair generated:"
Write-Host "Private key saved to: $privateKeyPath"
Write-Host "Public key saved to:  $publicKeyPath"
