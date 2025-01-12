export function formDataToObject(formData: FormData) {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}