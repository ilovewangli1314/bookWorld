import proxy from './proxy';

export default {
    test: (id: number) => proxy.get(`/books/${id}`)
};
