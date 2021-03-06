function Vector(x, y) {
    if(typeof x !== 'number') {
        throw new TypeError("Expected a number but received", x);
    }
    if(typeof y !== 'number') {
        throw new TypeError("Expected a number but received", y);
    }
    this.x = x;
    this.y = y;
}

function testVector(candidate) {
    if (candidate instanceof Vector) {
        return true;
    }
    return false;
}

Vector.prototype.equals = function (other) {
    return (this.x === other.x && this.y === other.y);
}

Vector.prototype.dot = function (other) {
    return this.x * other.x + this.y * other.y;
};

Vector.prototype.multiply = function (value) {
    return new Vector(this.x * value, this.y * value);
};

Vector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.squaredLength = function () {
    return (this.x * this.x + this.y * this.y);
};

Vector.prototype.normalize = function () {
    return new Vector(this.x / this.length(), this.y / this.length());
};

Vector.prototype.subtract = function (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
};

Vector.prototype.add = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.divide = function (value) {
    return new Vector(this.x / value, this.y / value)
};


Vector.prototype.distance = function (vector) {
    return this.subtract(vector).length();
}

Vector.prototype.squaredDistance = function (vector) {
    return this.subtract(vector).squaredLength();
}

Vector.prototype.angle = function (vector) {
    var deltaX = vector.x - this.x;
    var deltaY = vector.y - this.y;
    return Math.atan2(deltaX, deltaY) * 180 / Math.PI;
}

Vector.prototype.toString = function() {
    return "Vector (" +this.x + "," + this.y + ")";
}
