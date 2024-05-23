const connection = require("../util/db");

export class cakesModel {
    static async fetchCakes(data:{category: string}) {
        const {category} = data;
        
        try {
            const res = await new Promise((resolve, reject) =>{
                const cakes = 'SELECT * FROM cakes WHERE category = ?';
                connection.query(cakes, [category], (err:any, result:any) => {
                    if(err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    } 
                })
                
            })
            if(res)
            {
                return {data:res}
            }

        } catch (err) {
            return {error: err.message};
        }
    }


    static async fetchCakeById(data:{sl: number}) {
        const {sl} = data;
        
        try {
            const res = await new Promise((resolve, reject) =>{
                const cakes = 'SELECT * FROM cakes WHERE sl = ?';
                connection.query(cakes, [sl], (err:any, result:any) => {
                    if(err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    } 
                })
                
            })
            if(res)
            {
                return {data:res}
            }

        } catch (err) {
            return {error: err.message};
        }
    }
}