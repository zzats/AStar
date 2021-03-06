
var Graph = {
    array:[],

    print:function (targetElement, arrayOfVectors, symbol) {
        var printTarget = this.array;
        if (arrayOfVectors) {
            TYPE.arrayContains(function (element) {
                if (element instanceof Vector) {
                    return true;
                }
                return false;
            }, arrayOfVectors);
            printTarget = this.array.slice();
            symbol = symbol ? symbol : '*';
            forEach(arrayOfVectors, function (element) {
                    printTarget[element.y][element.x] = symbol;
                }
            );
        }
        targetElement.html('');

        forEach(printTarget, function (row) {
            var newRow = $('<tr></tr>');
            forEach(row, function (column) {
                var cell;
                if (column == 'w') {
                    cell = $('<td class="wall"></td>')
                }
                else if (column == 'S') {
                    cell = $('<td class="start"></td>')
                }
                else if (column == 'F') {
                    cell = $('<td class="finish"></td>')
                }
                else if (column == 'x') {
                    cell = $('<td class="path"></td>')
                }
                else if (column == 'n') {
                    cell = $('<td class="neighborgh"></td>')
                } else {
                    cell = $('<td class="blank"></td>')
                }
                newRow.append(cell);
            })
            targetElement.append(newRow);
        })
    },

    getRow:function (rowNumber) {
        if (!arrayHasIndex(this.array, rowNumber)) {
            throw new RangeError("Out of range, with rownumber: " + rowNumber);
        }
        return this.array[rowNumber];
    },

    withinBounds:function (vector) {
        testVector(vector);
        return (arrayHasIndex(this.array, vector.y) && arrayHasIndex(this.getRow(vector.y), vector.x));
    },

    setGraphPoint:function (vector, target) {
        testVector(vector);
        if (!this.withinBounds(vector)) {
            throw new RangeError("Out of range with value: " + vector);
        }
        this.array[vector.y][vector.x] = target;
    },

    getGraphPoint:function (vector) {
        return this.array[vector.y][vector.x];
    },

    getNeighborghs:function (position, allowDiagonals) {
        testVector(position);
        var candidates = [
            new Vector(position.x - 1, position.y), // LEFT
            new Vector(position.x + 1, position.y), // RIGHT
            new Vector(position.x, position.y - 1), // DOWN
            new Vector(position.x, position.y + 1)  // UP
        ];
        if (allowDiagonals === true) {
            candidates.push(new Vector(position.x - 1, position.y - 1)); // TOP LEFT
            candidates.push(new Vector(position.x + 1, position.y - 1)); // TOP RIGHT
            candidates.push(new Vector(position.x - 1, position.y + 1)); // BOTTOM LEFT
            candidates.push(new Vector(position.x + 1, position.y + 1)); // BOTTOM RIGHT
        }
        var result = [];
        var _this = this;
        forEach(candidates, function (candidate) {
            if (_this.withinBounds(candidate) && _this.getGraphPoint(candidate) !== 'w') {
                result.push(candidate);
            }
        });
        return result;
    }
}

/*
    VARSINAISET KUTSUT
 */


function getComplexGraph() {
    return [
        ['0', 'w', '0', '0', '0', '0', '0', '0', '0', 'w', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', '0', '0', '0', '0', '0', 'w', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', '0', '0', '0', 'w', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', '0', '0', '0', 'w', 'w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', 'w', 'w', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', 'w', 'w', '0', 'w', 'w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', 'w', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', '0', '0', '0', 'w', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'w', 'w', 'w', '0', 'w', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', 'w', '0', 'w', '0', '0', '0', 'w', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0']
    ];
}
;

function getSimpleGraph() {
    return [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', 'w', 'w', 'w', 'w', 'w', 'w', 'w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    ];
}

function getGraph() {
    return getComplexGraph();
}
Graph.array = getGraph();



function manhattanDistance(from, to) {
    var d1 = Math.abs(to.x - from.x);
    var d2 = Math.abs(to.y - from.y);
    return d1 + d2;
}

function diagonalDistance(from, to) {
    if (!testVector(from) || !testVector(to)) {
        throw new TypeError("Expected vector");
    }
    var dx = Math.abs(from.x - to.x);
    var dy = Math.abs(from.y - to.y);
    return Math.max(dx, dy);
}

function euclidianDistance(from, to) {
    dx = Math.abs(from.x - to.x)
    dy = Math.abs(from.y - to.y)
    return Math.sqrt(dx * dx + dy * dy)
}

var start = new Vector(0, 0);
var finish = new Vector(18, 9);
Graph.setGraphPoint(start, 'S');
Graph.setGraphPoint(finish, 'F');

Graph.print($('#graphstart'));


var partialPath = [];
var partialOpenSet = [];

function recordPathIterations(pathData, openSet) {
    partialPath.push(pathData);
    partialOpenSet.push(openSet.getArray());
}


var path = aStar(Graph, start, finish, euclidianDistance, true, recordPathIterations);


setInterval(function drawPathElementByElement(path) {

    Graph.array = getGraph();
    Graph.setGraphPoint(start, 'S');
    Graph.setGraphPoint(finish, 'F');

    if (partialOpenSet.length > 0) {
        var openSet = partialOpenSet.shift();
        Graph.print($('#graphduring'), openSet, 'n');
    }

    if (partialPath.length > 0) {
        var path2 = partialPath.shift();
        Graph.print($('#graphduring'), path2, 'x');
    }

}, 200);

Graph.print($('#graphfinish'), path, 'x');
