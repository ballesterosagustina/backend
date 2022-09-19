const fs = require('fs');

class Contenedor {
    constructor (nombreArchivo){
        this.archivo = nombreArchivo
        this.read()
    }

    static countID = 0;
    static lista = []

    async save(objeto){
        Contenedor.countID++;
        objeto["id"] = Contenedor.countID

        Contenedor.lista.push(objeto)

        await this.write()

        return Contenedor.countID;
    }

    async write(){
        let string = JSON.stringify(Contenedor.lista)
        await fs.promises.writeFile(this.archivo, string)
    }

    async read(){
        let data = await fs.promises.readFile(this.archivo)
        Contenedor.lista = data

        for(const element of Contenedor.lista){
            if(element.id > Contenedor.countID) Contenedor.countID = element.id
        }
    }

    async getById(id){
        let lista = [], producto
        try{
            const contenido = await fs.promises.readFile(this.archivo)
            lista = JSON.parse(contenido)
            producto = lista.find(prod=>prod.id==id)
            console.log(producto)
            return producto
        }catch(error){
            console.log("No se pudo leer el archivo" + error)
        }
    }

    async getAll(){
        let lista = []

        try{
            const contenido = await fs.promises.readFile(this.archivo)
            console.log("El archivo fue leído correctamente")
            lista = JSON.parse(contenido)
            return lista
        } catch(error){
            console.log("No se pudo leer el archivo" + error)
        }
    }

    async deleteById(id){
        let lista = []
        
        try{
            const contenido = await fs.promises.readFile(this.archivo)
            console.log("El archivo fue leído correctamente")
            lista = JSON.parse(contenido)
        }catch(error){
            console.log("No se pudo leer el archivo" + error)
        }

        lista = lista.filter(obj =>obj.id != id)
        console.log (lista)

        try{
            await fs.promises.writeFile(this.archivo, JSON.stringify(lista))
            console.log("Se escribio correctamente")
        }catch(error){
            console.log("No se puede escribir el archivo " + error)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.archivo, '')
            console.log("Se borro correctamente")
        }catch(error){
            console.log("No se pudo modificar el archivo " + error)
        }
    }
}

module.exports = {Contenedor}