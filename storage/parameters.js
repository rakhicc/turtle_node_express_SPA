'use strict';
const toArrayInsert=turtle=>[
    +turtle.number,turtle.name,+turtle.age,+turtle.weightKg,
    turtle.speed
]
const toArrayUpdate=turtle=>[
    turtle.name,+turtle.age,+turtle.weightKg,
    turtle.speed,+turtle.number
]
module.exports={toArrayInsert,toArrayUpdate};
