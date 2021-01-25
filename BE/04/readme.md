# **Consigna 1**

Realizar un documento web que contenga un elemento input y que a medida de que escribo, se vaya mostrando a su derecha el texto en forma espejada. Utilizar un Observable para realizar esa función.

* Este comportamiento estará disponible por 30 segundos. Luego de ese tiempo, se realizará la desuscripción automática. 

* Si en el lapso de tiempo activo se escribe ‘error’, el Observable terminará por error. Si se ingresa ‘complete’, el Observable terminará en forma normal. Indicar por la consola la razón del cierre de la función.

* Una vez que el Observable no esté más operativo, desregistrar el evento de entrada, deshabilitar la escritura en el input y borrar el resultado de la operación.

# **Consigna 2**

Realizar lo mismo pedido en la  Consigna 1 pero en lugar de manejar la conversión de datos dentro del Observable, hacerlo utilizando el método pipe y operadores rxjs (a elección).

