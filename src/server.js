const express = require('express');
const path = require('path');
const { generateSecretKey, getPublicKey, finalizeEvent, verifyEvent } = require('nostr-tools/pure');
const { bytesToHex, hexToBytes } = require('@noble/hashes/utils');

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Endpoint para criar e retornar um evento Nostr
app.get('/api/event', (req, res) => {
    // Criando o par de chaves. Primeiro cria-se uma secret, e a partir dela gera-se uma pública.
    let secretKey = generateSecretKey(); // uint8Array
    let publicKey = getPublicKey(secretKey); // hex string

    // Transformando a chave privada em hex
    let secretKeyHex = bytesToHex(secretKey);

    // Criando e verificando evento
    let event = finalizeEvent({
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'Hellooo from Nostr'
    }, secretKey);

    let isGood = verifyEvent(event);

    res.json({
        secretKeyHex,
        publicKey,
        event,
        isGood
    });
});

// Servir o arquivo index.html na rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
