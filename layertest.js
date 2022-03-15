'use strict';
const DataStorage=require('./storage/dataStorageLayer');

const storage=new DataStorage();
storage.getAll().then(console.log).catch(console.log);
//storage.get(1).then(console.log).catch(console.log);
//storage.get(1).then(console.log).catch(console.log);
const turtle={
    number: 4,
    name: 'Pokemonup',
    age: 4,
    weightKg: 40,
    speed: "45km/hr"
  }
  //storage.insert(turtle).then(console.log).catch(console.log);
  //storage.remove(100).then(console.log).catch(console.log);
  //storage.update(4,turtle).then(console.log).catch(console.log);
