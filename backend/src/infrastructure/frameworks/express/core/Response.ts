export class Response{
    [key: string]: any;
    constructor(public code: number, public data: any){}

    addProperty(key: string, value: any){
        this[key] = value;
        return this;
    }

    static Fail(code: number, data: any){
        if(code < 400) throw new Error("Fail response must have a code greater than 400");
        return new Response(code, data);
    }

    static Success(data: any, code: number = 200){
        return new Response(code, data);
    }

    static SuccessPaginated(data: any, total: number, page: number, limit: number){
        return new Response(200, data)
            .addProperty('total', total)
            .addProperty('page', page)
            .addProperty('hasNext', total > page * limit)
    }

    get isFailure(){
        return this.code >= 400;
    }


    toObject(){
        if(this.isFailure) return {error: this.data, code: this.code};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {data: this.data, ...this, code: undefined};
    }
}