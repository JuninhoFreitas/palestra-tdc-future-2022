const aws = {
  upload:(...opts):UploadResult=>({
    success: true,
    message: "Uploaded to AWS storage",
  }),
}
const drive = {
  files:{
    create:(...opts):UploadResult=>({
      success: true,
      message: "Uploaded to Drive storage",
    }),
  }
}
interface UploadResult {
  success: boolean;
  message: string;
}

interface UploadStrategy {
  upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult>;
}

class DriveUpload implements UploadStrategy {
  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {

      const result = drive.files.create({filePath,name,content});

      resolve(result);
    });
  }
}

class AWSUpload implements UploadStrategy {
  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const result = aws.upload({filePath, name, content});
      resolve(result);
    });
  }
}

class Context {
  private strategy: UploadStrategy;

  constructor(strategy: UploadStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: UploadStrategy) {
    this.strategy = strategy;
  }

  public fileUpload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return this.strategy.upload(filePath, name, content);
  }
}

const driveUpload = new DriveUpload();
const awsUpload = new AWSUpload();

const context = new Context(driveUpload);

context.fileUpload("/", "Output.txt", "Hello World").then((result) => {
  console.log(result);
});

context.setStrategy(awsUpload);

context.fileUpload("/", "Output.txt", "Okay!").then((result) => {
  console.log(result);
});
