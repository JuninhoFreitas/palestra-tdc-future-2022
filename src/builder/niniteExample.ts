//Proposta do aplicativo: montar pacotes de instalação de programas agrupados em um só lugar de acordo com o perfil;

interface Builder {
  edge(): void;
  teams(): void;
  onedrive(): void;
  steam(): void;
  teamspeak(): void;
}

class InstallerBuilder implements Builder {
  private pack: PackPrograms;
  
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.pack = new PackPrograms();
  }

  public edge(): void {
    this.pack.programs.push("Microsoft Edge.exe");
  }

  public teams(): void {
    this.pack.programs.push("Microsoft Teams.exe");
  }

  public onedrive(): void {
    this.pack.programs.push("Microsoft OneDrive.exe");
  }

  public steam(): void {
    this.pack.programs.push("Steam.exe");
  }

  public teamspeak(): void {
    this.pack.programs.push("Teamspeak.exe");
  }

  public getPack(): PackPrograms {
    const result = this.pack;
    this.reset();
    return result;
  }
}
class DocsBuilder implements Builder {
  private pack: PackDocs;
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.pack = new PackDocs();
  }

  public edge(): void {
    this.pack.docs.push("Microsoft Edge.pdf");
  }

  public teams(): void {
    this.pack.docs.push("Microsoft Teams.pdf");
  }

  public onedrive(): void {
    this.pack.docs.push("Microsoft OneDrive.pdf");
  }

  public steam(): void {
    this.pack.docs.push("Steam.pdf");
  }

  public teamspeak(): void {
    this.pack.docs.push("Teamspeak.pdf");
  }

  public getPack(): PackDocs {
    const result = this.pack;
    this.reset();
    return result;
  }
}

class PackDocs {
  public docs: string[] = [];

  public listPrograms(): void {
    console.log(`All documentations in this pack: ${this.docs.join(", ")}\n`);
  }
}

class PackPrograms {
  public programs: string[] = [];

  public listPrograms(): void {
    console.log(`All programs in this pack: ${this.programs.join(", ")}\n`);
  }
}

class Director {
  private builder: Builder;

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
  const installerBuilder = new InstallerBuilder();
  const docsBuilder = new DocsBuilder();
  director.setBuilder(installerBuilder);

  console.log("Package with Gaming programs:");
  director.buildGamingPackage();
  installerBuilder.getPack().listPrograms();

  console.log("Package with only documentations of Microsoft:");
  director.setBuilder(docsBuilder);
  director.buildMicrosoftPackage();
  docsBuilder.getPack().listPrograms();
}

const director = new Director();
clientCode(director);

console.log("Custom Package");
const docsBuilder = new DocsBuilder();
docsBuilder.teams();
docsBuilder.steam();
docsBuilder.getPack().listPrograms();
