export function formDataToObject(formData: FormData): Record<string, any> {
    const result: Record<string, any> = {};

    formData.forEach((value, key) => {
        const keys = key.split('.');

        keys.reduce((acc, currentKey, index) => {
            // Vérifier si c'est un tableau avec un index
            const arrayMatch = currentKey.match(/(\w+)\[(\d+)\]/);
            if (arrayMatch) {
                const arrayKey = arrayMatch[1];
                const arrayIndex = parseInt(arrayMatch[2], 10);

                acc[arrayKey] = acc[arrayKey] || [];
                if (!acc[arrayKey][arrayIndex]) {
                    acc[arrayKey][arrayIndex] = {};
                }

                if (index === keys.length - 1) {
                    acc[arrayKey][arrayIndex] = value;
                }

                return acc[arrayKey][arrayIndex];
            } else {
                if (index === keys.length - 1) {
                    acc[currentKey] = value;
                } else {
                    acc[currentKey] = acc[currentKey] || {};
                }

                return acc[currentKey];
            }
        }, result);
    });

    return result;
}