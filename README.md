exmaple

originalMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai'
}

add a secret_key by creating a sha-256 hash of the above object

sumCheckMessage = {
  name: 'Jack Reacher',
  origin: 'Bengaluru',
  destination: 'Mumbai',
  secret_key: "sha-256 ash of originalMessage",
}

encrypt this payload using encryption algorithm `aes-256-ctr` with a pass key

encryptedMessage = "encrypted message string"
