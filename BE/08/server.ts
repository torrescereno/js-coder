// Server class
export class Server {
    
    port: number;
    app: any;

    constructor(port: number, app: Function){
        this.port = port;
        this.app = app;
    }

    listen(){
        this.app.listen(this.port, (err:any) =>{
			if(err){
				console.log(err);
			} else {
				console.log(`Escuchando en http://localhost:${this.port}`);
			}

		});
    }
    
}