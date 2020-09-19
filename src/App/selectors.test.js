import { getAvailableDogs } from './selectors';

const mockListOfDogs = [
    {name: 'doggo 1', tags: ["tag 1"]},
    {name: 'doggo 2', tags: ["tag 2"]}
]

describe('getAvailableDogs', () => {
    
    test('it returns all dogs if no filters are selected', () => {
        const selectedFilters = [];
        expect(getAvailableDogs(mockListOfDogs).length).toEqual(mockListOfDogs.length)

    })
    test('if a filter is selected, only returns dogs with that filter in their tags list', () => {
        const selectedFilters = ['tag 1'];

    })
    test('if more than one filter is selected, only returns dogs with either of the filters in their tag list', () => {
        const selectedFilters = ['tag 1', 'tag 2'];


    })
})