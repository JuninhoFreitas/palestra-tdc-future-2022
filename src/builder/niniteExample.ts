//Proposta do aplicativo: montar pacotes de instalação de programas agrupados em um só lugar de acordo com o perfil;

interface Builder {
    edge(): void;
    teams(): void;
    onedrive(): void;
    steam(): void;
    teamspeak(): void;
}

class allInOnePackage implements Builder {
    private pack: Pack;
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.pack = new Pack();
    }

    public edge(): void {
        this.pack.programs.push('Microsoft Edge');
    }

    public teams(): void {
        this.pack.programs.push('Microsoft Teams');
    }

    public onedrive(): void {
        this.pack.programs.push('Microsoft OneDrive');
    }

    public steam(): void {
        this.pack.programs.push('Steam');
    }
    
    public teamspeak(): void {
        this.pack.programs.push('Teamspeak');
    }

    public getPack(): Pack {
        const result = this.pack;
        this.reset();
        return result;
    }
}

class Pack {
    public programs: string[] = [];

    public listPrograms(): void {
        console.log(`All programs in this pack: ${this.programs.join(', ')}\n`);
    }
}

class Director {
    private builder: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }
    public buildMicrosoftPackage(): void {
        this.builder.edge();
        this.builder.teams();
        this.builder.onedrive();
    }

    public buildGamingPackage(): void {
        this.builder.steam();
        this.builder.teamspeak();
    }
}

function clientCode(director: Director) {
    const builder = new allInOnePackage();
    director.setBuilder(builder);

    console.log('Package with Gaming programs:');
    director.buildGamingPackage();
    builder.getPack().listPrograms();

    console.log('Package with only Microsoft programs:');
    director.buildMicrosoftPackage();
    builder.getPack().listPrograms();

    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom Package:');
    builder.teams();
    builder.steam();
    builder.getPack().listPrograms();
}

const director = new Director();
clientCode(director);


