class Usuario{

    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`Nombre: ${this.nombre} Apellido: ${this.apellido}`)
    };
    
    addMascota(mascota) {
        this.mascotas.push(mascota)
    };
    
    getMascotas() {
        console.log(this.mascotas.length)
    };
    
    addBook(book, autor) {
    
        const libro = {
            book: book,
            autor: autor
        }
    
        this.libros.push(libro)

    }
    
    getBooks() {
    
        for (let i = 0; i < this.libros.length; i++) {

            const element = this.libros[i];
            console.log(element.book);
        }

    }

}

const libros = [
    {
        book: "Harry Potter",
        autor: "J.K Rowling"
    },
    {
        book: "Ubik",
        autor: "Philip K. Dick"
    }
]

const usuario = new Usuario('Luis', 'Cereño', libros, ["Luna","Monty"]);

usuario.getFullName();
usuario.addMascota("Antonella");
usuario.getMascotas();
usuario.addBook('Blade Runner', 'Philip K. Dick');
usuario.getBooks();
