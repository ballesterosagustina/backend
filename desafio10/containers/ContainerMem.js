class ContainerMem {
    constructor() {

        console.log('ContainerMem constructor');

        this.productos = [];
        this.carritos = [
            {
                id: 1,
                timestamp: "2021-06-29T20:00:00.000Z",
                productos: [
                    {
                        id: 1,
                        timestamp: "2021-06-29T20:00:00.000Z",
                        nombre: "Escuadra",
                        descripcion: "Calculo de areas",
                        codigo: "123",
                        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                        precio: 123,
                        stock: 10
                    }
                ]
            }
        ];
    }
}

export { ContainerMem };
