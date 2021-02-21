# **Consigna**

Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. 

- Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los  productos sin necesidad de recargar la vista.
- Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.


**Aspectos a incluir en el entregable:**

Para construir la tabla dinámica con los datos recibidos por websocket emplear las siguientes opciones:

1. Utilizar template string
2. Utilizar Handlebars en el frontend (compiler + runtime)
