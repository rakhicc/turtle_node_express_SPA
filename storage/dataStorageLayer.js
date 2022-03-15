'use strict';
const Database=require('./database');
const options=require('./databaseOptions.json');

const {CODES,TYPE,MESSAGES}=require('./statuscodes');
const sql=require('./Chandran_Chirayil_turtle_sqlQueries.json');
const {toArrayInsert,toArrayUpdate}=require('./parameters')
const getAllSql=sql.getAll.join(' ');
const getSql=sql.get.join(' ');
const insertSql=sql.insert.join(' ');
const updateSql=sql.update.join(' ');
const removeSql=sql.remove.join(' ');
const PRIMARY_KEY=sql.primaryKey;
console.log(getAllSql);
console.log(getSql);
console.log(insertSql);
console.log(updateSql);
console.log(removeSql);
console.log(PRIMARY_KEY);

module.exports=class Datastorage{
    constructor(){
        this.db=new Database(options);
    }
    get CODES(){
        return CODES;
    }
    getAll(){
return new Promise(async(resolve,reject)=>{
    try{
        const result=await this.db.doQuery(getAllSql);
        resolve(result.queryResult);
    }catch(err){
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
    }
})
    } // end of getAll

    get(key){
        return new Promise (async (resolve,reject)=>{
            
            try{
const result=await this.db.doQuery(getSql,[key]);
if(result.queryResult.length>0){
    resolve(result.queryResult[0]);
} else {
    resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY,key));
}
            }catch(Err){
                console.log(Err);
                reject(MESSAGES.PROGRAM_ERROR());
            }
        })
    }

    remove(key){
        return new Promise(async(resolve,reject)=>{
            try{
const result=await this.db.doQuery(removeSql,[key])
    if(result.queryResult.rowsChanged===1){
        resolve(MESSAGES.DELETE_OK(PRIMARY_KEY,key))
    }  else {
        resolve(MESSAGES.NOT_DELETED(PRIMARY_KEY,key))
    }      

}catch(err)
            {
                console.log(err);
                console.log(MESSAGES.PROGRAM_ERROR)
            }
        })
    }

    insert(resource){
        return new Promise(async (resolve,reject)=>{
            try{
await this.db.doQuery(insertSql,toArrayInsert(resource));
resolve (MESSAGES.INSERT_OK(PRIMARY_KEY,resource[PRIMARY_KEY]));
            }catch(error){
                console.log(error);
                reject(MESSAGES.NOT_INSERTED());
            }
        })
    }//end of insert
update(key,resource){
    return new Promise(async(resolve,reject)=>{
        try{
if(key && resource){
if(resource[PRIMARY_KEY] !=key){
    reject(MESSAGES.KEYS_DO_NOT_MATCH(resource[PRIMARY_KEY],key));
} else {
    const resultGet=await this.db.doQuery(getSql,[key]);
    if(resultGet.queryResult.length>0){
        const result=await this.db.doQuery(updateSql,toArrayUpdate(resource));
        if(result.queryResult.rowsChanged===0){
            resolve(MESSAGES.NOT_UPDATED())
        }else {
            resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY,resource[PRIMARY_KEY]));
        }
    }
    else {
        this.insert(resource)
        .then(status=>resolve(status))
        .catch(err=>reject(err));
    }
}
} else {
    reject(MESSAGES.NOT_UPDATED());
}
        }catch(error){
            console.log(error);
            reject(MESSAGES.PROGRAM_ERROR());
        }
    })
}
}


