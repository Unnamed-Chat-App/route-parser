import {compiledGrammar} from './compiled-grammar.mjs';
import {nodes} from './nodes.mjs';

/** Wrap the compiled parser with the context to create node objects */
var Parser = compiledGrammar.parser;
Parser.yy = nodes;
export {Parser};