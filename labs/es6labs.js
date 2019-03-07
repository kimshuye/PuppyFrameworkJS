class Es6labs {
    lab2 () {
        return {
            number:99,
            text: 'Hello',
            object: {
                id: 1,
                name: 'John'
            }
        }
    }
    lab3 () {
        var x = 1
        if (true) {
            var x = 2  // same variable!
            console.log(x)  // 2
        }
        console.log(x)
    }
    lab4 () {
        var i = 100, b = 'Hello'

        for (let i = 0; i < b.length; i++) {
            let y = b[i]
            console.log(`loop let i = ${i}`)
        }
        
        console.log(`var i = ${i}`)
    }
    lab5 () {
        let nums = [1, 2, 3, 4, 5], fives = [];
        nums.forEach(v => { if (v % 5 === 0) fives.push(v) });
        console.log(fives);
    }
    lab6 (x, y = 7, z = 42) {
        return x + y + z ;
    }
    lab7 (x, y, ...a) {
        return (x + y) * a.length;
    }
    lab8 () {
        var params = [ "hello", true, 7 ]
        var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]
        console.log(this.lab7(1, 2, ...params));
    }
    lab9 () {
        var customer = { name: "Foo" };
        var card = { amount: 7, product: "Bar", unitprice: 42 };
        var message = `Hello ${customer.name},
            want to buy ${card.amount} ${card.product} for
            a total of ${card.amount * card.unitprice} bucks?`;
        console.log(message);
    }
    lab10 () {
        console.log(0b111110111 === 503);
        console.log(0o767 === 503);
    }
    lab11 () {
        var list = [ 1, 2, 3 ];
        var [ a, , b ] = list;
        console.log(a, b);
    }
    lab12 () {
        var op = { id: 1, name: "A"}
        var lhs = 99.5, rhs = 300, pi = 3.14
        return { op, lhs, rhs, pi}  
    }
    lab13 () {
        let shape = new Shape(1, 900, 1400);
        console.log(shape.x, shape.y);
        shape.move(1000, 2000);
        console.log(shape.x, shape.y);
    }
}

class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}

class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }

    static defaultRectangle () {
        return new Rectangle("default", 0, 0, 100, 100)
    }

    set width (width) { 
        this._width = width;             
    }
    get width () { 
        return this._width;
    }
    set height (height) { 
        this._height = height;
    }
    get height () { 
        return this._height;
    }
    get area () { 
        return this._width * this._height;
    }
}

class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
}
   
module.exports = Es6labs;