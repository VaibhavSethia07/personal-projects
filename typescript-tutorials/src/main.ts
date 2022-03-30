// T- represent generic datatype <T> specifies datatype used in function
const addId = <T extends object>(obj: T) => {
    const id = Math.random().toString(16);
    return {id,
        ...obj
    }
}

// We can use generic T datatype. We can sepecify more generic data types.
interface UserInterface<T> {
    name: string;
    data: T;
}

const user: UserInterface<{meta: string}> = {
    name: 'Jack',
    data: {
        meta: 'foo',
    }
}

const user2: UserInterface<string[]> = {
    name: 'John',
    data: ['foo', 'bar', 'baz']
}
