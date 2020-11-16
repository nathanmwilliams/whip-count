import { STATUS_TO_SHOW } from '../constants';
import {
    getSenatorsByStatus,
    getFilteredSenators
} from './selectors';

const mockSenators = [
    {
        name: 'senator 1',
        status: "1",
        [STATUS_TO_SHOW]: "1"
    },
    {
        name: 'senator 2',
        status: "2",
        [STATUS_TO_SHOW]: "2"
    }
]

describe('getSenatorsByStatus', () => {
    
    test('it senators as a object mapped by status', () => {
        const mappedSenators = getSenatorsByStatus(mockSenators)
        expect(mappedSenators[1].length).toEqual(1)
        expect(mappedSenators[2].length).toEqual(1)

    })
    test('if a filter is selected, only returns senators with that filter value', () => {
        const filterKey = "status";
        const filerValue = "1"
        const filtered = getFilteredSenators(mockSenators, filterKey, filerValue);
        expect(filtered.length).toEqual(1);

    })
    test('no filter, return whole list', () => {
        const filterKey = "";
        const filerValue = "1"
        const filtered = getFilteredSenators(mockSenators, filterKey, filerValue);
        expect(filtered.length).toEqual(mockSenators.length);
    })
})