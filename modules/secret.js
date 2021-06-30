'use-strict'

/**
 * Module exports.
 * @public
 */

const {
    scryptSync,
    createCipheriv,
    createDecipheriv
} = require('crypto');

const iv = Buffer.alloc(16, 0); //  генерация вектора инициализации

class ModernCrypto {

    encryptCip = function (toEncrypt, password, algorithm) {
        const key = scryptSync(password, 'salt', Number(algorithm.split('-')[1]) / 8);
        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = '';
        cipher.setEncoding('hex');

        cipher.on('data', (chunk) => encrypted += chunk);
        // cipher.on('end', () => console.log(encrypted));

        cipher.write(toEncrypt);
        cipher.end();
        return encrypted;
    };

    decryptCip = function (toDecrypt, password, algorithm) {
        const key = scryptSync(password, 'salt', Number(algorithm.split('-')[1]) / 8);
        const decipher = createDecipheriv(algorithm, key, iv);

        let decrypted = '';
        decipher.on('readable', () => {
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        });
        // decipher.on('end', () => {
        //     console.log(decrypted);
        //     // Prints: some clear text data
        // });

        // Encrypted with same algorithm, key and iv.

        decipher.write(toDecrypt, 'hex');
        decipher.end();
        return decrypted;
    };
}

module.exports = new ModernCrypto;