import { Buffer } from "buffer";

 class pagSeguroPayment {
    public getInfo(): string {
        return 'pagseguro_confirmed';
    }
}

class mercadoPagoPayment {
    public getPaymentInfo(): string {
        return 'bWVyY2Fkb3BhZ29fY29uZmlybWVk';
    }
}

class AdapterMercadoPago extends pagSeguroPayment {
    private adaptee: mercadoPagoPayment;

    constructor(adaptee: mercadoPagoPayment) {
        super();
        this.adaptee = adaptee;
    }

    public getInfo(): string {
        const encodedInfo = this.adaptee.getPaymentInfo();
        const result = Buffer.from(encodedInfo, 'base64').toString('utf8');
        return `${result}`;
    }
}

function clientCode(target: pagSeguroPayment) {
    console.log(target.getInfo());
}

console.log('\nClient: Can validate without decode from Pag Seguro:');
const target = new pagSeguroPayment();
clientCode(target);

const adaptee = new mercadoPagoPayment();
console.log('\nClient: Can\'t understand the information from Mercado Livre:');
console.log(`Adaptee: ${adaptee.getPaymentInfo()}`);

console.log('\nClient: But I can work with it via the Adapter:');
const adapter = new AdapterMercadoPago(adaptee);
clientCode(adapter);
