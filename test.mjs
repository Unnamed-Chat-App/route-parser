import {Route} from './index.mjs';

const parse = new Route('/:foo/:bar');


console.log(parse.match('/my/route'));
console.log(parse.reverse({foo: 'test', bar: "ing"}))