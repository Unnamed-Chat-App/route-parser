import {Parser} from './route/parser.mjs'
import { RegexpVisitor } from './route/visitors/regexp.mjs';
import { ReverseVisitor } from './route/visitors/reverse.mjs';



/**
 * Represents a route
 * @example
 * var route = Route('/:foo/:bar');
 * @example
 * var route = Route('/:foo/:bar');
 * @param {string} spec -  the string specification of the route.
 *     use :param for single portion captures, *param for splat style captures,
 *     and () for optional route branches
 * @constructor
 */
function Route(spec) {
  var route;
  if (this) {
    // constructor called with new
    route = this;
  } else {
    // constructor called as a function
    route = Object.create(Route.prototype);
  }
  if (typeof spec === 'undefined') {
    throw new Error('A route spec is required');
  }
  route.spec = spec;
  route.ast = Parser.parse(spec);
  return route;
}

Route.prototype = Object.create(null);

/**
 * Match a path against this route, returning the matched parameters if
 * it matches, false if not.
 * @example
 * var route = new Route('/this/is/my/route')
 * route.match('/this/is/my/route') // -> {}
 * @example
 * var route = new Route('/:one/:two')
 * route.match('/foo/bar/') // -> {one: 'foo', two: 'bar'}
 * @param  {string} path the path to match this route against
 * @return {(Object.<string,string>|false)} A map of the matched route
 * parameters, or false if matching failed
 */
Route.prototype.match = function (path) {
  var re = RegexpVisitor.visit(this.ast);
  var matched = re.match(path);

  return matched !== null ? matched : false;
};

/**
 * Reverse a route specification to a path, returning false if it can't be
 * fulfilled
 * @example
 * var route = new Route('/:one/:two')
 * route.reverse({one: 'foo', two: 'bar'}) -> '/foo/bar'
 * @param  {Object} params The parameters to fill in
 * @return {(String|false)} The filled in path
 */
Route.prototype.reverse = function (params) {
  return ReverseVisitor.visit(this.ast, params);
};


export {Route};