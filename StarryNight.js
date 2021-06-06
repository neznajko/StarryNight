////////////////////////////////////////////////////////////////
//                                                             -
// ioinformatics.org/files/ioi1998problem2.pdf                 -
//                                                             -
// Clusters can be identified with /dfs/ so the more difficult -
// problem is how to figure similarities2 F there's an m cross -
// n array than we can put system orig at the 4 corners with 2 -
// possible orientations of i and j coors totally 8 scenarios. -
//                                                             -
// a) base orientation( m = 3, n = 4 )                         -
//                                                             -
//    +--0--1--2--3--> j                                       -
//    |                                                        -
//    0  .  *  .  .                                            -
//    |                                                        -
//    1  *  *  .  .                                            -
//    |                                                        -
//    2  .  *  *  *                                            -
//    |                                                        -
//  i v                                                        - 
//                                                             -
// b) switch i and j                                           -
//                                                             -
//    +--0--1--2--3--> i, this will      +--0--1--2--> j'      -
//    |                   correspond to  |                     -
//    0  .  *  .  .       this:          0  .  *  .            -
//    |                                  |                     -
//    1  *  *  .  .       And here are   1  *  *  *            -
//    |                   the transform  |                     -
//    2  .  *  *  *       ations:        2  .  .  *            -
//    |                                  |                     -
//  j v                   i' = j         3  .  .  *            - 
//                        j' = i         |                     -
//                                    i' v                     -
//                                                             -
//  two arrays a and a' will be similar in this case if        -
//  a[i][j] = a'[i'][j']                                       -
//                                                             -
// c) north-east                                               -
//                                                             -
//  j <--3--2--1--0--+  j' = n - 1 - j  +--0--1--2--3--> j'    -
//                   |                  |                      -
//       .  *  .  .  0  i' = i          0  .  .  *  .          -
//                   |                  |                      -
//       *  *  .  .  1                  1  .  .  *  *          -
//                   |                  |                      -
//       .  *  *  *  2                  2  *  *  *  .          -
//                   |                  |                      -
//                   v i             i' v                      - 
// d) switched                                                 -
//                                                             -
//  i <--3--2--1--0--+  i' = n - 1 - j  +--0--1--2--> j'       -
//                   |                  |                      -
//       .  *  .  .  0  j' = i          0  .  .  *             -
//                   |                  |                      -
//       *  *  .  .  1                  1  .  .  *             -
//                   |                  |                      -
//       .  *  *  *  2                  2  *  *  *             -
//                   |                  |                      -
//                   v j                3  .  *  .             - 
//                                      |                      -
//                                   i' v                      -
// e) south-east                                               -
//                   ^ i                +--0--1--2--3--> j'    -
//                   |                  |                      -
//       .  *  .  .  2  i' = m - 1 - i  0  *  *  *  .          -
//                   |  j' = n - 1 - j  |                      -
//       *  *  .  .  1                  1  .  .  *  *          -
//                   |                  |                      -
//       .  *  *  *  0                  2  .  .  *  .          -
//                   |                  |                      -
//  j <--3--2--1--0--+               i' v                      - 
//                                                             -
// f) switched                                                 -
//                   ^ j                +--0--1--2--> j'       -
//                   |                  |                      -
//       .  *  .  .  2  i' = n - 1 - j  0  *  .  .             -
//                   |  j' = m - 1 - i  |                      -
//       *  *  .  .  1                  1  *  .  .             -
//                   |                  |                      -
//       .  *  *  *  0                  2  *  *  *             -
//                   |                  |                      -
//  i <--3--2--1--0--+                  3  .  *  .             - 
//                                      |                      -
//                                   i' v                      -
// g) south-west                                               -
//                                                             -
//  i ^                                 +--0--1--2--3--> j'    -
//    |                                 |                      -
//    2  .  *  .  .     i' = m - 1 - i  0  .  *  *  *          -
//    |                 j' = j          |                      -
//    1  *  *  .  .                     1  *  *  .  .          -
//    |                                 |                      -
//    0  .  *  *  *                     2  .  *  .  .          -
//    |                                 |                      -
//    +--0--1--2--3--> j             i' v                      - 
//                                                             -
// h) switched                                                 -
//                                                             -
//  j ^                                 +--0--1--2--> j'       -
//    |                                 |                      -
//    2  .  *  .  .     i' = j          0  .  *  .             -
//    |                 j' = m - 1 - i  |                      -
//    1  *  *  .  .                     1  *  *  *             -
//    |                                 |                      -
//    0  .  *  *  *                     2  *  .  .             -
//    |                                 |                      -
//    +--0--1--2--3--> i                3  *  .  .             -
//                                      |                      -
//                                   i' v                      -
//                                                             -
////////////////////////////////////////////////////////////////
function gtgo( i, j )
/** good to go2 Here stars is a global 2d array representing a
 * night map with 1 being a star, 0 sky and 2 frame. vis is a
 * visited history ck. */
{
    return stars[i][j] == 1 && vis[i][j] == 0;
}
var dfs = () =>
/** Gather all connected stars. */
{   var coors = [];

    function explore( m, n )
    /** This is a closure its relationship with dfs is like a
     * global function with respect to the global scope */
    {   vis[m][n] = 1; // mark as visited

        for( var dm = -1; dm < 2; ++dm )     // nbor loop
        {   for( var dn = -1; dn < 2; ++dn ) //
            {   const i = m + dm;
                const j = n + dn;
                if( gtgo( i, j ))explore( i, j );
            }
        }
        coors.push([ m, n ]);
    }
    const hack = HEIGHT - 1;
    const wack = WIDTH  - 1;

    var stk = []; // collection of unique type of clusters

    function srch( cluster )
    /** check whether cluster is'n stk */
    {   var j = 0;
        for(; j < stk.length; ++j )
        {   if( similar( stk[j].mtrx, cluster.mtrx ))
            {   break; }}
        return j; }

    for( var i = 1; i < hack; ++i ){
        for( var j = 1; j < wack; ++j ){
            if( gtgo( i, j )){
                coors = [];
                explore( i, j );
                var cluster = new Cluster( coors );
                const k = srch( cluster );
                if( k == stk.length ) // new stuff
                {
                    stk.push( cluster );
                }
                // wow1 what is this2
                const lab = "abcdefghijklmnopqrstuvwxyz"[k];
                // here out is the output array
                for( var [ u, v ] of coors )
                {
                    out[u][v] = lab;
                }}}}
    
    return coors;
}
////////////////////////////////////////////////////////////////
function Cluster( coors )
/** Here coors is list of (i, j) pairs, from them identify i, j
 * ranges and extract the corresponding array from stars. */
{
    const back = coors.length - 1;
    // [1] get i-range
    coors = coors.sort(( x, y ) => x[0] - y[0] );
    irange = [coors[0][0], coors[back][0]];
    const m = irange[1] - irange[0] + 1;
    // [2] get j-range
    coors = coors.sort(( x, y ) => x[1] - y[1] );
    jrange = [coors[0][1], coors[back][1]];
    const n = jrange[1] - jrange[0] + 1;
    // [3] get orig and matrix
    const orig = [irange[0], jrange[0]];
    var mtrx = [...Array( m )].map( e => Array( n )); // 2d
    for( var i = 0; i < m; ++i ){
        for( var j = 0; j < n; ++j )
        {   const k = orig[0] + i;
            const l = orig[1] + j;
            mtrx[i][j] = stars[k][l];
        }}
    // [4] yezs?
    this.mtrx = mtrx;
}
////////////////////////////////////////////////////////////////
function similar( x, y )
/** Checks vhether x and y are similar. */
{
    const m = x.length;    // i
    const n = x[0].length; // j
    
    const m1 = y.length;
    const n1 = y[0].length;
    
    var seconda; // scenario
    
    if( m == m1 && n == n1 )
    {
        seconda = 0; // same shapes
    }
    else if( m == n1 && n == m1 )
    {
        seconda = 1; // flip shapes
        
    } else {

        return false; // not similar
    }
    // transformations that preserve shape
    const prima = [
        ( i, j ) => [         i,         j ], // a)
        ( i, j ) => [         i, n - 1 - j ], // c)
        ( i, j ) => [ m - 1 - i, n - 1 - j ], // e)
        ( i, j ) => [ m - 1 - i,         j ], // g)
    ];
    // transformations that flip shape
    const terza = [
        ( i, j ) => [         j,         i ], // b)
        ( i, j ) => [ n - 1 - j,         i ], // d)
        ( i, j ) => [ n - 1 - j, m - 1 - i ], // f)
        ( i, j ) => [         j, m - 1 - i ], // h)
    ];
    const T = [prima, terza][seconda]; // transformation

    function ck( k ) // check kth T
    {
        const f = T[k];
        
        for( var i = 0; i < m; ++i ){
            for( var j = 0; j < n; ++j )
            {
                const[ i1, j1 ] = f( i, j );
                
                if( x[i][j] != y[i1][j1] )return false;
            }
        }
        return true;
    }
    for( var k = 0; k < 4; ++k )
    {
        if( ck( k ))return true;
    }
    return false;
}
const npt = `
==================
=              * =
=   *         ** =
=  ***         * =
=        *       =
=         *      =
=      *  *   *  =
=   ***          =
=             *  =
= **       ***   =
==================
`;
console.log( npt );
const legend = {
    ' ': 0,
    '*': 1,
    '=': 2
};
// split new lines and discard empty entries
var stars = npt.split( '\n' ).filter( String );
// map string characters to numeric values
stars = stars.map( s => Array.from( s, x => legend[x] ));
// night dimensions
const HEIGHT = stars.length;
const WIDTH = stars[0].length;
// visited array
var vis = Array.from({ length: HEIGHT });
vis = vis.map( x => Array( WIDTH ).fill( 0 ));
// output
var out = Array.from({ length: HEIGHT });
out = out.map( x => Array( WIDTH ).fill( ' ' ));
////////////////////////////////////////////////////////////////
dfs();
// set out frame
const hack = HEIGHT - 1;
const wack = WIDTH  - 1;
for( var j = 0; j < WIDTH; ++j ){
    out[0][j] = '=';
    out[hack][j] = '=';
}
for( var i = 1; i < hack; ++i ){
    out[i][0] = '=';
    out[i][wack] = '=';
}
console.log( out.map( x => x.join( "" )).join( "\n" ));
////////////////////////////////////////////////////////////////
// log: Check out the merch!
