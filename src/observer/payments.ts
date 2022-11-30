 interface PaymentData {
    payment_id: String;
    isSuspect: Boolean;
 }

 interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(data: Object): void;
}

class PaymentsSubject implements Subject {
    public isSuspect: number;
    private observers: Set<Observer> = new Set();
    public attach(observer: Observer): void {
        this.observers.add(observer)
        console.log('PaymentSubject: Attached an observer.');
    }
    public detach(observer: Observer): void {
        this.observers.delete(observer)
        console.log('PaymentSubject: Detached an observer.');
    }
    public notify(data:PaymentData): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
    public doPayment(payment:PaymentData): void {
        console.log('\nPaymentSubject: Received a payment.');
        this.notify(payment);
    }
}

interface Observer {
    update(payment: PaymentData): void;
}

class IssuerObserver implements Observer {
    public update(paymentData: PaymentData): void {
        if (!paymentData.isSuspect) {
            console.log(`issuerObserver: Proceeding to payment ${paymentData.payment_id}.`);
        }
    }
}

class AntiFraudObserver implements Observer {
    public update(paymentData: PaymentData): void {
        if (paymentData.isSuspect) {
            console.log(`antiFraudObserver: Blocking payment ${paymentData.payment_id}, Reason: Fraud.`);
        }
    }
}

const subject = new PaymentsSubject();

const issuerObserver = new IssuerObserver();
subject.attach(issuerObserver);

const antiFraudObserver = new AntiFraudObserver();
subject.attach(antiFraudObserver);

subject.doPayment({payment_id: '1', isSuspect: false});
subject.doPayment({payment_id: '2', isSuspect: true});

//Desativou o anti-fraud
subject.detach(antiFraudObserver);
subject.doPayment({payment_id: '3', isSuspect: true});
