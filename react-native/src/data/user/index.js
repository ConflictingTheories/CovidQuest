import  data  from "../"

export default class User {

    static async getToken(){
		try{
			let response = await data.getToken();
		    	return response ;
		    }catch(err){
		    	return "";
		    }
	}


}