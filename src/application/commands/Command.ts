export abstract class Command{
    abstract name: string;
    abstract execute(): Promise<void>;

}