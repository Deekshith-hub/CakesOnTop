const connection = require("../util/db");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export class userModel {

    static async register(data: any) {
        const {phone, name, email} = data;
        
        const password = CryptoJS.AES.encrypt(data.password, "secret123").toString();
        try {
            const res : {
                success : boolean;
                message: string;
            }  = await new Promise((resolve, reject) =>{
                const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
                connection.query(checkQuery, [phone], (err:any, result:any) => {
                    if(err) {
                        reject(err);
                    }
                    else {
                        if(result.length > 0) {

                            resolve({success: false, message: 'User Already Exists!'});
                        } else {
                            const insertQuery = 'INSERT INTO users (user_id, name, email, password, role_id) VALUES (?, ?, ?, ?, ?)';
                            connection.query(insertQuery, [phone,name,email,password,1], (err:any, result:any) => {
                                if(err) {
                                    reject(err);
                                } 
                                else {
                                    resolve({success:true, message: 'User Inserted Successfully!'});
                                } 
                            })
                        }
                    } 
                })
                
            })
            if(res)
            {
                return {success:res.success, message: res.message}
            }

        } catch (err) {
            return {error: err.message};
        }
    }

    static async login(data: any){
        try {
            const user: {
                length: number,
                password: string,
                user_id: number,
                name: string,
                email: string,
                role_id: number
            }[]  = await new Promise((resolve, reject) =>{
                const query = `SELECT * FROM users WHERE user_id = ${data.phone}`;
                connection.query(query, (err: any, result: any) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })

            if(user && user.length > 0) {
                const bytes  = CryptoJS.AES.decrypt(user[0].password, 'secret123');
                let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)

                console.log(user[0].user_id,"phone number");
                

                if(data.phone == user[0].user_id && data.password == decryptedPass) {
                    var token = jwt.sign({phone: user[0].user_id, name: user[0].name, email: user[0].email, role_id: user[0].role_id }, 'signedByDk007', {expiresIn: "1d"});
                    return {success: true, token, name: user[0].name, phone: user[0].user_id}
                }
                else {
                    return {success: false, error: "Invalid Credentials"}
                }
            }
            else {
                return { success: false, error: "No user found"  }
            }
            
        } catch (err) {
            return {error: err.message};
        }
    }

    static async changePass(data: {
        phone: number,
        password: string
    }) {
        const {phone} = data;
        const newPassword = CryptoJS.AES.encrypt(data.password, "secret123").toString();
        try {
            const data: {affectedRows: number} = await new Promise((resolve, reject) => {
                const query = 'UPDATE users SET password = ? WHERE user_id = ?';
                connection.query(query, [newPassword, phone], (err: any, result: any) => {
                    if (err) {
                    reject(err);
                    } else {
                    resolve(result);
                    }
                });
            });

            if(data.affectedRows && data.affectedRows > 0 ){
            return {success: true, message:"Updated the password successfully"};
            } else {
            return {success: false, message:"Password not updated!"};
            }
        } 
        catch (err) {
            return {error: err.message};
        }
    }

    static async checkExistUser(datae: {
        phone: number
    }) {
        try {
            const data: {length: number} = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM users WHERE user_id = ?';
                connection.query(query, [datae.phone], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            });
            
            if(data.length > 0){
                return {success: true};
            } else {
                return {success: false};
            }
        } catch (error) {
            return {error: error.message};
        }
    }

    static async checkSessionExpire(data: any)
    {        
        try {
            let status = jwt.verify(data.token, 'signedByDk007');
            return {status};
        } catch (error) {
            return {error: error.message};
        }
    }
}