export function formDataToObject(formData: FormData) {

    function parseObject(keyPath : array){
        let object = {}

        for(let key of keyPath.split(".")){

        }
    }

    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        const keyPath = key.split(".")
        if(keyPath.length == 2){
            object[keyPath[0]] = object[keyPath[0]] || {}
            object[keyPath[0]][keyPath[1]] = value
        }else object[key] = value;
    });
    return object;
}