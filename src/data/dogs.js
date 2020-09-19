import {
    TEAM,
    WHEEL,
    LEAD,
    COMMAND_LEAD,
    NEUTERED,
    MALE,
    FEMALE,
    YEARLING,
    ASSERTIVE,
    SHORT_HAIR
} from '../constants';

export default [{
        name: 'Hari',
        tags: [NEUTERED, TEAM, MALE],
        image: 'hari.png'
    },
    {
        name: 'Zagat',
        tags: [YEARLING, LEAD, MALE],
        image: 'zagat.png'
    },
    {
        name: 'Flame',
        tags: [NEUTERED, SHORT_HAIR, TEAM, FEMALE],
        image: 'flame.png'
    },
    {
        name: 'Spike',
        tags: [NEUTERED, LEAD, TEAM, WHEEL, MALE],
        image: 'spike.png'
    },
    {
        name: 'Dora',
        tags: [YEARLING, ASSERTIVE, TEAM, WHEEL, FEMALE],
        image: 'dora.png'
    },
    {
        name: 'Refried',
        tags: [NEUTERED, TEAM, FEMALE],
        image: 'refried.png'
    },
    {
        name: 'Donut',
        tags: [NEUTERED,ASSERTIVE, TEAM, FEMALE],
        image: 'donut.png'
    },
    {
        name: 'Colbert',
        tags: [WHEEL, MALE],
        image: 'colbert.png'
    },
    {
        name: 'Helli',
        tags: [ASSERTIVE, TEAM, FEMALE],
        image: 'helli.png'
    },
    {
        name: 'Jeff Sharlet',
        tags: [NEUTERED, TEAM, MALE],
        image: 'jeff-sharlet.png'
    },
    {
        name: 'Pepe',
        tags: [NEUTERED, COMMAND_LEAD, MALE],
        image: 'pepe.png'
    },
    {
        name: 'Jules',
        tags: [YEARLING, TEAM, MALE],
        image: 'jules.png'
    },
    {
        name: 'Boo',
        positions: [SHORT_HAIR, TEAM, LEAD, WHEEL, MALE],
        image: 'boo.png'
    },
    {
        name: 'Jenga',
        positions: [NEUTERED, ASSERTIVE, SHORT_HAIR, COMMAND_LEAD, TEAM, FEMALE],
        image: 'jenga.png'
    },
    {
        name: 'Biggie',
        positions: [YEARLING, TEAM, WHEEL, MALE],
        image: 'biggie.png'
    },
    {
        name: 'Grinch',
        positions: [NEUTERED, TEAM, WHEEL, MALE],
        image: 'grinch.png'
    },
]