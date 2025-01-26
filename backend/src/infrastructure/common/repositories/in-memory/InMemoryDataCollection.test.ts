import { InMemoryDataCollection } from './InMemoryDataCollection';  // Assurez-vous que le chemin est correct
interface SampleObject{
    stringVal: string;
    numberVal: number;
    valueObject: {
        getValue(): any;
    };
}
function generateRandomSampleObject(object ?: Partial<SampleObject>): SampleObject{
    const getValueResult = Math.random().toString(36).substring(7);
    return {
        stringVal: Math.random().toString(36).substring(7),
        numberVal: Math.floor(Math.random() * 100),
        valueObject: {
            getValue: () => getValueResult
        },
        ...(object || {})
    };
}

describe('InMemoryDataCollection', () => {
    let collection: InMemoryDataCollection<SampleObject>;

    beforeEach(() => {
        collection = new InMemoryDataCollection<SampleObject>();
    });

    test('should add an entity', () => {
        const sample: SampleObject = generateRandomSampleObject();
        collection.add(sample);

        expect(collection.count()).toBe(1);
        expect(collection.toArray()).toEqual([sample]);
    });

    test('should replace an entity', () => {
        const sample1: SampleObject = generateRandomSampleObject();
        collection.add(sample1);
        const sample2: SampleObject = generateRandomSampleObject();

        collection.replace('stringVal', sample1.stringVal, sample2);

        expect(collection.count()).toBe(1);
        expect(collection.toArray()).toEqual([sample2]);
    });

    test('should remove an entity', () => {
        const sample: SampleObject = generateRandomSampleObject();
        collection.add(sample);
        collection.remove('stringVal', sample.stringVal);
        expect(collection.count()).toBe(0);
    });

    test('should remove an entity by value object', () => {
        const sample: SampleObject = generateRandomSampleObject();
        collection.add(sample);
        collection.remove('valueObject', sample.valueObject);
        expect(collection.count()).toBe(0);
    })

    test('should filter entities based on a query', () => {
        const sample1: SampleObject = generateRandomSampleObject()
        const sample2: SampleObject = generateRandomSampleObject()
        collection.add(sample1);
        collection.add(sample2);

        const filteredCollection = collection.filter((e) => e.numberVal == sample1.numberVal);
        expect(filteredCollection.count()).toBe(1);
        expect(filteredCollection.toArray()).toEqual([sample1]);
    });

    test('should find many entities by identifier', () => {
        const sample1: SampleObject = generateRandomSampleObject({ stringVal: 'Hello' });
        const sample2: SampleObject = generateRandomSampleObject({ stringVal: 'Hello' });
        collection.add(sample1);
        collection.add(sample2);

        const foundCollection = collection.findMany('stringVal', 'Hello');

        expect(foundCollection.count()).toBe(2);
        expect(foundCollection.toArray()).toEqual([sample1, sample2]);
    });

    test('should find one entity by identifier', () => {
        const sample: SampleObject = generateRandomSampleObject()
        collection.add(sample);

        const found = collection.findOne('stringVal', sample.stringVal);

        expect(found).toEqual(sample);
    });

    test('should return false for non-existing entity', () => {
        const sample: SampleObject = generateRandomSampleObject()
        collection.add(sample);

        const exists = collection.exists('stringVal', Math.random().toString(36).substring(7));
        expect(exists).toBe(false);
    });

    test('should return true for existing entity', () => {
        const sample: SampleObject = generateRandomSampleObject({ stringVal: 'Hello' });
        collection.add(sample);

        const exists = collection.exists('stringVal', 'Hello');

        expect(exists).toBe(true);
    });

    test('should paginate data correctly', () => {
        const sample1: SampleObject = generateRandomSampleObject();
        const sample2: SampleObject = generateRandomSampleObject();
        const sample3: SampleObject = generateRandomSampleObject();
        collection.add(sample1);
        collection.add(sample2);
        collection.add(sample3);

        const paginatedCollection = collection.paginate(1, 2);

        expect(paginatedCollection.count()).toBe(2);
        expect(paginatedCollection.toArray()).toEqual([sample1, sample2]);
    });

    test('should upsert an entity if it exists', () => {
        const sample1: SampleObject = generateRandomSampleObject();
        collection.add(sample1);

        const updatedSample: SampleObject = generateRandomSampleObject();
        collection.upsert('stringVal', sample1.stringVal, updatedSample);

        expect(collection.count()).toBe(1);
        expect(collection.toArray()).toEqual([updatedSample]);
    });

    test('should insert an entity if it does not exist', () => {
        const sample: SampleObject = generateRandomSampleObject();

        collection.upsert('stringVal', 'Hello', sample);

        expect(collection.count()).toBe(1);
        expect(collection.toArray()).toEqual([sample]);
    });
});
