
const express = require('express');
const pure = require('nostr-tools/pure');
const relay = require('nostr-tools/abstract-relay');

const converter = require('bech32-converting');

// Create a converter with the desired prefix (e.g., 'npub')
const npubConverter = converter('npub');
const nsecCOnverter = converter('nsec');

const app = express();
const port = 3000;

app.use(express.json());


var bytesToHex = bytes => bytes.reduce( ( str, byte ) => str + byte.toString( 16 ).padStart( 2, "0" ), "" );


app.get('/', async (req, res) => {

    //criando par de chaves
    
    let sk = pure.generateSecretKey(); // secret key é um Uint8Array
    let pk = pure.getPublicKey(sk);    // public key é uma string hexadecimal

    console.log(sk)

    hexSecret = bytesToHex(sk)

    let npub = npubConverter.toBech32(hexSecret)
    let nsec = nsecCOnverter.toBech32(pk)

    console.log(hexSecret, pk);
    res.send(`Private Key: ${hexSecret}<br>Public Key: ${pk}<br><br><br>
              Nsec: ${nsec} <br> <br> Npub: ${npub}`);
    console.log(hexSecret, pk, nsec, npub);
    

    //criando evento e assinando para publicar 

    let event = pure.finalizeEvent({
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'Hellooo from Nostr'
    }, sk)

    console.log(event)

    let isGood = pure.verifyEvent(event)


    //conectando e interagindo com relay

    /*relay = await AbstractRelay.connect('wss://cl.purplerelay.com')
    console.log(`Conectado ao Relay: ${relay.url}`)*/


});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
